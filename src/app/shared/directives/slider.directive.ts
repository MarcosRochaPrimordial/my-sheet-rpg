import { AfterViewChecked, Directive, Input } from '@angular/core';

@Directive({
  selector: '[slider]'
})
export class SliderDirective implements AfterViewChecked {

  @Input() container: string = '';
  @Input() slide: string = '';

  isDragging = false;
  startPos = 0;
  currentTranslate = 0;
  prevTranslate = 0;
  animationID: any;
  currentIndex = 0;
  slider: any;
  slides: any[] = [];
  slidesNumber: number = 0;

  constructor() { }

  ngAfterViewChecked(): void {
    setTimeout(() => {
      this.slider = document.querySelector(`.${this.container}`);
      this.slides = Array.from(document.querySelectorAll(`.${this.slide}`));

      if (this.slides.length !== this.slidesNumber) {
        this.slidesNumber = this.slides.length;
        this.slides.forEach((slide, index) => {
          const slideImage = slide.querySelector('mat-card');
          slideImage?.addEventListener('dragstart', (e: Event) => e.preventDefault());

          slide.addEventListener('touchstart', this.touchStart(index));
          slide.addEventListener('touchend', this.touchEnd.bind(this));
          slide.addEventListener('touchmove', this.touchMove.bind(this));

          slide.addEventListener('mousedown', this.touchStart(index).bind(this));
          slide.addEventListener('mouseup', this.touchEnd.bind(this));
          slide.addEventListener('mouseleave', this.touchEnd.bind(this));
          slide.addEventListener('mousemove', this.touchMove.bind(this));
        });

        window.oncontextmenu = function (event) {
          event.preventDefault();
          event.stopPropagation();
          return false;
        }
      }
    }, 500);
  }

  touchStart(index: number) {
    return (event: Event) => {
      this.currentIndex = index;
      this.startPos = this.getPositionX(event);
      this.isDragging = true;

      this.animationID = requestAnimationFrame(this.animation.bind(this));
    };
  }

  touchEnd() {
    this.isDragging = false;
    cancelAnimationFrame(this.animationID);

    const movedBy = this.currentTranslate - this.prevTranslate;

    if (movedBy < -100 && this.currentIndex < (this.slides.length - 1)) {
      this.currentIndex += 1;
    }
    if (movedBy > 100 && this.currentIndex > 0) {
      this.currentIndex -= 1;
    }

    this.setPositionByIndex();
  }

  touchMove(event: Event) {
    if (this.isDragging) {
      const currentPosition = this.getPositionX(event);
      this.currentTranslate = this.prevTranslate + currentPosition - this.startPos;
    }
  }

  getPositionX(event: Event) {
    return event.type.includes('mouse') ?
      (event as any)['pageX'] :
      (event as any)['touches'][0].clientX;
  }

  animation() {
    this.setSliderPosition();
    if (this.isDragging) requestAnimationFrame(this.animation.bind(this));
  }

  setSliderPosition() {
    this.slider.style.transform = `translateX(${this.currentTranslate}px)`;
  }

  setPositionByIndex() {
    this.currentTranslate = this.currentIndex * -window.innerWidth;
    this.prevTranslate = this.currentTranslate;
    this.setSliderPosition();
  }

}

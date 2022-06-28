import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { Sheet } from 'src/app/shared/models/sheet.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.scss']
})
export class SheetComponent implements OnInit, OnDestroy {

  private $subscriber = new Subject<boolean>();
  form!: FormGroup;
  unbalancedPoints: boolean = false;
  totalPoints: number = 0;
  @Input() sheet!: Sheet;
  @Input() dm: string = '';
  @Output() updateValuesEvent = new EventEmitter<Sheet>();
  @Output() deleteSheetEvent = new EventEmitter<boolean>();

  get isDm() {
    return this.userService.user?.email === this.dm;
  }

  get points() {
    return this.form.get('points') as FormControl;
  }

  get xp() {
    return this.form.get('xp') as FormControl;
  }

  get magic() {
    return this.form.get('magic') as FormControl;
  }

  get health() {
    return this.form.get('health') as FormControl;
  }

  get characteristics() {
    return this.form.get('characteristics') as FormGroup;
  }

  get advantages() {
    return this.form.get('advantages') as FormArray;
  }

  get disadvantages() {
    return this.form.get('disadvantages') as FormArray;
  }

  get knownMagics() {
    return this.form.get('knownMagics') as FormArray;
  }

  get items() {
    return this.form.get('items') as FormArray;
  }

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  ngOnDestroy(): void {
    this.$subscriber.next(true);
  }

  deleteSheet() {
    this.deleteSheetEvent.emit(true);
  }

  verifyIfHasPermission() {
    return this.isDm || this.userService.user?.email === this.sheet.playerEmail;
  }

  private createForm() {
    this.form = this.fb.group({
      charIcon: [''],
      playerEmail: [''],
      charName: [''],
      points: [{ value: 0, disabled: !this.isDm }],
      xp: [{ value: 0, disabled: !this.isDm }],
      health: [0],
      magic: [0],
      story: [''],
      characteristics: this.fb.group({
        strength: [0],
        hability: [0],
        endurance: [0],
        harness: [0],
        firePower: [0],
      }),
      advantages: this.fb.array([]),
      disadvantages: this.fb.array([]),
      knownMagics: this.fb.array([]),
      items: this.fb.array([])
    });
    this.patchValuesIntoForm();
    if (!this.verifyIfHasPermission()) {
      this.form.disable();
    } else {
      this.setupFormValidator();
    }
    this.totalPoints = this.balancePoints(this.sheet);
  }

  private setupFormValidator() {
    this.form
      .valueChanges
      .pipe(
        debounceTime(2000),
        takeUntil(this.$subscriber),
      )
      .subscribe(_ => {
        const value = this.form.getRawValue();
        this.totalPoints = this.balancePoints(value);
        if (!this.isDm) {
          if (this.unbalancedPoints && this.totalPoints < 0) {
            return;
          }
        }
        this.updateValuesEvent.emit(value);
      });
  }

  private balancePoints(value: any): number {
    let total = value.points;
    total -= [...value.disadvantages, ...value.advantages]
      .reduce((acc: number, curr: { input: string, auxInput: number }) => acc + curr.auxInput, 0);
    total -= Object.keys(value.characteristics)
      .reduce((acc, curr) => acc + value.characteristics[curr], 0);

    if (total !== 0) {
      this.unbalancedPoints = true;
    } else {
      this.unbalancedPoints = false;
    }
    return total;
  }

  private patchValuesIntoForm() {
    this.form.patchValue(this.sheet);

    this.sheet.advantages.forEach(advantage =>
      (this.form.get('advantages') as FormArray).controls.push(
        this.fb.group(advantage)
      ));

    this.sheet.disadvantages.forEach(disadvantage =>
      (this.form.get('disadvantages') as FormArray).controls.push(
        this.fb.group(disadvantage)
      ));

    this.sheet.knownMagics.forEach(knownMagic =>
      (this.form.get('knownMagics') as FormArray).controls.push(
        this.fb.group(knownMagic)
      ));

    this.sheet.items.forEach(item =>
      (this.form.get('items') as FormArray).controls.push(
        this.fb.group(item)
      ));
  }
}

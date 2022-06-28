import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private $loading: Subject<boolean> = new Subject<boolean>();
  private arrLoading: boolean[] = [];

  public get loading() {
    return this.$loading.asObservable();
  }

  constructor() { }

  public present() {
    this.arrLoading.push(true);
    this.nextLoading();
  }
  
  public dismiss() {
    this.arrLoading.pop();
    this.nextLoading();
  }
  
  private nextLoading() {
    this.$loading.next(this.arrLoading.length > 0);
  }
}

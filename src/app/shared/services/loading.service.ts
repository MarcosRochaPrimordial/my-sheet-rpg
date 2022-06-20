import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private $loading: Subject<boolean> = new Subject<boolean>();

  public get loading() {
    return this.$loading.asObservable();
  }

  constructor() { }

  public present() {
    this.$loading.next(true);
  }

  public dismiss() {
    this.$loading.next(false);
  }
}

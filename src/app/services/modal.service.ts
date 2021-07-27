import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private stateSource = new BehaviorSubject<boolean>(false);
  isModal = this.stateSource.asObservable();
  constructor() {}
  showModal() {
    this.stateSource.next(true);
  }
  hideModal() {
    this.stateSource.next(false);
  }
}

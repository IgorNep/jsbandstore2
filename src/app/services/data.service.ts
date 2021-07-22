import { BehaviorSubject } from 'rxjs';
import { Auth } from './../models/Auth';
import { Injectable } from '@angular/core';

const initialState = {
  username: null,
  avatar: null,
  token: null,
};

@Injectable({
  providedIn: 'root',
})
export class DataService {
  data: Auth = localStorage.getItem('authData')
    ? JSON.parse(localStorage.getItem('authData') || '{}')
    : initialState;

  private stateSource = new BehaviorSubject<boolean>(this.data.token);
  isAuth = this.stateSource.asObservable();

  constructor() {}

  setData(data: Auth) {
    this.data = data;
    this.stateSource.next(true);
  }
  getData(): Auth {
    return this.data;
  }
  logout() {
    this.data = initialState;
    localStorage.removeItem('authData');
    this.stateSource.next(false);
  }
}

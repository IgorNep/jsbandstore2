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
  token!: string;
  data: Auth = localStorage.getItem('authData')
    ? JSON.parse(localStorage.getItem('authData') || '{}')
    : initialState;

  private stateSource = new BehaviorSubject<string>('');
  isAuth = this.stateSource.asObservable();

  constructor() {}

  setData(data: Auth) {
    this.data = data;
    this.stateSource.next(data.token);
  }
  getData(): Auth {
    return this.data;
  }
  setToken(token: string) {
    this.stateSource.next(token);
  }
  getToken() {
    this.isAuth.subscribe((t) => (this.token = t));
    return this.token;
  }
  logout() {
    this.data = initialState;
    localStorage.removeItem('authData');
    localStorage.removeItem('auth-token');
    this.stateSource.next('');
  }
}

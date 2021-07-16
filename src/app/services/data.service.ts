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
  constructor() {}

  setData(data: Auth) {
    this.data = data;
  }
  getData(): Auth {
    return this.data;
  }
  logout() {
    this.data = initialState;
    localStorage.removeItem('authData');
  }
}

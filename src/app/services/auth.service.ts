import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Auth } from '../models/Auth';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authUrl: string = ' https://js-band-store-api.glitch.me/signin';
  constructor(private http: HttpClient) {}

  login(username: string): Observable<Auth | any> {
    return this.http.post(this.authUrl, { username }, httpOptions);
  }
}

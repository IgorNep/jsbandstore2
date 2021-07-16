import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/Books';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  booksUrl: string = 'https://js-band-store-api.glitch.me/books';
  constructor(private http: HttpClient, private dataService: DataService) {}
  getBooks(): Observable<Book[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.dataService.getData().token}`,
      }),
    };
    return this.http.get<Book[]>(this.booksUrl, httpOptions);
  }
  getBook(id: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.dataService.getData().token}`,
      }),
    };
    return this.http.get<Book>(`${this.booksUrl}/${id}`, httpOptions);
  }
}

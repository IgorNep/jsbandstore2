import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/Books';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  booksUrl: string = 'https://js-band-store-api.glitch.me/books';
  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.booksUrl);
  }
  getBook(id: string) {
    return this.http.get<Book>(`${this.booksUrl}/${id}`);
  }
}

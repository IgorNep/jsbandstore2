import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/Books';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  books!: Book[];

  constructor(
    private bookService: BookService,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.dataService.getData().token === null) {
      this.router.navigate(['/login']);
    }

    this.bookService.getBooks().subscribe((books) => {
      this.books = books;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/Books';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnInit {
  id!: string;
  book!: Book;
  totalPrice: number = 0;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.bookService.getBook(this.id).subscribe((book) => {
      this.book = book;
    });
  }
}

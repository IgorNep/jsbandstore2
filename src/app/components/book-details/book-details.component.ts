import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/Books';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { CartItem } from 'src/app/models/Cart';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnInit {
  id!: string;
  book!: Book;
  count: number = 0;
  message: string = '';
  newCartItem!: CartItem;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.bookService.getBook(this.id).subscribe((book) => {
      this.book = book;
    });
  }
  decrementCount() {
    if (this.count === this.book.count) {
      this.message = '';
    }
    if (this.count > 0) {
      this.count -= 1;
    }
  }
  incrementCount() {
    if (this.count < this.book.count) {
      this.count += 1;
    }
    if (this.count === this.book.count) {
      this.message = 'There are no more books in stock!';
    }
  }
  addToCart() {
    const totalPrice = Number(+this.count * +this.book.price);
    this.newCartItem = {
      id: this.id,
      title: this.book.title,
      price: this.book.price,
      totalPrice: totalPrice,
      qty: this.count,
    };
    this.cartService.addToCart(this.newCartItem);
    this.message = 'The book was added to cart!';

    this.cartService.countTotal();
  }
}

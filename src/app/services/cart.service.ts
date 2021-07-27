import { Injectable } from '@angular/core';
import { CartItem } from '../models/Cart';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartItem[] = [];
  total: number = 0;

  private totalCountSource = new BehaviorSubject<number>(0);
  totalCount = this.totalCountSource.asObservable();

  constructor() {}

  addToCart(item: CartItem) {
    const existItem = this.cartItems.find((book) => book.id === item.id);
    if (existItem) {
      this.cartItems = this.cartItems.map(
        (book) => (book = book.id === existItem.id ? item : book)
      );
    } else {
      this.cartItems.push(item);
    }
  }
  getCartItems(): Observable<CartItem[]> {
    return of(this.cartItems);
  }
  countTotal() {
    this.totalCountSource.next(this.calcTotal());
  }
  calcTotal() {
    return this.cartItems.reduce((acc, item) => {
      return acc + item.qty;
    }, 0);
  }
  getTotalCount(): Observable<number> {
    return this.totalCount;
  }
  getTotalPrice() {
    return this.cartItems.reduce((acc, item) => {
      return acc + item.price * item.qty;
    }, 0);
  }
  clearCart() {
    this.cartItems = [];
    this.totalCountSource.next(0);
  }
}

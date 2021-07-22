import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/Cart';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems!: CartItem[];
  showModal!: boolean;
  totalPrice!: number;

  constructor(
    private cartService: CartService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe((items) => {
      this.cartItems = items;
    });
    this.modalService.isModal.subscribe((modal) => {
      this.showModal = modal;
    });
    this.totalPrice = this.cartService.getTotalPrice();
  }

  onPurchaseClick() {
    this.modalService.showModal();
  }
}

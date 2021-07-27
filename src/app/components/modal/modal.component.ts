import { CartService } from './../../services/cart.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { CartItem } from 'src/app/models/Cart';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  cartItems!: CartItem[];
  total: number = 0;
  constructor(
    private modalService: ModalService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe((items) => {
      this.cartItems = items;
    });
    this.total = this.cartService.getTotalPrice();
  }

  onCloseClick() {
    this.modalService.hideModal();
    this.cartService.clearCart();
    this.router.navigate(['/']);
  }
}

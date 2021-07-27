import { Subscription } from 'rxjs';
import { CartService } from './../../services/cart.service';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { CartItem } from 'src/app/models/Cart';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit, OnDestroy {
  cartItems!: CartItem[];
  total: number = 0;
  subscription!: Subscription;
  constructor(
    private modalService: ModalService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.subscription = this.cartService.getCartItems().subscribe((items) => {
      this.cartItems = items;
    });
    this.total = this.cartService.getTotalPrice();
  }

  onCloseClick() {
    this.modalService.hideModal();
    this.cartService.clearCart();
    this.router.navigate(['/']);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

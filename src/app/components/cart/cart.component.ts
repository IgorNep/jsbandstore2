import { CartService } from './../../services/cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartItem } from 'src/app/models/Cart';
import { ModalService } from 'src/app/services/modal.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems!: CartItem[];
  showModal!: Observable<boolean>;
  totalPrice!: number;
  subscription!: Subscription;

  constructor(
    private cartService: CartService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.subscription = this.cartService.getCartItems().subscribe((items) => {
      this.cartItems = items;
    });
    // this.modalService.isModal.subscribe((modal) => {
    //   this.showModal = modal;
    // });
    this.showModal = this.modalService.isModal;
    this.totalPrice = this.cartService.getTotalPrice();
  }

  onPurchaseClick() {
    this.modalService.showModal();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

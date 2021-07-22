import { CartService } from './../../services/cart.service';
import { DataService } from 'src/app/services/data.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  name: string = '1';
  avatar: string = '';
  isAuth: string = '';
  cartCount: number = 0;
  subscription!: Subscription;
  subscription2!: Subscription;

  constructor(
    private dataService: DataService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.subscription = this.dataService.isAuth.subscribe((value) => {
      this.isAuth = value;
      if (value) {
        this.name = this.dataService.getData().username;
        this.avatar = this.dataService.getData().avatar;
      }
    });
    this.cartService.getTotalCount().subscribe((total) => {
      this.cartCount = total;
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }
  onLogoutClick() {
    this.dataService.logout();
  }
}

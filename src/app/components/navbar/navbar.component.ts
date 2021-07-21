import { CartService } from './../../services/cart.service';
import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  showLogin: boolean = false;
  cartCount: number = 0;
  constructor(
    private dataService: DataService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    if (this.dataService.getData().token) {
      this.showLogin = false;
    }
    this.cartService.getTotalCount().subscribe((total) => {
      this.cartCount = total;
    });
  }
  onLogoutClick() {
    this.dataService.logout();
    this.showLogin = true;
  }
}

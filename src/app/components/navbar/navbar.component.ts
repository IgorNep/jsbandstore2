import { CartService } from './../../services/cart.service';
import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  name: string = '1';
  avatar: string = '';
  isAuth: boolean = false;
  cartCount: number = 0;
  constructor(
    private dataService: DataService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.dataService.isAuth.subscribe((value) => {
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
  onLogoutClick() {
    this.dataService.logout();
  }
}

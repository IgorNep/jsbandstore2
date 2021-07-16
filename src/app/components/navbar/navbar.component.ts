import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  showLogin: boolean = false;
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    if (this.dataService.getData().token) {
      this.showLogin = false;
    }
  }
  onLogoutClick() {
    this.dataService.logout();
    this.showLogin = true;
  }
}

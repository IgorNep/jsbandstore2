import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  username: string = '';
  subscription!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit(): void {}
  onSubmit() {
    this.subscription = this.authService
      .login(this.username)
      .subscribe((res) => {
        if (res && res.token) {
          this.dataService.setData(res);
          localStorage.setItem('authData', JSON.stringify(res));
          localStorage.setItem('auth-token', res.token);
          this.router.navigate(['/']);
        }
      });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

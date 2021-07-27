import { DataService } from './../services/data.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  isAuth: boolean = false;
  constructor(private router: Router, private dataService: DataService) {}
  canActivate(): Observable<boolean> {
    this.dataService.isAuth.subscribe((value) => {
      if (!value) {
        this.router.navigate(['/login']);
        this.isAuth = false;
      } else {
        this.isAuth = true;
      }
    });
    return of(this.isAuth);
  }
}

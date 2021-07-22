import { DataService } from 'src/app/services/data.service';
import { Observable } from 'rxjs';
import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  token!: string;
  constructor(private auth: AuthService, private dataService: DataService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let reqWithAuth!: HttpRequest<any>;
    if (this.dataService.isAuth) {
      reqWithAuth = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.dataService.getToken()}`,
        },
      });
    }

    return next.handle(reqWithAuth);
  }
}

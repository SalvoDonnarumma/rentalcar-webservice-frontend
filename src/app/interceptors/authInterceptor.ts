import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthJwtService } from '../services/auth-jwt-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthJwtService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken = this.authService.getAuthToken();

    if(this.authService.isTokenNull(authToken)){
      const error = 'Credenziali inserite non valide!';
      this.router.navigate(['login', error]);
    }

    if(this.authService.isTokenExpired(authToken)){
      console.log('Token scaduto!');
      const error = 'Expired';
      this.router.navigate(['logout', error]);
    }
    
    if (authToken) {
      request = request.clone({
        setHeaders: {
          Authorization: authToken
        }
      });
    }
    
    return next.handle(request);
  }
}
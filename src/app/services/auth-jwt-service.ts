import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { AppCookieService } from './app-cookie';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../environments/environment.development';
import { map } from 'rxjs';
import { Token } from '../models/Token';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthJwtService {
  constructor(
    private httpClient: HttpClient,
    private storageService: AppCookieService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  loggedUser(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return this.storageService.get('Utente') || '';
    }
    return '';
  }

  usedToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return this.storageService.get('AuthToken') || '';
    }
    return '';
  }

  isLogged(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!this.storageService.get('Utente');
    }
    return false;
  }

  clearUser(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.storageService.get('Utente');
    }
  }

  clearAll(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.storageService.clear();
    }
  }

  getAuthToken(): string {
    if (isPlatformBrowser(this.platformId)) {
      const authHeader = sessionStorage.getItem('AuthToken');
      //const authHeader = this.storageService.get("AuthToken");
      return authHeader ? authHeader : '';
    }
    return '';
  }

  getAuthUsername(): string{
    const username = this.storageService.get('Utente');
    return username ? username : '';
  }

  getUserRole(): string | null {
    const token = this.getAuthToken().replace('Bearer ', '');
    console.log('Token prelevato: ' + token);
    try {
      const payload: any = jwtDecode(token);
      const role = payload.authorities;
      if (Array.isArray(role)) {
        return role[0];
      }
      return role || null;
    } catch (e) {
      return null;
    }
  }

  autenticaService(username: string, password: string) {
    return this.httpClient
      .post<Token>(`${environment.authServerUri}`, { username, password })
      .pipe(
        map((data) => {
          if (isPlatformBrowser(this.platformId)) {
            sessionStorage.setItem('Utente', username);
            sessionStorage.setItem('AuthToken', `Bearer ${data.token}`);
            this.storageService.set('Utente', username);
            this.storageService.set('AuthToken', `Bearer ${data.token}`);
          }
          return data;
        })
      );
  }

  isTokenExpired(token: string): boolean {
    if (!token) return true;

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      const currentTime = Math.floor(Date.now() / 1000);

      return decoded.exp < currentTime;
    } catch (error) {
      console.error('Token decoding failed:', error);
      return true;
    }
  }
}

interface DecodedToken {
  exp: number; // UNIX timestamp
  [key: string]: any;
}

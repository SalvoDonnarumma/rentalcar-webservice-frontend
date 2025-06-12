import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AppCookieService {
  private cookieStore: { [key: string]: string } = {};

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.parseCookies(document.cookie, false);
    }
  }

  private parseCookies(cookies: string, clear: boolean): void {
    this.cookieStore = {};

    if (!cookies) { return; }

    const cookiesArr = cookies.split(';');

    for (const cookie of cookiesArr) {
      const cookieArr = cookie.split('=');
      if (clear) {
        this.remove(cookieArr[0].trim());
      } else {
        this.cookieStore[cookieArr[0].trim()] = cookieArr[1];
      }
    }
  }

  get(key: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      this.parseCookies(document.cookie, false);
      return this.cookieStore[key] || null;
    }
    return null;
  }

  remove(key: string): void {
    if (isPlatformBrowser(this.platformId)) {
      document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
  }

  set(key: string, value: string): void {
    if (isPlatformBrowser(this.platformId)) {
      document.cookie = `${key}=${value || ''}; path=/`;
    }
  }

  clear(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.parseCookies(document.cookie, true);
    }
  }
}
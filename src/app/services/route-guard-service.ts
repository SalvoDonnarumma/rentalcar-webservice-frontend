import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable, inject, Inject, PLATFORM_ID } from '@angular/core';
import { AuthJwtService } from './auth-jwt-service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {
  token: string = '';
  ruoli: string[] = [];
  items: any;

  constructor(
    private Auth: AuthJwtService,
    private route: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    console.log('Controllo utente loggato '+ this.Auth.usedToken());

    if (!this.Auth.isLogged()) {
      console.log('Utente non loggato, reindirizzo a login');
      this.route.navigate(['/login']);
      return false;
    }

    this.token = this.Auth.getAuthToken();
    
    if (!this.token) {
      this.route.navigate(['/login']);
      return false;
    }

    const helper = new JwtHelperService();
    let decodedToken: any;

    try {
      decodedToken = helper.decodeToken(this.token);
    } catch (error) {
      console.error('Errore nella decodifica del token:', error);
      this.Auth.clearAll();
      this.route.navigate(['/login']);
      return false;
    }

    if (!decodedToken) {
      this.Auth.clearAll();
      this.route.navigate(['/login']);
      return false;
    }

    // Gestione delle authorities
    this.items = decodedToken['authorities'] || [];
    
    if (!Array.isArray(this.items)) {
      this.ruoli = this.items ? [this.items] : [];
    } else {
      this.ruoli = this.items;
    }

    // Verifica dei ruoli
    const roles: string[] = next.data['roles'] || [];
    
    if (roles.length === 0) {
      return true; // Nessun ruolo richiesto
    }

    if (this.ruoli.some(role => roles.includes(role))) {
      return true; // L'utente ha almeno uno dei ruoli richiesti
    }

    this.route.navigate(['forbidden']);
    return false;
  }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(RouteGuardService).canActivate(next, state);
}

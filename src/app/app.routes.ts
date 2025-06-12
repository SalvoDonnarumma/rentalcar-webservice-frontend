import { Routes } from '@angular/router';
import { AuthGuard } from './services/route-guard-service';
import { Ruoli } from './models/Ruoli';

export const routes: Routes = [
    {path: '', loadComponent: () => import('./pages/login/login').then(m => m.Login)},
    {path: 'login', loadComponent: () => import('./pages/login/login').then(m => m.Login)},
    {path: 'logout', loadComponent: () => import('./pages/logout/logout').then(m => m.Logout)},
    {path: 'forbidden', loadComponent: () => import('./pages/forbidden/forbidden').then(m => m.Forbidden)},
    {path: 'welcome', loadComponent: () => import('./pages/welcome/welcome').then(m => m.Welcome), canActivate: [AuthGuard], data: { roles: [Ruoli.amministratore]}},
    {path: 'welcome/:userId', loadComponent: () => import('./pages/welcome/welcome').then(m => m.Welcome), canActivate: [AuthGuard], data: { roles: [Ruoli.amministratore]}},
    {path: '**', loadComponent: () => import('./pages/errorpage/errorpage').then(m => m.Errorpage)}
];

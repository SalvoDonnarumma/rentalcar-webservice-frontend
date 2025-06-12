import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', loadComponent: () => import('./pages/login/login').then(m => m.Login)},
    {path: 'login', loadComponent: () => import('./pages/login/login').then(m => m.Login)},
    {path: 'welcome', loadComponent: () => import('./pages/welcome/welcome').then(m => m.Welcome)},
    {path: '**', loadComponent: () => import('./pages/errorpage/errorpage').then(m => m.Errorpage)}
];

import { Routes } from '@angular/router';
import { AuthGuard } from './services/route-guard-service';
import { Ruoli } from './models/Ruoli';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/login/login').then((m) => m.Login),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then((m) => m.Login),
  },
  {
    path: 'logout',
    loadComponent: () => import('./pages/logout/logout').then((m) => m.Logout),
  },
  {
    path: 'logout/:error',
    loadComponent: () => import('./pages/logout/logout').then((m) => m.Logout),
  },
  {
    path: 'forbidden',
    loadComponent: () =>
      import('./pages/forbidden/forbidden').then((m) => m.Forbidden),
  },
  {
    path: 'welcome',
    loadComponent: () =>
      import('./pages/welcome/welcome').then((m) => m.Welcome),
    canActivate: [AuthGuard],
    data: { roles: [Ruoli.amministratore] },
  },
  {
    path: 'homepage',
    loadComponent: () =>
      import('./pages/homepage/homepage').then((m) => m.Homepage),
    canActivate: [AuthGuard],
    data: { roles: [Ruoli.amministratore, Ruoli.utente] },
  },
  {
    path: 'homepage/aggiungiutente',
    loadComponent: () =>
      import('./pages/aggiungiutente/aggiungiutente').then((m) => m.Aggiungiutente),
    canActivate: [AuthGuard],
    data: { roles: [Ruoli.amministratore] },
  },
  {
    path: 'homepage/listaprenotazioni',
    loadComponent: () =>
      import('./pages/listaprenotazioni/listaprenotazioni').then((m) => m.Listaprenotazioni),
    canActivate: [AuthGuard],
    data: { roles: [Ruoli.amministratore] },
  },
  {
    path: 'homepage/:filter',
    loadComponent: () =>
      import('./pages/homepage/homepage').then((m) => m.Homepage),
    canActivate: [AuthGuard],
    data: { roles: [Ruoli.amministratore, Ruoli.utente] },
  },
  {
    path: 'parcoauto',
    loadComponent: () =>
      import('./pages/parcoauto/parcoauto').then((m) => m.ParcoAuto),
    canActivate: [AuthGuard],
    data: { roles: [Ruoli.amministratore, Ruoli.utente] },
  },
  {
    path: 'parcoauto/aggiungiveicolo',
    loadComponent: () =>
      import('./pages/aggiungiveicolo/aggiungiveicolo').then((m) => m.Aggiungiveicolo),
    canActivate: [AuthGuard],
    data: { roles: [Ruoli.amministratore, Ruoli.utente] },
  },
  {
    path: 'parcoauto/aggiungiprenotazione',
    loadComponent: () =>
      import('./pages/aggiungiprenotazione/aggiungiprenotazione').then((m) => m.Aggiungiprenotazione),
    canActivate: [AuthGuard],
    data: { roles: [Ruoli.amministratore, Ruoli.utente] },
  },
  {
    path: 'parcoauto/:filter',
    loadComponent: () =>
      import('./pages/parcoauto/parcoauto').then((m) => m.ParcoAuto),
    canActivate: [AuthGuard],
    data: { roles: [Ruoli.amministratore, Ruoli.utente] },
  },
  {
    path: 'welcome/:userId',
    loadComponent: () =>
      import('./pages/welcome/welcome').then((m) => m.Welcome),
    canActivate: [AuthGuard],
    data: { roles: [Ruoli.amministratore, Ruoli.utente] },
  },
  {
    path: 'profiloutente',
    loadComponent: () =>
      import('./pages/profiloutente/profiloutente').then((m) => m.Profiloutente),
    canActivate: [AuthGuard],
    data: { roles: [Ruoli.amministratore, Ruoli.utente] },
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/errorpage/errorpage').then((m) => m.Errorpage),
  },
];

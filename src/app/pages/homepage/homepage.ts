import { Component, OnInit } from '@angular/core';
import { IUtente } from '../../models/Utenti';
import { map, Observable, of } from 'rxjs';
import { UtentiService } from '../../services/Data/utenti-service';
import { AuthJwtService } from '../../services/auth-jwt-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import {
  ActivatedRoute,
  ParamMap,
  Router,
  RouterModule,
} from '@angular/router';
import { IPrenotazione } from '../../models/Prenotazioni';
import { PrenotazioniService } from '../../services/Data/prenotazioni-service';

@Component({
  selector: 'app-homepage',
  imports: [CommonModule, FormsModule, NgxPaginationModule, RouterModule],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage implements OnInit {
  utenti$: IUtente[] = [];
  utente$: IUtente | undefined;
  prenotazioni$: IPrenotazione[] = [];
  errore: string = '';

  currentPage: number = 1;
  itemsForPage: number = 10;

  filter$: Observable<string | null> = of('');
  filter: string | null = '';

  dataInit: string | null = '';
  dataInit$: Observable<string | null> = of('');
  dataFin: string | null = '';
  dataFin$: Observable<string | null> = of('');

  isAdmin: boolean = false;

  constructor(
    private utentiService: UtentiService,
    private prenotazioniService: PrenotazioniService,
    private authService: AuthJwtService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const ruolo = this.authService.getUserRole();
    const email = this.authService.getAuthUsername();
    this.isAdmin = ruolo === 'ROLE_ADMIN';

    this.route.queryParamMap.subscribe((params: ParamMap) => {
      this.filter = params.get('filter');
      this.dataInit = params.get('dataInit');
      this.dataFin = params.get('dataFin');

      if (ruolo?.trim() === 'ROLE_ADMIN') {
        if (this.filter) {
          this.utentiService.searchUsersUsingEmail(this.filter).subscribe({
            next: this.handleResponse.bind(this),
            error: this.handleError.bind(this),
          });
        } else {
          this.utentiService.getAdminHomepage().subscribe({
            next: this.handleResponse.bind(this),
            error: this.handleError.bind(this),
          });
        }
      } else if (ruolo?.trim() === 'ROLE_USER') {
        this.utentiService.getUserByEmail(email).subscribe({
          next: (response) => {
            console.log(response);
            this.utente$ = response;
            this.prenotazioniService
              .getPrenotazioniByUtenteId(
                this.utente$.id,
                this.dataInit || '',
                this.dataFin || ''
              )
              .subscribe({
                next: this.handleResponseCostumer.bind(this),
                error: this.handleError.bind(this),
              });
          },
        });
      }
    });
  }

  handleResponse(response: any) {
    this.utenti$ = response.data;
    this.currentPage = 1;
  }

  handleError(error: any) {
    console.error('Error fetching:', error);
    this.errore =
      error.error.message || 'An error occurred while fetching data.';
  }

  handleResponseCostumer(response: any) {
    this.prenotazioni$ = response.data;
    console.log('Prenotazione estratte: ');
    console.log(this.prenotazioni$);
    this.currentPage = 1;
  }

  cerca() {
    this.router.navigate(['/homepage'], {
      queryParams: {
        filter: this.filter,
        dataInit: this.dataInit,
        dataFin: this.dataFin,
      },
    });
  }

  modificaUtente(utente: any): void {
    this.router.navigate(['homepage/aggiungiutente'], {
      state: { utente: utente },
    });
  }

  eliminaUtente(id: number): void {
    const conferma = window.confirm(
      'Sei sicuro di voler eliminare questo utente?'
    );

    if (conferma) {
      this.utentiService.eliminaUtente(id).subscribe({
        next: () => {
          alert('Utente eliminato con successo.');
          this.utentiService.getAdminHomepage().subscribe({
            next: this.handleResponse.bind(this),
            error: this.handleError.bind(this),
          });
        },
        error: (err) => {
          alert("Errore durante l'eliminazione dell'utente.");
          console.error(err);
        },
      });
    }
  }

  modificaPrenotazione(prenotazione: any): void {
    console.log(prenotazione);
    this.router.navigate(['parcoauto/aggiungiprenotazione'], {
      state: { prenotazione: prenotazione },
    });
  }

  eliminaPrenotazione(id: number): void {
    const conferma = window.confirm(
      'Sei sicuro di voler cancellare questa prenotazione?'
    );

    if (conferma) {
      this.prenotazioniService.eliminaPrenotazione(id).subscribe({
        next: () => {
          alert('Prenotazione eliminata con successo.');
          const email = this.authService.getAuthUsername();
          this.prenotazioniService
            .getPrenotazioniByUtenteId(this.utente$?.id ?? 0, '', '')
            .subscribe({
              next: this.handleResponseCostumer.bind(this),
              error: this.handleError.bind(this),
            });
        },
        error: (err) => {
          alert("Errore durante l'eliminazione dell'utente.");
          console.error(err);
        },
      });
    }
  }

  visualizzaPrenotazioni(id: number) {
    console.log(id);
    this.router.navigate(['homepage/listaprenotazioni'], {
      state: { utenteId: id },
    });
  }
}

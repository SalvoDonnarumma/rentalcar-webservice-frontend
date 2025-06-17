import { Component, OnInit } from '@angular/core';
import { IUtente } from '../../models/Utenti';
import { catchError, EMPTY, map, Observable, of, switchMap } from 'rxjs';
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
import { IVeicolo } from '../../models/Veicoli';
import { VeicoliService } from '../../services/Data/veicoli-service';

@Component({
  selector: 'app-parcoauto',
  imports: [CommonModule, FormsModule, NgxPaginationModule, RouterModule],
  templateUrl: './parcoauto.html',
  styleUrl: './parcoauto.css',
})
export class ParcoAuto {
  veicoli$: IVeicolo[] = [];
  errore: string = '';

  currentPage: number = 1;
  itemsForPage: number = 10;

  filter$: Observable<string | null> = of('');
  filter: string | null = '';

  isAdmin: boolean = false;

  constructor(
    private veicoliService: VeicoliService,
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

      if (this.filter) {
        this.veicoliService
          .getByTarga(this.filter ?? '')
          .pipe(
            catchError((error) => {
              if (error.status === 404) return of([]);
              throw error;
            })
          )
          .subscribe({
            next: (veicoli: IVeicolo[]) => {
              if (veicoli.length > 0) {
                this.veicoli$ = veicoli;
              } else {
                this.veicoliService
                  .getByModello(this.filter ?? '')
                  .pipe(
                    catchError((error) => {
                      if (error.status === 404) return of([]);
                      throw error;
                    })
                  )
                  .subscribe({
                    next: (veicoli: IVeicolo[]) => {
                      if (veicoli.length > 0) {
                        this.veicoli$ = veicoli;
                      } else {
                        this.veicoliService
                          .getByCasaProduttrice(this.filter ?? '')
                          .pipe(
                            catchError((error) => {
                              if (error.status === 404) return of([]);
                              throw error;
                            })
                          )
                          .subscribe({
                            next: (veicoli: IVeicolo[]) => {
                              if (veicoli.length > 0) {
                                this.veicoli$ = veicoli;
                              } else {
                                this.veicoliService
                                  .getByTipologia(this.filter ?? '')
                                  .pipe(
                                    catchError((error) => {
                                      if (error.status === 404) return of([]);
                                      throw error;
                                    })
                                  )
                                  .subscribe({
                                    next: (veicoli: IVeicolo[]) => {
                                      this.veicoli$ = veicoli || [];
                                      console.log('Veicoli estratti: ');
                                      console.log(veicoli);
                                    },
                                    error: this.handleError.bind(this),
                                  });
                              }
                            },
                            error: this.handleError.bind(this),
                          });
                      }
                    },
                    error: this.handleError.bind(this),
                  });
              }
            },
            error: this.handleError.bind(this),
          });
      } else {
        this.veicoliService.getAllVeicoli().subscribe({
          next: this.handleResponse.bind(this),
          error: this.handleError.bind(this),
        });
      }
    });
  }

  handleResponse(response: any) {
    this.veicoli$ = response.data;
    console.log('Veicoli estratti: ');
    console.log(this.veicoli$);
    this.currentPage = 1;
  }

  handleError(error: any) {
    console.error('Error fetching:', error);
    this.errore =
      error.error.message || 'An error occurred while fetching data.';
  }

  cerca() {
    this.router.navigate(['/parcoauto'], {
      queryParams: {
        filter: this.filter,
      },
    });
  }

  modificaVeicolo(veicolo: any): void {
    this.router.navigate(['parcoauto/aggiungiveicolo'], {
      state: { veicolo: veicolo },
    });
  }

  eliminaVeicolo(id: number): void {
    const conferma = window.confirm(
      'Sei sicuro di voler eliminare questo veicolo?'
    );

    if (conferma) {
      this.veicoliService.eliminaVeicolo(id).subscribe({
        next: () => {
          alert('Veicolo eliminato con successo.');
          this.veicoliService.getAllVeicoli().subscribe({
            next: this.handleResponse.bind(this),
            error: this.handleError.bind(this),
          });
        },
        error: (err) => {
          alert("Errore durante l'eliminazione del veicolo.");
          console.error(err);
        },
      });
    }
  }
}

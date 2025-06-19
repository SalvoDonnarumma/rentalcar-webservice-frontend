import { Component, OnInit } from '@angular/core';
import { PrenotazioniService } from '../../services/Data/prenotazioni-service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IPrenotazione } from '../../models/Prenotazioni';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-listaprenotazioni',
  imports: [CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './listaprenotazioni.html',
  styleUrl: './listaprenotazioni.css',
})
export class Listaprenotazioni implements OnInit {
  prenotazioni$: IPrenotazione[] = [];
  errore: string = '';
  dataInit: string = '';
  dataFin: string = '';
  utenteId: number = 0;

  currentPage: number = 1;
  itemsForPage: number = 10;

  constructor(
    private prenotazioniService: PrenotazioniService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    this.utenteId = history.state['utenteId'];

    this.route.queryParamMap.subscribe((params: ParamMap) => {
      this.dataInit = params.get('dataInit') ?? '';
      this.dataFin = params.get('dataFin') ?? '';

      if (this.utenteId) {
        this.prenotazioniService
          .getPrenotazioniByUtenteId(this.utenteId, this.dataInit, this.dataFin)
          .subscribe({
            next: this.handleResponse.bind(this),
            error: this.handleError.bind(this),
          });
      }
    });
  }

  handleResponse(response: any) {
    console.log('fetching andato bene');
    this.prenotazioni$ = response.data;
  }

  handleError(error: any) {
    console.error('Error fetching:', error);
    this.errore =
      error.error.message || 'An error occurred while fetching data.';
  }

  cerca() {
    this.router.navigate(['homepage/listaprenotazioni'], {
      queryParams: {
        dataInit: this.dataInit,
        dataFin: this.dataFin,
      },
    });
  }

  validaPrenotazione(prenotazione: IPrenotazione, stato: string) {
    console.log(stato);
    if (stato === 'APPROVATO' || stato === 'DECLINATO') {
      prenotazione.stato = stato;
      console.log(prenotazione);
    }

    this.prenotazioniService
      .validaPrenotazione(prenotazione.idPrenotazione.toString(), stato)
      .subscribe({
        next: () => {
          alert('Prenotazione validata con successo.');
        },
        error: (err) => {
          alert('Errore durante la validazione della prenotazione.');
          console.error(err);
        },
      });
  }
}

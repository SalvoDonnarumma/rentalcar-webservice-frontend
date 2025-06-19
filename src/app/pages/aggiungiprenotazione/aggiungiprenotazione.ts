import { Component, OnInit } from '@angular/core';
import { IPrenotazione } from '../../models/Prenotazioni';
import { PrenotazioniService } from '../../services/Data/prenotazioni-service';
import { AuthJwtService } from '../../services/auth-jwt-service';
import { VeicoliService } from '../../services/Data/veicoli-service';
import { ActivatedRoute, Router } from '@angular/router';
import { UtentiService } from '../../services/Data/utenti-service';
import { IUtente } from '../../models/Utenti';
import { IVeicolo } from '../../models/Veicoli';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-aggiungiprenotazione',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './aggiungiprenotazione.html',
  styleUrl: './aggiungiprenotazione.css',
})
export class Aggiungiprenotazione implements OnInit {
  prenotazione: IPrenotazione | undefined;
  utente$: IUtente | undefined;
  veicolo$: IVeicolo | undefined;
  errore: string = '';
  prenotazioneForm: FormGroup;
  minDate: string = '';
  isEditMode = false;

  constructor(
    private prenotazioniService: PrenotazioniService,
    private veicoliService: VeicoliService,
    private utentiService: UtentiService,
    private authService: AuthJwtService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.prenotazioneForm = this.fb.group({
      idPrenotazione: [null],
      idVeicolo: [null],
      idUtente: [null],
      dataInizio: ['', Validators.required],
      dataFine: ['', Validators.required],
    });

    const navigation = this.router.getCurrentNavigation();
    this.veicolo$ = navigation?.extras?.state?.['veicolo'];

    this.prenotazione = navigation?.extras?.state?.['prenotazione'];

    if (this.prenotazione) {
      this.isEditMode = true;

      const formatDate = (date: string | Date) =>
        typeof date === 'string'
          ? date?.split('T')[0]
          : date instanceof Date
          ? date.toISOString().split('T')[0]
          : '';

      this.prenotazioneForm.patchValue({
        idPrenotazione: this.prenotazione.idPrenotazione,
        idVeicolo: this.prenotazione.idVeicolo,
        idUtente: this.prenotazione.idUtente,
        dataInizio: formatDate(this.prenotazione.dataInizio),
        dataFine: formatDate(this.prenotazione.dataFine),
      });
    }
  }

  ngOnInit(): void {
    const oggi = new Date();
    oggi.setDate(oggi.getDate() + 3);
    this.minDate = oggi.toISOString().split('T')[0];

    const email = this.authService.getAuthUsername();
    this.utentiService.getUserByEmail(email).subscribe({
      next: this.handleResponseUtenteService.bind(this),
      error: this.handleError.bind(this),
    });

    if (!this.veicolo$ && this.prenotazione?.idPrenotazione !== undefined) {
      this.veicoliService
        .getById(String(this.prenotazione.idVeicolo))
        .subscribe({
          next: this.handleResponseVeicoloService.bind(this),
          error: this.handleError.bind(this),
        });
    }
  }

  handleResponseUtenteService(response: any) {
    this.utente$ = response;
  }

  handleResponseVeicoloService(response: any) {
    this.veicolo$ = response;
  }

  handleError(error: any) {
    console.error('Error fetching:', error);
    this.errore =
      error.error.message || 'An error occurred while fetching data.';
  }

  onSubmit(): void {
    const formData = {
      ...this.prenotazioneForm.value,
      idUtente: this.utente$?.id,
      idVeicolo: this.veicolo$?.id,
    };

    if (this.prenotazioneForm.valid) {
      if (this.isEditMode) {
        this.prenotazioniService.inserisciPrenotazione(formData).subscribe({
          next: () => {
            alert('Prenotazione modificata con successo!');
            this.router.navigate(['homepage']);
          },
          error: (err) => {
            this.handleError(err);
            if (err.status === 400 && err.error?.message) {
              alert(err.error.message);
            } else {
              alert('Errore generico nell’operazione.');
            }
          },
        });
      } else {
        this.prenotazioniService.inserisciPrenotazione(formData).subscribe({
          next: () => {
            alert('Prenotazione creata con successo!');
            this.router.navigate(['homepage']);
          },
          error: (err) => {
            this.handleError(err);
            if (err.status === 400 && err.error?.message) {
              alert(err.error.message);
            } else {
              alert('Errore generico nell’operazione.');
            }
          },
        });
      }
    }
  }
}

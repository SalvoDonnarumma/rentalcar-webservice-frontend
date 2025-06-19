import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UtentiService } from '../../services/Data/utenti-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aggiungiutente',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './aggiungiutente.html',
  styleUrl: './aggiungiutente.css',
})
export class Aggiungiutente implements OnInit {
  utenteForm: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private utentiService: UtentiService,
    private router: Router
  ) {
    this.utenteForm = this.fb.group({
      id: [null],
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      ruolo: ['user', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      confermaPassword: [''],
      vecchiaPassword: [''],
      dataNascita: ['', Validators.required],
    });

    const navigation = this.router.getCurrentNavigation();
    const utente = navigation?.extras?.state?.['utente'];

    if (utente) {
      this.isEditMode = true;
      this.utenteForm.patchValue({
        id: utente.id,
        nome: utente.nome,
        cognome: utente.cognome,
        ruolo: utente.ruolo,
        email: utente.email,
        password: [''],
        confermaPassword: [''],
        vecchiaPassword: [''],
        dataNascita: utente.dataNascita,
      });
    }
  }

  ngOnInit(): void {}

  onSubmit(): void {
    const rawDate = this.utenteForm.value.dataNascita;
    const formattedDate = new Date(rawDate).toISOString().slice(0, 10);

    const formData = {
      ...this.utenteForm.value,
      dataNascita: formattedDate,
    };

    if (this.utenteForm.valid) {
      if (this.isEditMode) {
        this.utentiService.inserisciUtente(formData).subscribe({
          next: () => {
            alert('Utente modificato con successo!');
            this.router.navigate(['homepage']);
          },
          error: (err) => {
            this.handleError(err);
          },
        });
      } else {
        this.utentiService.inserisciUtente(formData).subscribe({
          next: () => {
            alert('Utente inserito con successo!');
            this.router.navigate(['homepage']);
          },
          error: (err) => {
            this.handleError(err);
          },
        });
      }
    }
  }

  private handleError(err: any) {
    if (err.status === 400 && err.error?.message) {
      alert(err.error.message);
    } else {
      alert('Errore generico nell’operazione.');
    }
  }
}

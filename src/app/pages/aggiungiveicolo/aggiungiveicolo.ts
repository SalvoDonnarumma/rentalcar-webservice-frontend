import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  FormGroup,
  Validators,
  Form,
} from '@angular/forms';
import { UtentiService } from '../../services/Data/utenti-service';
import { Router } from '@angular/router';
import { VeicoliService } from '../../services/Data/veicoli-service';

@Component({
  selector: 'app-aggiungiveicolo',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './aggiungiveicolo.html',
  styleUrl: './aggiungiveicolo.css'
})
export class Aggiungiveicolo {
  veicoloForm: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private veicoliService: VeicoliService,
    private router: Router
  ){
    this.veicoloForm = this.fb.group({
      id: [null],
      targa: ['', Validators.required],
      annoImmatricolazione: ['', Validators.required],
      modello: ['', Validators.required],
      casaProduttrice: ['', Validators.required],
      tipologia: ['', Validators.required],
    });

    const navigation = this.router.getCurrentNavigation();
    const veicolo = navigation?.extras?.state?.['veicolo'];

    if(veicolo){
      this.isEditMode = true;
      this.veicoloForm.patchValue(veicolo);
    }
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const formData = {
      ...this.veicoloForm.value,
    };

    if (this.veicoloForm.valid) {
      if (this.isEditMode) {
        this.veicoliService.inserisciVeicolo(formData).subscribe({
          next: () => {
            alert('Veicolo modificato con successo!');
            this.router.navigate(['parcoauto']);
          },
          error: (err) => {
            this.handleError(err);
          },
        });
      } else {
        this.veicoliService.inserisciVeicolo(formData).subscribe({
          next: () => {
            alert('Veicolo inserito con successo!');
            this.router.navigate(['parcoauto']);
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

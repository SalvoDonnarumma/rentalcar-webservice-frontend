import { Component, OnInit } from '@angular/core';
import { IUtente } from '../../models/Utenti';
import { CommonModule } from '@angular/common';
import { UtentiService } from '../../services/Data/utenti-service';
import { AuthJwtService } from '../../services/auth-jwt-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profiloutente',
  imports: [CommonModule],
  templateUrl: './profiloutente.html',
  styleUrl: './profiloutente.css',
})
export class Profiloutente implements OnInit {
  utente$: IUtente | undefined;
  errore: string = '';

  constructor(
    private utentiService: UtentiService,
    private authService: AuthJwtService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const email = this.authService.getAuthUsername();

    this.utentiService.getUserByEmail(email).subscribe({
      next: this.handleResponse.bind(this),
      error: this.handleError.bind(this),
    });
  }

  handleResponse(response: any) {
    this.utente$ = response;
    console.log('Utente estratto: ');
    console.log(this.utente$);
  }

  handleError(error: any) {
    console.error('Error fetching:', error);
    this.errore =
      error.error.message || 'An error occurred while fetching data.';
  }

  modificaUtente(){
    this.router.navigate(['homepage/aggiungiutente'], {
      state: { utente: this.utente$ },
    });
  }

}

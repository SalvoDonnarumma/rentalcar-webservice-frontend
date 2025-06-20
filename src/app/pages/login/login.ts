import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthJwtService } from '../../services/auth-jwt-service';
import { Jumbotron } from '../../core/jumbotron/jumbotron';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [Jumbotron, FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})

export class Login implements OnInit {
  userId: string = "";
  password: string = "";
  autenticato: boolean = true;
  errorMsg: string = '';

  titolo: string = "Accesso & Autenticazione";
  sottotitolo: string = "Procedi ad inserire la userid e la password";

  constructor(private route: Router, private Auth: AuthJwtService) {}

  ngOnInit(): void {
  }

  gestAuth = () => {

      this.Auth.autenticaService(this.userId, this.password).subscribe({
        next: (response) => {
          console.log(response);

          this.autenticato = true;
          this.route.navigate(['welcome',this.userId]);
        },
        error: (error) => {
          this.errorMsg = error;
          console.log(error);
          this.autenticato = false;
        }
      });
  }
}

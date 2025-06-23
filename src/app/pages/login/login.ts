import { Component, effect, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthJwtService } from '../../services/auth-jwt-service';
import { Jumbotron } from '../../core/jumbotron/jumbotron';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  MyButtonConfig,
  MyButtonComponent,
} from '../../core/my-button-component/my-button-component';

@Component({
  selector: 'app-login',
  imports: [Jumbotron, FormsModule, CommonModule, MyButtonComponent],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  userId: string = '';
  password: string = '';
  errorMsg = signal('');
  autenticato = signal(true);

  myButtonSettings: MyButtonConfig = {
    customClass: 'btn btn-info btn-lg btn-block',
    text: 'Connetti',
    icon: '',
  };

  titolo: string = 'Accesso & Autenticazione';
  sottotitolo: string = 'Procedi ad inserire la userid e la password';

  constructor(
    private route: Router,
    private Auth: AuthJwtService,
    private activeRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.errorMsg.set(this.activeRoute.snapshot.params['error']);
    if (this.errorMsg) {
      this.errorMsg.set('Credenziali inserite non valide!');
    }
  }

  gestAuth = () => {
    this.Auth.autenticaService(this.userId, this.password).subscribe({
      next: (response) => {
        console.log(response);

        this.autenticato.set(true);
        this.route.navigate(['welcome', this.userId]);
      },
      error: (error) => {
        const msg = error?.error;
        if (typeof msg === 'string') {
          this.errorMsg.set(msg);
        } else {
          this.errorMsg.set('Credenziali inserite non valide!');
        }

        console.log(error);
        this.autenticato.set(false);
      },
    });
  };
}

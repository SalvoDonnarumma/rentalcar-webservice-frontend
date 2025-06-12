import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Jumbotron } from '../../core/jumbotron/jumbotron';

@Component({
  selector: 'app-welcome',
  imports: [Jumbotron],
  templateUrl: './welcome.html',
  styleUrl: './welcome.css'
})
export class Welcome implements OnInit{
  protected title = 'Welcome to AlphaShop';
  utente: string = "";

  titolo: string = "Benvenuto in AlphaShop";
  sottotitolo: string = "Il tuo negozio online di fiducia";
  
  constructor(private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.utente = this.route.snapshot.params['userId'];
    this.saluti = "Ciao, "+this.utente+" benvenuto/a!";
  }

  saluti : string = "";
  errore : string = "";
}

import { Component, Input, OnInit, input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-jumbotron',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jumbotron.html',
  styleUrl: './jumbotron.css'
})
export class Jumbotron implements OnInit{

  Titolo = input('Benvenuto!');

  SottoTitolo = input('');

  Show = input(true);

  constructor() {
  }

  ngOnInit() {
    // Initialization logic can go here
  }
}

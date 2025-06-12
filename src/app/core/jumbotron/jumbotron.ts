import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-jumbotron',
  imports: [CommonModule],
  templateUrl: './jumbotron.html',
  styleUrl: './jumbotron.css'
})
export class Jumbotron implements OnInit{

  @Input()
  Titolo: string = "";

  @Input()
  SottoTitolo: string = "";

  @Input()
  Show: boolean = true;

  constructor() {
  }

  ngOnInit() {
    // Initialization logic can go here
  }
}

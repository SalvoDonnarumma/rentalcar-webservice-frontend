import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthJwtService } from '../../services/auth-jwt-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit{

  constructor(public jwtAuth: AuthJwtService){}

  ngOnInit():void{

  }

}

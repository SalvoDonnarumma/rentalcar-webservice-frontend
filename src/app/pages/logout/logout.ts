import { Component, OnInit } from '@angular/core';
import { AuthJwtService } from '../../services/auth-jwt-service';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.html',
  styleUrl: './logout.css'
})
export class Logout implements OnInit{

  constructor(private BasicAuth: AuthJwtService) {}

  ngOnInit(): void {
    this.BasicAuth.clearAll();
  }

}

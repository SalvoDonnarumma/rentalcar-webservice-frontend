import { Component, OnInit } from '@angular/core';
import { AuthJwtService } from '../../services/auth-jwt-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.html',
  styleUrl: './logout.css',
})
export class Logout implements OnInit {
  error: string = '';

  constructor(
    private BasicAuth: AuthJwtService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.error = this.route.snapshot.params['error'];
    this.BasicAuth.clearAll();
  }
}

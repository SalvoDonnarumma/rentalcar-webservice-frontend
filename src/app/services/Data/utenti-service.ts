import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUtente } from '../../models/Utenti';

@Injectable({
  providedIn: 'root',
})
export class UtentiService {
  constructor(private httpClient: HttpClient) {}

  getAdminHomepage = (): import('rxjs').Observable<IUtente[]> => {
    return this.httpClient.get<IUtente[]>(
      'http://localhost:8080/utenti/admin/homepage'
    );
  };

  getUserByEmail = (filtro: string): import('rxjs').Observable<IUtente[]> => {
    console.log('Filtro ricevuto: ' + filtro);
    return this.httpClient.get<IUtente[]>(
      'http://localhost:8080/utenti/cerca/filtro/' + filtro
    );
  };

  private readonly apiUrl = 'http://localhost:8080/utenti';
  inserisciUtente(data: any) {
    console.log(data);
    return this.httpClient.post<any>(`${this.apiUrl}/inserisci`, data);
  }

  eliminaUtente(data: any){
    return this.httpClient.delete<any>('http://localhost:8080/utenti/elimina/'+data);
  }

  
}

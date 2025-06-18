import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { IUtente } from '../../models/Utenti';
import { IPrenotazione } from '../../models/Prenotazioni';

@Injectable({
  providedIn: 'root'
})
export class PrenotazioniService {

  constructor(private httpClient : HttpClient) { }

  getCostumerHomepage = (email: string, dataInit: string, dataFin: string): import('rxjs').Observable<IPrenotazione[]> => {
    return this.httpClient.get<IPrenotazione[]>('http://localhost:8080/prenotazioni/cerca/email/'+email+'?dataInit='+dataInit+'&dataFin='+dataFin);
  }

  private readonly apiUrl = 'http://localhost:8080/prenotazioni';
  inserisciPrenotazione(data: any){
    console.log(data);
    return this.httpClient.post<any>(`${this.apiUrl}/inserisci`, data);
  }

  eliminaPrenotazione(data: any){
    return this.httpClient.delete<any>('http://localhost:8080/prenotazioni/elimina/'+data);
  }
}

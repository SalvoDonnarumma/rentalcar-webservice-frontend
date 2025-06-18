import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { IVeicolo } from '../../models/Veicoli';

@Injectable({
  providedIn: 'root'
})
export class VeicoliService {

  constructor(private httpClient : HttpClient) { }

  getAllVeicoli = (): import('rxjs').Observable<IVeicolo[]> => {
    return this.httpClient.get<IVeicolo[]>('http://localhost:8080/veicoli/parcoauto');
  }

  getByTarga = (filter: string): import('rxjs').Observable<IVeicolo[]> => {
    return this.httpClient.get<IVeicolo[]>('http://localhost:8080/veicoli/cerca/targa/'+filter);
  }

  getByModello = (filter: string): import('rxjs').Observable<IVeicolo[]> => {
    return this.httpClient.get<IVeicolo[]>('http://localhost:8080/veicoli/cerca/modello/'+filter);
  }

  getByCasaProduttrice = (filter: string): import('rxjs').Observable<IVeicolo[]> => {
    return this.httpClient.get<IVeicolo[]>('http://localhost:8080/veicoli/cerca/casaProd/'+filter);
  }

  getByTipologia = (filter: string): import('rxjs').Observable<IVeicolo[]> => {
    return this.httpClient.get<IVeicolo[]>('http://localhost:8080/veicoli/cerca/tipologia/'+filter);
  }

  getById = (filter: string): import('rxjs').Observable<IVeicolo> => {
    return this.httpClient.get<IVeicolo>('http://localhost:8080/veicoli/cerca/veicoloid/'+filter);
  }
 

  private readonly apiUrl = 'http://localhost:8080/veicoli';
  inserisciVeicolo(data: any) {
    console.log(data);
    return this.httpClient.post<any>(`${this.apiUrl}/inserisci`, data);
  }

  eliminaVeicolo(data: any){
    return this.httpClient.delete<any>('http://localhost:8080/veicoli/elimina/'+data);
  }
}

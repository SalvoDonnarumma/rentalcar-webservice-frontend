import { IPrenotazione } from './Prenotazioni';

export interface IVeicolo {
  id: number;
  targa: string;
  annoImmatricolazione: number;
  modello: string;
  casaProduttrice: string;
  tipologia: string;
  prenotazioni: IPrenotazione[];
}

/*"id": 1,
    "targa": "AB123CD",
    "annoImmatricolazione": "2021",
    "modello": "Qashqai",
    "casaProduttrice": "Nissan",
    "tipologia": "SUV",
    "prenotazioni": [
        {
            "idPrenotazione": 13,
            "dataInizio": "2025-05-22T00:00:00.000+00:00",
            "dataFine": "2025-05-25T00:00:00.000+00:00",
            "stato": "DECLINATO",
            "idUtente": 46,
            "idVeicolo": 1,
            "isPrenotazioneValid": null
        }
    ] */

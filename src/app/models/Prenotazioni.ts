export interface IPrenotazione {
  idPrenotazione: number;
  dataInizio: Date;
  dataFine: Date;
  stato: string;
  idUtente: number;
  idVeicolo: number;
  isPrenotazioneValid: boolean;
}

/*prenotazioni":{
            "idPrenotazione": 13,
            "dataInizio": "2025-05-22T00:00:00.000+00:00",
            "dataFine": "2025-05-25T00:00:00.000+00:00",
            "stato": "DECLINATO",
            "idUtente": 46,
            "idVeicolo": 1,
            "isPrenotazioneValid": null
} */

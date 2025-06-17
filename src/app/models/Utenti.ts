import { IPrenotazione } from './Prenotazioni';

export interface IUtente {
  id: number;
  nome: string;
  cognome: string;
  dataNascita: Date;
  ruolo: string;
  email: string;
  password: string;
  vecchiaPassword: string;
  confermaPassword: string;
  prenotazioni: IPrenotazione[];
}

/*{
    "id": 56,
    "nome": "Test",
    "cognome": "test",
    "dataNascita": "1990-03-28",
    "ruolo": "user",
    "email": "test.test@rentalcar.it",
    "password": "$2a$10$muwcMPMlsswCRwKlMYVFEOlVDBCL/2oYPLRsBE8kCI3CaDy5yybfi",
    "vecchiaPassword": "$2a$10$muwcMPMlsswCRwKlMYVFEOlVDBCL/2oYPLRsBE8kCI3CaDy5yybfi",
    "confermaPassword": null,
    "prenotazioni": []
} */

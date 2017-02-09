import {DateFormatter} from "@angular/common/src/pipes/intl";
/**
 * Created by Rocco on 22/09/2016.
 */

export class CliFor {

  id:number;
  userId:number;
  tipo:string; 			      //Tipologia(persona giuridica, persona fisica, pubblica amministrazione)
  denominazione:string;   //Ragione Sociale oppure Denominazione Ente
  intestazioneCognomeNome:string;
  codiceFiscale:string;
  partitaIVA:string;
  pIvaCf:string;
  cognome:string;
  nome:string;
  dataNascita:string;
  luogoNascita:string;
  indirizzo:string;
  cap:string;
  citta:string;
  provincia:string;
  regione:string;
  nazione:string;
  telefono:string;
  email:string;
  postaCertificata:string;
  cellulare:string;
  fax:string;
  voceAcquisto:string;
  codiciIVA:number;
  terminiPagamento:number;  // giorni pagamento
  tipoTerminiPagamento:string;  	//DF(Data dalla fattura), FM(Fattura fine mese)
  tipoCF:string;                  //C(Cliente)-F(Fornitore)
  stato:string;  							    //A(Attivo) - D(Disattivo)
  insUser:string;
  modUser:string;
  ragioneSociale:string;


  // public get dataNascita():string{
  //   console.log("CHIAMO GETTER DATA NASCITA: " + DateFormatter.format(this._dataNascita, 'it', 'dd/MM/yyyy'));
  //   return DateFormatter.format(this._dataNascita, 'it', 'dd/MM/yyyy');
  // }
  //
  // public set dataNascita(date:string){
  //   this._dataNascita = new Date();
  // }

}

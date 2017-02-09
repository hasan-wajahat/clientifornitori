/**
 * Created by Rocco on 17/10/2016.
 */

  import {Document} from "../commons/Document";

export class User {

  id:number;
  username:string;
  password:string;
  newPassword:string;
  mail:string;

  logo:Document;
  visuraCamerale:Document;
  cartaIdentita:Document;

  intestazione:string;
  formaGiuridica:string;
  codiceFiscale:string;
  partitaIVA:string;
  indirizzo:string;
  cap:string;
  citta:string;
  nazione:string;
  provincia:string;
  telefono:string;
  postaCertificata:string;
  cellulare:string;
  fax:string;
  tipoGestioneIVA:string;
  percentualeRivalsa:number;
  tipoRivalsa:string;
  percentualeRitenuta:number;
  codiceAteco:string;
  codiciAliquote:number[];
  percentualeImponibile:number;
  saldoContoCassa:number;
  dataDiValidita:string;
  dataRegistrazione:Date;
  presaVisioneCondContr:boolean;
  accettazioniCondContr:boolean;
  trattamentoDatiSensibili:boolean;
  autorizzazioneAddebitoSuCC:boolean;
  accettazioneVerificaDD:boolean;
  autorizzazioneFirmaFatture:boolean;
  delegaConservazioneSostituitiva:boolean;
  regimeForfettario:boolean;
  regimeIVAPerCassa:boolean;
  agenteCommercio:string;
  roles:string[];

  nomeReport:string;
}


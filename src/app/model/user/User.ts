/**
 * Created by Rocco on 17/10/2016.
 */

import {Document} from "../commons/Document";
import {TipoCassa} from "../fatturazione-elettronica/TipoCassa";
import {RegimeFiscale} from "../fatturazione-elettronica/RegimeFiscale";
import {CausaliModelli} from "../fatturazione-elettronica/CausaliModelli";

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
  regimeIVAPerCassa:boolean;
  agenteCommercio:string;
  roles:string[];
  nomeReport:string;
  regimeForfettario:boolean;
  fatturazioneElettronica:boolean;
  tipoCassa:TipoCassa;
  regimeFiscale:RegimeFiscale;
  causaliModelli:CausaliModelli;
}


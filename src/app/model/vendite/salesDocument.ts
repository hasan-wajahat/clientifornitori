import { CliFor } from "../clientifornitori/CliFor";

export class SalesDocument {
  articoli: any;
  castelletoIVA: any;
  cliFor: CliFor;
  dataEmissione: string;
  documento: any;
  fatturaRiferimentoId: number;
  id: number;
  marcaDaBollo: number;
  modalitaPagamento: any;
  noteAggiuntive: string;
  numeroDocument: string;
  numeroProgressivoDocumento: number;
  pagamenti: any;
  pcImponibile: number;
  pcRitenutaAcconto: number;
  pcRitenutaEnasarco: number;
  pcRivalsa: number;
  pcScontoTotale: number;
  ritenutaAcconto: number;
  scadenze: any;
  statoDocumento: string;
  statoInviato: boolean;
  statoInviatoSDI: boolean;
  statoPagamento: string;
  template: string;
  tipoDocumento: string;
  totConVariazioni: number;
  totDaPagare: number;
  totDocumento: number;
  totImponibile: number;
  totPagato: number;
  valuta: string;
}
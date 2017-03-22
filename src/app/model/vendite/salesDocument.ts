import { ClienteFornitore } from "./clienteFornitore";
import { Articoli } from "./articoli";
import { CastellettoIVA } from "./castellettoIVA"
import { Pagamenti } from "./pagamenti";

export class SalesDocument {
  articoli: Articoli[];
  castellettoIVA: CastellettoIVA[];
  cliFor: ClienteFornitore;
  dataEmissione: string;
  documento: any;
  fatturaRiferimentoId: number;
  id: number;
  marcaDaBollo: number;
  modalitaPagamento: any;
  noteAggiuntive: string;
  numeroDocumento: string;
  numeroProgressivoDocumento: number;
  pagamenti: Pagamenti[];
  pcImponibile: number;
  pcRitenutaAcconto: number;
  pcRitenutaEnasarco: number;
  pcRivalsa: number;
  pcScontoTotale: number;
  ritenutaAcconto: number;
  ritenutaEnasarco: number;
  rivalsa: number;
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
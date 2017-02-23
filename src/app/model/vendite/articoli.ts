import {CodiceIVA} from "./codiceiva"

export class Articoli {
  id: number;
  codiceIVA: CodiceIVA;
  codiceArticolo: string;
  tipoVendita: string;
  descrizioneArticolo: string;
  unitaMisura: string;
  quantita: number;
  importoUnitario: number;
  pcSconto: number;
  totNetto: number;
  soggettoRitenuta: boolean;
}
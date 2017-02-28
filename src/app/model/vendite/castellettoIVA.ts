import { CodiceIVA } from "./codiceiva"
import { VoceAcquisto } from "./voceAcquisto";

export class CastellettoIVA {
  id: number;
  imponibile: number;
  imposta: number;
  voceAcquisto: VoceAcquisto;
  codiceIVA: CodiceIVA;
}


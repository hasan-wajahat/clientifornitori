import { SalesDocument } from "../../../model/vendite/salesDocument";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Injectable } from '@angular/core';

@Injectable()
export class SalesFormCreator {

  constructor(private fb: FormBuilder) { }

  public buildSalesForm(salesDocument: SalesDocument): FormGroup {

    const salesDocumentForm: FormGroup = this.fb.group({
      articoli: [salesDocument.articoli],
      castelletoIVA: [salesDocument.castelletoIVA],
      cliFor: [salesDocument.cliFor],
      dataEmissione: [salesDocument.dataEmissione],
      documento: [salesDocument.documento],
      fatturaRiferimentoId: [salesDocument.fatturaRiferimentoId],
      id: [salesDocument.id],
      marcaDaBollo: [salesDocument.marcaDaBollo],
      modalitaPagamento: [salesDocument.modalitaPagamento],
      noteAggiuntive: [salesDocument.noteAggiuntive],
      numeroDocument: [salesDocument.numeroDocument],
      numeroProgressivoDocumento: [salesDocument.numeroProgressivoDocumento],
      pagamenti: [salesDocument.pagamenti],
      pcImponibile: [salesDocument.pcImponibile],
      pcRitenutaAcconto: [salesDocument.pcRitenutaAcconto],
      pcRitenutaEnasarco: [salesDocument.pcRitenutaEnasarco],
      pcRivalsa: [salesDocument.pcRivalsa],
      pcScontoTotale: [salesDocument.pcScontoTotale],
      ritenutaAcconto: [salesDocument.ritenutaAcconto],
      scadenze: [salesDocument.scadenze],
      statoDocumento: [salesDocument.statoDocumento],
      statoInviato: [salesDocument.statoInviato],
      statoInviatoSDI: [salesDocument.statoInviato],
      statoPagamento: [salesDocument.statoPagamento],
      template: [salesDocument.template],
      tipoDocumento: [salesDocument.tipoDocumento],
      totConVariazioni: [salesDocument.totConVariazioni],
      totDaPagare: [salesDocument.totDaPagare],
      totDocumento: [salesDocument.totDocumento],
      totImponibile: [salesDocument.totImponibile],
      totPagato: [salesDocument.totPagato],
      valuta: [salesDocument.valuta],
    })
    return salesDocumentForm;
  }
}
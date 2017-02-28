import { SalesDocument } from "../../../model/vendite/salesDocument";
import { FormGroup, FormArray, FormBuilder, Validators } from "@angular/forms";
import { Injectable } from '@angular/core';

@Injectable()
export class SalesFormCreator {

  constructor(private fb: FormBuilder) { }

  public buildSalesForm(salesDocument: SalesDocument): FormGroup {

    const salesDocumentForm: FormGroup = this.fb.group({
      articoli: this.fb.array([]),
      castelletoIVA: [salesDocument.castelletoIVA],
      cliFor: this.fb.group({
        denominazione: [salesDocument.cliFor.denominazione],
        partitaIVA: [salesDocument.cliFor.partitaIVA],
        mail: [salesDocument.cliFor.mail],
        indirizzo: [salesDocument.cliFor.indirizzo],
        citta: [salesDocument.cliFor.citta],
        tipo: [salesDocument.cliFor.tipo]
      }),
      dataEmissione: [salesDocument.dataEmissione],
      documento: [salesDocument.documento],
      fatturaRiferimentoId: [salesDocument.fatturaRiferimentoId],
      id: [salesDocument.id],
      marcaDaBollo: [salesDocument.marcaDaBollo],
      modalitaPagamento: [salesDocument.modalitaPagamento],
      noteAggiuntive: [salesDocument.noteAggiuntive],
      numeroDocumento: [salesDocument.numeroDocumento],
      numeroProgressivoDocumento: [salesDocument.numeroProgressivoDocumento],
      pagamenti: [salesDocument.pagamenti],
      pcImponibile: [salesDocument.pcImponibile],
      pcRitenutaAcconto: [salesDocument.pcRitenutaAcconto],
      pcRitenutaEnasarco: [salesDocument.pcRitenutaEnasarco],
      pcRivalsa: [salesDocument.pcRivalsa],
      pcScontoTotale: [salesDocument.pcScontoTotale],
      ritenutaAcconto: [salesDocument.ritenutaAcconto],
      ritenutaEnasarco: [salesDocument.ritenutaEnasarco],
      rivalsa: [salesDocument.rivalsa],
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
    // create articoli form group
    const control = <FormArray>salesDocumentForm.controls['articoli'];
    for (let articoliItem of salesDocument.articoli) {
      control.push(this.fb.group({
        id: [articoliItem.id],
        codiceIVA: this.fb.group({
          codiceId: [articoliItem.codiceIVA.codiceId],
          descrizione: [articoliItem.codiceIVA.descrizione],
          dateFrom: [articoliItem.codiceIVA.dateFrom],
          dateTo: [articoliItem.codiceIVA.dateTo],
          dafaultVAT: [articoliItem.codiceIVA.dafaultVAT],
          pcAliquota: [articoliItem.codiceIVA.pcAliquota]
        }),
        codiceArticolo: [articoliItem.codiceArticolo],
        tipoVendita: [articoliItem.tipoVendita],
        descrizioneArticolo: [articoliItem.descrizioneArticolo],
        unitaMisura: [articoliItem.unitaMisura],
        quantita: [articoliItem.quantita],
        importoUnitario: [articoliItem.importoUnitario],
        pcSconto: [articoliItem.pcSconto],
        totNetto: [articoliItem.totNetto],
        soggettoRitenuta: [articoliItem.soggettoRitenuta]
      }))
    }

    return salesDocumentForm;
  }
}
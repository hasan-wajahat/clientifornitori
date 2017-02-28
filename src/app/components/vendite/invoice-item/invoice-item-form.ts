import { SalesDocument } from "../../../model/vendite/salesDocument";
import { FormGroup, FormArray, FormBuilder, Validators } from "@angular/forms";
import { Injectable } from '@angular/core';

@Injectable()
export class SalesFormCreator {

  constructor(private fb: FormBuilder) { }

  public buildSalesForm(salesDocument: SalesDocument): FormGroup {

    const salesDocumentForm: FormGroup = this.fb.group({
      articoli: this.fb.array([]),
      castellettoIVA: this.fb.array([
        this.fb.group({
          id: salesDocument.castellettoIVA[0].id,
          imponibile: salesDocument.castellettoIVA[0].imponibile,
          imposta: salesDocument.castellettoIVA[0].imposta,
          voceAcquisto: this.fb.group({
            voceId: salesDocument.castellettoIVA[0].voceAcquisto.voceId,
            nome: salesDocument.castellettoIVA[0].voceAcquisto.nome,
            label: salesDocument.castellettoIVA[0].voceAcquisto.label,
            dateFrom: salesDocument.castellettoIVA[0].voceAcquisto.dateFrom,
            dateTo: salesDocument.castellettoIVA[0].voceAcquisto.dateTo,
          }),
          codiceIVA: this.fb.group({
            codiceId: [salesDocument.castellettoIVA[0].codiceIVA.codiceId],
            descrizione: [salesDocument.castellettoIVA[0].codiceIVA.descrizione],
            dateFrom: [salesDocument.castellettoIVA[0].codiceIVA.dateFrom],
            dateTo: [salesDocument.castellettoIVA[0].codiceIVA.dateTo],
            dafaultVAT: [salesDocument.castellettoIVA[0].codiceIVA.dafaultVAT],
            pcAliquota: [salesDocument.castellettoIVA[0].codiceIVA.pcAliquota],
          }),
        })
      ]),
      cliFor: this.fb.group({
        id: [salesDocument.cliFor.id],
        tipo: [salesDocument.cliFor.tipo],
        intestazione: [salesDocument.cliFor.intestazione],
        codiceFiscale: [salesDocument.cliFor.codiceFiscale],
        partitaIVA: [salesDocument.cliFor.partitaIVA],
        pIvaCf: [salesDocument.cliFor.pIvaCf],
        cognome: [salesDocument.cliFor.cognome],
        nome: [salesDocument.cliFor.nome],
        intestazioneCognomeNome: [salesDocument.cliFor.intestazioneCognomeNome],
        dataNascita: [salesDocument.cliFor.dataNascita],
        luogoNascita: [salesDocument.cliFor.luogoNascita],
        indirizzo: [salesDocument.cliFor.indirizzo],
        cap: [salesDocument.cliFor.cap],
        citta: [salesDocument.cliFor.citta],
        provincia: [salesDocument.cliFor.provincia],
        regione: [salesDocument.cliFor.regione],
        nazione: [salesDocument.cliFor.nazione],
        email: [salesDocument.cliFor.email],
        postaCertificata: [salesDocument.cliFor.postaCertificata],
        cellulare: [salesDocument.cliFor.cellulare],
        fax: [salesDocument.cliFor.fax],
        voceAcquisto: [salesDocument.cliFor.voceAcquisto],
        codiciIVA: [salesDocument.cliFor.codiciIVA],
        cellulterminiPagamentoare: [salesDocument.cliFor.terminiPagamento],
        stato: [salesDocument.cliFor.stato],
        docConnessi: [salesDocument.cliFor.docConnessi],
        saldoDC: [salesDocument.cliFor.saldoDC],
        tipoTerminiPagamento: [salesDocument.cliFor.tipoTerminiPagamento],
        tipoCF: [salesDocument.cliFor.tipoCF],
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
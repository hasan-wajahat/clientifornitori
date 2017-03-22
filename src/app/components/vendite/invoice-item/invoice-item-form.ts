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
        // nazione: [salesDocument.cliFor.nazione],
        // api is returning Italia
        nazione: ['IT'],
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
      pagamenti: this.fb.array([]),
      pcImponibile: [null],
      pcRitenutaAcconto: [null],
      pcRitenutaEnasarco: [''],
      pcRivalsa: [null],
      pcScontoTotale: [salesDocument.pcScontoTotale],
      ritenutaAcconto: [salesDocument.ritenutaAcconto],
      ritenutaEnasarco: [salesDocument.ritenutaEnasarco],
      rivalsa: [null],
      // scadenze: [salesDocument.scadenze],
      scadenze: this.fb.array([
        this.fb.group({
          id: salesDocument.scadenze[0].id,
          vendita: salesDocument.scadenze[0].vendita,
          importo: salesDocument.scadenze[0].importo,
          importoDaSaldare: salesDocument.scadenze[0].importoDaSaldare,
          dataScadenza: salesDocument.scadenze[0].dataScadenza
        })
      ]),
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
      datiArticoli: [true],
      datiPagamento: true,
      datiContabili: true,
      // not working
      // datiAnagrafici: true,
      controlloEnasarco: [true],
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

    const pagamentiControl = <FormArray>salesDocumentForm.controls['pagamenti'];
    for (let pagamentiItem of salesDocument.pagamenti) {
      pagamentiControl.push(this.fb.group({
        id: [pagamentiItem.id],
        venId: [pagamentiItem.venId],
        contrId: [pagamentiItem.contoId],
        data: [pagamentiItem.data],
        causale: [pagamentiItem.causale],
        importo: [pagamentiItem.importo],
        stato: [pagamentiItem.stato],
        tipo: [pagamentiItem.tipo],
        tipoOperazaione: [pagamentiItem.tipoOperazaione],
      }))
    }

    return salesDocumentForm;
  }

  createEmptyForm() {
    const salesDocumentForm: FormGroup = this.fb.group({
      articoli: this.fb.array([
        this.fb.group({
          id: [null],
          codiceIVA: this.fb.group({
            codiceId: [],
            descrizione: [],
            dateFrom: [],
            dateTo: [],
            dafaultVAT: [],
            pcAliquota: []
          }),
          codiceArticolo: [],
          tipoVendita: [],
          descrizioneArticolo: [],
          unitaMisura: [],
          quantita: [],
          importoUnitario: [],
          pcSconto: [],
          totNetto: [],
          soggettoRitenuta: []
        })
      ]),
      castellettoIVA: this.fb.array([
        this.fb.group({
          id: [null],
          imponibile: [],
          imposta: [],
          voceAcquisto: this.fb.group({
            voceId: [],
          }),
          codiceIVA: this.fb.group({
            codiceId: [],
            descrizione: [],
            dateFrom: [],
            dateTo: [],
            dafaultVAT: [],
            pcAliquota: [],
          }),
        })
      ]),
      cliFor: this.fb.group({
        id: [],
        tipo: [],
        intestazione: [],
        codiceFiscale: [],
        partitaIVA: [],
        pIvaCf: [],
        cognome: [],
        nome: [],
        intestazioneCognomeNome: [],
        dataNascita: [],
        luogoNascita: [],
        indirizzo: [],
        cap: [],
        citta: [],
        provincia: [],
        regione: [],
        // nazione: [salesDocument.cliFor.nazione],
        // api is returning Italia
        nazione: [],
        email: [],
        postaCertificata: [],
        cellulare: [],
        fax: [],
        voceAcquisto: [],
        codiciIVA: [],
        cellulterminiPagamentoare: [],
        stato: [],
        docConnessi: [],
        saldoDC: [],
        tipoTerminiPagamento: [],
        tipoCF: [],
      }),
      dataEmissione: [],
      marcaDaBollo: [],
      modalitaPagamento: [],
      noteAggiuntive: ['note aggiuntive'],
      pagamenti: [],
      pcRitenutaEnasarco: [''],
      ritenutaAcconto: [],
      ritenutaEnasarco: [],
      numeroDocumento: [],
      rivalsa: [null],
      // scadenze: [salesDocument.scadenze],
      scadenze: this.fb.array([
        this.fb.group({
          id: [],
          vendita: [],
          importo: [],
          importoDaSaldare: [],
          dataScadenza: []
        })
      ]),
      template: ['FORFETTARIO_LP'],
      tipoDocumento: ['FATTURA_VENDITA'],
      totConVariazioni: [],
      totDaPagare: [],
      totDocumento: [],
      totImponibile: [],
      totPagato: [],
      controlloEnasarco: [true],
    })

    return salesDocumentForm;
  }
}
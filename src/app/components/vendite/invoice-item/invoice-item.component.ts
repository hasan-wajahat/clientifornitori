import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from "@angular/router";
import { VenditeService } from "../../../services/vendite/vendite.service";
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from "@angular/forms";
import { SalesDocument } from "../../../model/vendite/salesDocument";
import { SalesFormCreator } from "./invoice-item-form";
import { CommonService } from "../../../services/common/common.service";
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-invoice-item',
  templateUrl: './invoice-item.component.html',
  styleUrls: ['./invoice-item.component.css'],
  providers: [SalesFormCreator]
})
export class InvoiceItemComponent implements OnInit {
  salesDocumentForm: FormGroup;
  it: any;
  yearRange: string;
  today = new Date();
  issueDate = new Date();
  tipoVenditaDropDown: any;
  unitaMisuraDropDown: any;
  codesVATDropDown: any = [];
  codesVAT: number[] = [];
  totaleImponible: number;
  totLordo: number[] = [];

  constructor(private venditeService: VenditeService, private route: ActivatedRoute,
    private salesFormCreator: SalesFormCreator, private fb: FormBuilder) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.venditeService.getSale(params['id']).subscribe(
          res => {
            console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
            this.salesDocumentForm = this.salesFormCreator.buildSalesForm(res);
            this.initializeDate(res);
            this.createVATDropDown();
            this.createModelArray();
            this.calculateTotals();
          },
          error => console.log(error)
        )
      }
    );
    this.inizializzaCalendar();
    this.initializeArray();

  }

  initializeArray() {
    this.tipoVenditaDropDown = [
      { value: 'Merce' },
      { value: 'Beni' },
      { value: 'Servizi' },
      { value: 'Marca Da Bollo' }
    ];
    this.unitaMisuraDropDown = [
      { value: 'LT' },
      { value: 'MT' },
      { value: 'PZ' },
      { value: 'NR' },
      { value: 'MQ' },
    ]

  }

  createModelArray() {
    let articles = this.salesDocumentForm.value.articoli;
    this.codesVAT = articles.map(article => article.codiceIVA.pcAliquota);
    this.totLordo = articles.map(article => article.totNetto + article.totNetto * article.codiceIVA.pcAliquota);
  }

  inizializzaCalendar() {
    this.it = CommonService.getCalendarLanguage();
    this.yearRange = (new Date().getFullYear() - 100) + ":" + new Date().getFullYear();
  }

  initializeDate(response) {
    this.issueDate.setDate(+response.dataEmissione.split('-')[2]);
    this.issueDate.setFullYear(+response.dataEmissione.split('-')[0]);
    this.issueDate.setMonth(response.dataEmissione.split('-')[1] - 1);
  }

  convertToDate(dateString) {
    let date = new Date();
    date.setDate(+dateString.split('-')[2]);
    date.setFullYear(+dateString.split('-')[0]);
    date.setMonth(dateString.split('-')[1] - 1);
    return date;
  }

  createVATDropDown() {
    this.venditeService.getcodesVAT().subscribe(
      res => {
        res.map(val => {
          let startVatDate = this.convertToDate(val.dateFrom);
          let endVatDate = this.convertToDate(val.dateTo);
          if (startVatDate < this.issueDate && endVatDate > this.issueDate) {
            if (!hasVat(this.codesVATDropDown, val.pcAliquota)) {
              this.codesVATDropDown.push({ value: val.pcAliquota });
            }
          }
        })
      })
    function hasVat(arr, val) {
      return arr.some(arrVal => val === arrVal.value);
    }
  }

  issueDateSet() {
    this.createVATDropDown();
  }

  calculateTotaleNetto(event: any, index: number, type: string) {
    let item = this.salesDocumentForm.value.articoli[index];
    const article = <FormArray>this.salesDocumentForm.controls['articoli']
    let val = 0;
    let totalNet = 0;
    if (type == "quantita") {
      val = event * item.importoUnitario;
      totalNet = val - (val * (item.pcSconto / 100));
    } else if (type == "unit") {
      val = item.quantita * event;
      totalNet = val - (val * (item.pcSconto / 100));
    } else if (type == "discount") {
      val = item.quantita * item.importoUnitario;
      totalNet = val - (val * (event / 100));
    }
    this.totLordo[index] = totalNet + (totalNet * (item.codiceIVA.pcAliquota / 100));
    article.controls[index].patchValue({ totNetto: totalNet });
  }

  updateModels(val: number, index: number) {
    let item = this.salesDocumentForm.value.articoli[index];
    this.codesVAT[index] = val;
    this.totLordo[index] = item.totNetto + item.totNetto * (val / 100);
  }

  addArticle() {
    const control = <FormArray>this.salesDocumentForm.controls['articoli'];
    let item = control.value[0];
    control.push(this.fb.group({
      id: [''],
      codiceIVA: this.fb.group({
        codiceId: [''],
        descrizione: [''],
        dateFrom: [''],
        dateTo: [''],
        dafaultVAT: [''],
        pcAliquota: ['']
      }),
      codiceArticolo: [''],
      tipoVendita: [''],
      descrizioneArticolo: [''],
      unitaMisura: [''],
      quantita: [''],
      importoUnitario: [''],
      pcSconto: [''],
      totNetto: [''],
      soggettoRitenuta: ['']
    }))
    this.codesVAT.push(0);
  }

  deleteArticle(index: number) {
    const control = <FormArray>this.salesDocumentForm.controls['articoli'];
    control.removeAt(index);
  }

  calculateTotals(val?: number, index?: number, group?: FormGroup) {
    const control = <FormArray>this.salesDocumentForm.controls['articoli'];
    if (val) {
      // this.totaleImponible = this.totaleImponible - control.value[index].totNetto + val
      setTimeout(() => {
        this.totaleImponible = 0;
        for (let item of control.value) {
          this.totaleImponible += item.totNetto
        }
      }, 200);
    } else {
      this.totaleImponible = 0;
      for (let item of control.value) {
        this.totaleImponible += item.totNetto
      }
    }
  }

  totLordoChange(val: number, index: number) {
    // TODO: replace it by observables and rxjs debounce
    setTimeout(() => {
      const article = <FormArray>this.salesDocumentForm.controls['articoli'];
      let totalNet = val / (1 + (article.value[index].codiceIVA.pcAliquota));
      let discount = (1 - (totalNet / (article.value[index].quantita * article.value[index].importoUnitario))) * 100;
      article.controls[index].patchValue({ totNetto: totalNet, pcSconto: discount });
    }, 2000);
  }

  test() {
    console.log(this.salesDocumentForm.value.articoli[0]);
  }
}

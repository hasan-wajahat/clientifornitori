import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from "@angular/router";
import { VenditeService } from "../../../services/vendite/vendite.service";
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from "@angular/forms";
import { SalesDocument } from "../../../model/vendite/salesDocument";
import { SalesFormCreator } from "./invoice-item-form";
import { CommonService } from "../../../services/common/common.service";
import { User } from "../../../model/user/User";
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
  userData: User;
  yearRange: string;
  today = new Date();
  issueDate = new Date();
  tipoVenditaDropDown: any;
  unitaMisuraDropDown: any;
  codesVATDropDown: any = [];
  codesVAT: number[] = [];
  totaleImponible: number;
  totLordo: number[] = [];
  totaleImposte: number;
  raginoe: string;

  constructor(private venditeService: VenditeService, private route: ActivatedRoute,
    private salesFormCreator: SalesFormCreator, private fb: FormBuilder) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        if (params['id'] == 'new') {
          this.createVATDropDown();
          this.salesDocumentForm = this.salesFormCreator.createEmptyForm();
          this.createNewList();
        } else {
          this.venditeService.getSale(params['id']).subscribe(
            res => {
              console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
              this.salesDocumentForm = this.salesFormCreator.buildSalesForm(res);
              this.initializeDate(res);
              this.createVATDropDown();
              this.createModelArray();
              this.calculateTotals();
              this.venditeService.getConfigParameters(res.dataEmissione).subscribe(
                response => this.salesDocumentForm.patchValue({ pcRitenutaEnasarco: response[2].value })
              );
            },
            error => console.log(error)
          )
        }
      }
    );

    this.userData = <User>JSON.parse(sessionStorage.getItem("UserData"));
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
    this.calculateRitenutaEnasarco();
  }

  createNewList() {
    this.salesDocumentForm.controls['cliFor']
    ['controls']['cognome'].valueChanges.debounceTime(400).subscribe(
      r => {
        if (this.raginoe != r) {
          this.venditeService.getCli(r, '').subscribe(
            res => {
              if (res.pop()) {
                this.salesDocumentForm.patchValue({ cliFor: res.pop() });
              } else {
                this.salesDocumentForm.controls['cliFor'].reset();
              }
            }
          );
        }
        this.raginoe = r;
      });
  }

  updateModels(val: number, index: number) {
    let item = this.salesDocumentForm.value.articoli[index];
    this.codesVAT[index] = val;
    this.totLordo[index] = item.totNetto + item.totNetto * (val / 100);
    this.calculateTotals(1);
  }

  addArticle() {
    const control = <FormArray>this.salesDocumentForm.controls['articoli'];
    let item = control.value[0];
    control.push(this.fb.group({
      id: [''],
      codiceIVA: this.fb.group({
        codiceId: [item.codiceIVA.codiceId],
        descrizione: [item.codiceIVA.descrizione],
        dateFrom: [item.codiceIVA.dateFrom],
        dateTo: [item.codiceIVA.dateTo],
        dafaultVAT: [false],
        pcAliquota: [item.codiceIVA.pcAliquota]
      }),
      codiceArticolo: [''],
      tipoVendita: [''],
      descrizioneArticolo: [''],
      unitaMisura: [''],
      quantita: [''],
      importoUnitario: [''],
      pcSconto: [0],
      totNetto: [''],
      soggettoRitenuta: [false]
    }))
    this.codesVAT.push(0);
  }

  deleteArticle(index: number) {
    const control = <FormArray>this.salesDocumentForm.controls['articoli'];
    control.removeAt(index);
  }

  calculateTotals(val?: number) {
    const control = <FormArray>this.salesDocumentForm.controls['articoli'];
    if (val) {
      setTimeout(() => {
        this.totaleImponible = 0;
        this.totaleImposte = 0
        for (let item of control.value) {
          this.totaleImponible += item.totNetto
          this.totaleImposte += (item.codiceIVA.pcAliquota / 100 * item.totNetto)
        }
      }, 200);
    } else {
      this.totaleImponible = 0;
      this.totaleImposte = 0
      for (let item of control.value) {
        this.totaleImponible += item.totNetto;
        this.totaleImposte = 0
        this.totaleImposte += (item.codiceIVA.pcAliquota / 100 * item.totNetto)
      }
    }
  }

  totLordoChange(val: number, index: number) {
    // TODO: replace it by observables and rxjs debounce
    setTimeout(() => {
      const article = <FormArray>this.salesDocumentForm.controls['articoli'];
      let totalNet = val / (1 + (article.value[index].codiceIVA.pcAliquota / 100));
      let discount = (1 - (totalNet / (article.value[index].quantita * article.value[index].importoUnitario))) * 100;
      article.controls[index].patchValue({ totNetto: totalNet, pcSconto: discount });
    }, 2000);
  }

  calculateRitenutaEnasarco() {
    let yearlyTax = 7.55;
    const control = <FormArray>this.salesDocumentForm.controls['articoli'];
    let sum = 0;
    setTimeout(() => {
      for (let item of control.value) {
        if (item.soggettoRitenuta) {
          sum += (yearlyTax / 100 * item.totNetto)
        }
      }
      this.salesDocumentForm.patchValue({ ritenutaEnasarco: sum })
    }, 200);

  }

  test() {
  }

  editForm() {
    this.setFormValues();
    this.venditeService.putSale(this.salesDocumentForm.value['id'].toString(), this.salesDocumentForm.value).subscribe(
      res => console.log(res),
      error => console.log(error)
    )
  }

  setFormValues() {
    this.salesDocumentForm.patchValue({ totImponibile: this.totaleImponible });
    this.salesDocumentForm.patchValue({ totDocumento: this.totaleImponible + this.totaleImposte + this.salesDocumentForm.value.rivalsa });
    this.salesDocumentForm.patchValue({
      totDaPagare: this.salesDocumentForm.value.totDocumento
      - this.salesDocumentForm.value.ritenutaEnasarco - this.salesDocumentForm.value.ritenutaAcconto + this.salesDocumentForm.value.marcaDaBollo
    });
    const scadenze = <FormArray>this.salesDocumentForm.controls['scadenze'];
    scadenze.controls[0].patchValue({ importo: this.salesDocumentForm.value.totDaPagare - this.salesDocumentForm.value.pagamenti[0].importo });
    scadenze.controls[0].patchValue({ importoDaSaldare: this.salesDocumentForm.value.totDaPagare - this.salesDocumentForm.value.pagamenti[0].importo });
  }
}

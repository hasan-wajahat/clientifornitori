import { Component, OnInit } from '@angular/core';
import { VenditeService } from "../../../services/vendite/vendite.service";
import { Fattura } from "../../../model/vendite/fattura";
import { URLSearchParams } from "@angular/http";
import { User } from "../../../model/user/User";
import { Calendar } from "primeng/primeng";
import {Router} from "@angular/router";
import {CommonService} from "../../../services/common/common.service";

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css'],
  providers: [VenditeService]
})
export class InvoiceListComponent implements OnInit {
  invoices: Fattura[];
  cols: any;
  user: User;
  statusSelect: string = "";
  dateFrom: string = "";
  dateTo: string = "";
  startDate: Date;
  endDate: Date;
  invoiceStart: number;
  invoiceEnd: number;
  paymentSelect: string = "";
  customerSearch: string;

  constructor(private _venditeService: VenditeService, private router: Router) { }

  ngOnInit() {
    this.getInvoiceList();
    this.cols = [
      { field: 'tipoDocumento', header: 'TIPOLGIA', sortable: 'true', style: { 'text-align': 'center' } },
      { field: 'numeroDocumento', header: 'N. FATTURA', sortable: 'true', style: { 'text-align': 'center' } },
      { field: 'dataEmissione', header: 'DATA EMISSIONE', sortable: 'true', style: { 'text-align': 'center' } },
      { field: 'cliFor.intestazioneCognomeNome', header: 'INTESTATARIO', sortable: 'true', style: { 'text-align': 'center' } },
      { field: 'statoDocumento', header: 'STATO', sortable: 'true', style: { 'text-align': 'center' } },
      { field: 'statoPagamento', header: 'PAGAMENTO', sortable: 'true', style: { 'text-align': 'center' } },
      { field: 'totConVariazioni', header: 'TOTALE CON VARIAZIONI', sortable: 'true', style: { 'text-align': 'right' } },
      { field: 'totDocumento', header: 'TOTALE FATTURA', sortable: 'true', style: { 'text-align': 'right' } }
    ];

    this.inizializzaCalendar();

  }

  getInvoiceList() {
    this.user = JSON.parse(sessionStorage.getItem('UserData'));
    let params: URLSearchParams = new URLSearchParams();
    params.set('username', this.user.username);
    params.set('statoDocumento', this.statusSelect);
    if (this.startDate) {
      this.dateFrom = `${this.startDate.getFullYear()}/${this.startDate.getMonth() + 1}/${this.startDate.getDate()}`;
      params.set('dataFrom', this.dateFrom);
    }
    if (this.endDate) {
      this.dateTo = `${this.endDate.getFullYear()}/${this.endDate.getMonth() + 1}/${this.endDate.getDate()}`;
      params.set('dataTo', this.dateTo);
    }
    if (this.invoiceStart) {
      params.set('totFrom', this.invoiceStart.toString());
    }
    if (this.invoiceEnd) {
      params.set('totTo', this.invoiceEnd.toString());
    }
    params.set('statoPagamento', this.paymentSelect);
    params.set('pIVARagioneSociale', this.customerSearch);
    params.set('field', 'DATA_EMISSIONE');
    params.set('type', '1');
    this._venditeService.getAllSales(params).subscribe(
      res => {
        console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
        this.invoices = res.list;
      },
      error => console.log(error)
    )
  }

  search() {
    this.getInvoiceList();
  }

  onRowSelectEvent(selectedRow: any){
    this.router.navigate(['/home/vendite', selectedRow.data.id]);
  }

  /**
   * Inizializzazione lingua calendar
   */
    // Calendar language
  it: any;
  yearRange:string;
  today = new Date();

  inizializzaCalendar(){
    this.it = CommonService.getCalendarLanguage();
    this.yearRange = (new Date().getFullYear() - 100) + ":" + new Date().getFullYear();
  }

}

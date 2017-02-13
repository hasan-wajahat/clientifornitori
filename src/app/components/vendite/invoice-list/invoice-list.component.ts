import { Component, OnInit } from '@angular/core';
import { VenditeService } from "../../../services/vendite/vendite.service";
import { Fattura } from "../../../model/vendite/fattura";
import { URLSearchParams } from "@angular/http";
import { User } from "../../../model/user/User";
import { Calendar } from "primeng/primeng";

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

  constructor(private _venditeService: VenditeService) { }

  ngOnInit() {
    this.getInvoiceList();
    this.cols = [
      { field: 'tipoDocumento', header: 'Tipolgia', sortable: 'true', style: { 'text-align': 'center' } },
      { field: 'numeroDocumento', header: 'N. FATTURA', sortable: 'true', style: { 'text-align': 'center' } },
      { field: 'dataEmissione', header: 'DATA EMISSIONE', sortable: 'true', style: { 'text-align': 'center' } },
      { field: 'cliFor.intestazioneCognomeNome', header: 'INTESTATARIO', sortable: 'true', style: { 'text-align': 'center' } },
      { field: 'statoDocumento', header: 'STATO', sortable: 'true', style: { 'text-align': 'center' } },
      { field: 'statoPagamento', header: 'PAGAMENTO', sortable: 'true', style: { 'text-align': 'center' } },
      { field: 'totConVariazioni', header: 'Totale con variazioni', sortable: 'true', style: { 'text-align': 'right' } },
      { field: 'totDocumento', header: 'Totale fattura', sortable: 'true', style: { 'text-align': 'right' } }
    ];
  }

  getInvoiceList() {
    this.user = JSON.parse(sessionStorage.getItem('UserData'));
    let params: URLSearchParams = new URLSearchParams();
    params.set('username', this.user.username);
    params.set('statoDocumento', this.statusSelect);
    if (this.dateFrom) {
      params.set('dataFrom', this.dateFrom);
    }
    if (this.dateTo) {
      params.set('dataTo', this.dateTo);
    }
    params.set('field', 'DATA_EMISSIONE');
    params.set('type', '1');
    this._venditeService.getAllSales(params).subscribe(
      res => {
        console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
        console.log(res);
        this.invoices = res.list;
      },
      error => console.log(error)
    )
  }

  search() {
    this.dateFrom = `${this.startDate.getFullYear()}/${this.startDate.getMonth() + 1}/${this.startDate.getDate()}`;
    this.dateTo = `${this.endDate.getFullYear()}/${this.endDate.getMonth() + 1}/${this.endDate.getDate()}`;
    this.getInvoiceList();
  }


}

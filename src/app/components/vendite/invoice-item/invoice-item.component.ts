import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from "@angular/router";
import { VenditeService } from "../../../services/vendite/vendite.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SalesDocument } from "../../../model/vendite/salesDocument";
import { SalesFormCreator } from "./invoice-item-form";
import { CommonService } from "../../../services/common/common.service";

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

  constructor(private venditeService: VenditeService, private route: ActivatedRoute,
    private salesFormCreator: SalesFormCreator) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.venditeService.getSale(params['id']).subscribe(
          res => {
            console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
            this.salesDocumentForm = this.salesFormCreator.buildSalesForm(res);
            this.initializeDate(res);
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

  inizializzaCalendar() {
    this.it = CommonService.getCalendarLanguage();
    this.yearRange = (new Date().getFullYear() - 100) + ":" + new Date().getFullYear();
  }

  initializeDate(response) {
    this.issueDate.setDate(+response.dataEmissione.split('-')[2]);
    this.issueDate.setFullYear(+response.dataEmissione.split('-')[0]);
    this.issueDate.setMonth(response.dataEmissione.split('-')[1] - 1);
  }

}

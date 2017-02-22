import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from "@angular/router";
import { VenditeService } from "../../../services/vendite/vendite.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SalesDocument } from "../../../model/vendite/salesDocument";
import {SalesFormCreator} from "./invoice-item-form";

@Component({
  selector: 'app-invoice-item',
  templateUrl: './invoice-item.component.html',
  styleUrls: ['./invoice-item.component.css'],
  providers: [SalesFormCreator]
})
export class InvoiceItemComponent implements OnInit {

  salesDocument: SalesDocument;
  salesDocumentForm: FormGroup;

  constructor(private venditeService: VenditeService, private route: ActivatedRoute,
   private salesFormCreator: SalesFormCreator) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.venditeService.getSale(params['id']).subscribe(
          res => {
            console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
            this.salesDocumentForm = this.salesFormCreator.buildSalesForm(res);
          },
          error => console.log(error)
        )
      }
    )
  }

}

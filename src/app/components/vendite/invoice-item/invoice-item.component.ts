import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from "@angular/router";
import { VenditeService } from "../../../services/vendite/vendite.service";
import { SalesDocument } from "../../../model/vendite/salesDocument";

@Component({
  selector: 'app-invoice-item',
  templateUrl: './invoice-item.component.html',
  styleUrls: ['./invoice-item.component.css']
})
export class InvoiceItemComponent implements OnInit {

  salesDocument: SalesDocument;

  constructor(private venditeService: VenditeService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.venditeService.getSale(params['id']).subscribe(
          res => {
            console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
            this.salesDocument = res;
          },
          error => console.log(error)
        )
      }
    )
  }

}

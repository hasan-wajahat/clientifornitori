import { Component, OnInit } from '@angular/core';
import { VenditeService } from "../../services/vendite/vendite.service";
import { Fattura } from "../../model/vendite/fattura";
import { URLSearchParams } from "@angular/http";

@Component({
  selector: 'app-vendite',
  templateUrl: 'vendite.component.html',
  styleUrls: ['vendite.component.css'],
  providers: [VenditeService]
})
export class VenditeComponent implements OnInit {

  fatture: Fattura[];
  cols: any[];

  constructor(private _venditeService: VenditeService) { }

  ngOnInit() {
    // this._venditeService.getFattureVendite().subscribe(
    //   fatture => this.fatture = fatture,
    //   error => alert(error),
    //   () => console.log("_venditeService.getFattureVendite() - FINISHED!"));

    this.cols = [
      { field: 'numeroFattura', header: 'N. FATTURA', sortable: 'true', style: { 'text-align': 'center' } },
      { field: 'dataEmissione', header: 'DATA EMISSIONE', sortable: 'true', style: { 'text-align': 'center' } },
      { field: 'intestatario', header: 'INTESTATARIO', sortable: 'true', style: { 'text-align': 'center' } },
      { field: 'stato', header: 'STATO', sortable: 'true', style: { 'text-align': 'center' } },
      { field: 'pagamento', header: 'PAGAMENTO', sortable: 'true', style: { 'text-align': 'center' } },
      { field: 'totale', header: 'TOTALE', sortable: 'true', style: { 'text-align': 'right' } }
    ];
  }

  test() {
  
  }
}

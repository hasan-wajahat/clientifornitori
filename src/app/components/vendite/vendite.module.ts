import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {vendetirouting} from "./vendeti.routing";
import {VenditeComponent} from "./vendite.component";
import {InvoiceListComponent} from "./invoice-list/invoice-list.component";
import { InvoiceItemComponent } from "./invoice-item/invoice-item.component";

@NgModule({
  imports: [
    vendetirouting,
    SharedModule
  ],
  declarations: [
    VenditeComponent,
    InvoiceListComponent,
    InvoiceItemComponent
  ]

})
export class VenditeModule { }

import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { vendetirouting } from "./vendeti.routing";
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from "ng2-translate/ng2-translate";
import { Http } from "@angular/http";
import { VenditeComponent } from "./vendite.component";
import { InvoiceListComponent } from "./invoice-list/invoice-list.component";

@NgModule({
  imports: [
    vendetirouting,
    SharedModule
  ],
  declarations: [
    VenditeComponent,
    InvoiceListComponent,
  ]

})
export class VenditeModule { }

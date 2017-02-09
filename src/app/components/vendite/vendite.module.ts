import { NgModule } from "@angular/core";
import { VenditeComponent } from "./vendite.component";
import { SharedModule } from "../../shared/shared.module";
import { vendetirouting } from "./vendeti.routing";
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from "ng2-translate/ng2-translate";
import { Http } from "@angular/http";

@NgModule({
  imports: [
    vendetirouting,
    SharedModule
  ],
  declarations: [
    VenditeComponent,
  ]

})
export class VenditeModule { }

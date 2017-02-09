import {NgModule} from "@angular/core";
import {ClientifornitoriComponent} from "./clientifornitori.component";
import {clientifornitorirouting} from "./clientifornitori.routing";
import {ListaClientifornitoriComponent} from "./lista-clientifornitori/lista-clientifornitori.component";
import {SharedModule} from "../../shared/shared.module";
import {TranslateModule, TranslateLoader, TranslateStaticLoader} from "ng2-translate/ng2-translate";
import {Http} from "@angular/http";
import {ModificaClienteFornitoreComponent} from "./modifica-cliente-fornitore/modifica-cliente-fornitore.component";


@NgModule({
  imports: [
    clientifornitorirouting,
    SharedModule
  ],
  declarations: [
    ClientifornitoriComponent,
    ListaClientifornitoriComponent,
    ModificaClienteFornitoreComponent
  ]

})
export class ClientifornitoriModule { }

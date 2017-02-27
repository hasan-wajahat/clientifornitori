import {NgModule} from "@angular/core";
import {MovimentiComponent} from "./movimenti.component";
import {movimentiRouting} from "./movimenti.routing";
import {ListaMovimentiComponent} from "./lista-movimenti/lista-movimenti.component";
import {SharedModule} from "../../shared/shared.module";
import {TranslateModule, TranslateLoader, TranslateStaticLoader} from "ng2-translate/ng2-translate";
import {Http} from "@angular/http";
import {ModificaMovimentoComponent} from "./modifica-movimento/modifica-movimento.component";
import {DataTableModule} from 'primeng/primeng';

@NgModule({
  imports: [
    movimentiRouting,
    SharedModule,
    DataTableModule
  ],
  declarations: [
    MovimentiComponent,
    ListaMovimentiComponent,
    ModificaMovimentoComponent
  ]

})
export class MovimentiModule { }

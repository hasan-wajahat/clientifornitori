import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule, TranslateLoader, TranslateStaticLoader} from "ng2-translate/ng2-translate";
import {Http, HttpModule, JsonpModule} from "@angular/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  DataTableModule,
  GrowlModule,
  ConfirmDialogModule,
  DialogModule,
  CalendarModule,
  InputSwitchModule,
  InputMaskModule,
  DataListModule,
  ChartModule,
  ProgressBarModule
} from "primeng/primeng";
import {BrowserModule} from "@angular/platform-browser";
import {TitlepageComponent} from "../components/titlepage/titlepage.component";
import {FoCollapsibleBarComponent} from "../components/commons/fo-collapsible-bar/fo-collapsible-bar.component";
import {FoDataTableComponent} from "../components/commons/fo-data-table/fo-data-table.component";
import {LoadingIndicatorComponent} from "../components/commons/loading-indicator/loading-indicator.component";
import {FoSwitchComponent} from "../components/commons/fo-switch/fo-switch.component";
import {MyCurrencyFormatterDirective} from "../directives/my-currency-formatter.directive";
import {MyCurrencyPipe} from "../pipes/my-currency.pipe";
import {FoTableComponent} from "../components/commons/fo-table/fo-table.component";

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    HttpModule,
    JsonpModule,
    GrowlModule,
    ConfirmDialogModule,
    DialogModule,
    CalendarModule,
    InputSwitchModule,
    InputMaskModule,
    DataListModule,
    ChartModule,
    ProgressBarModule,

    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (http:Http) => new TranslateStaticLoader(http, 'assets/resources/i18n', '.json'),
      deps: [Http]
    })

  ],
  declarations: [
    TitlepageComponent,
    FoCollapsibleBarComponent,
    FoDataTableComponent,
    FoTableComponent,
    LoadingIndicatorComponent,
    FoSwitchComponent,
    MyCurrencyFormatterDirective,
    MyCurrencyPipe
  ],
  exports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    GrowlModule,
    DialogModule,
    CalendarModule,
    TitlepageComponent,
    FoCollapsibleBarComponent,
    FoDataTableComponent,
    LoadingIndicatorComponent,
    InputSwitchModule,
    FoSwitchComponent,
    TranslateModule,
    InputMaskModule,
    DataTableModule,
    DataListModule,
    ChartModule,
    ProgressBarModule,
    MyCurrencyFormatterDirective,
    MyCurrencyPipe,
    FoTableComponent,
  ],
  providers: [
    MyCurrencyPipe
  ]


})
export class SharedModule { }

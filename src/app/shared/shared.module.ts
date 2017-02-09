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
  InputSwitchModule, InputMaskModule, CheckboxModule, DataListModule, ChartModule, ProgressBarModule
} from "primeng/primeng";
import {BrowserModule} from "@angular/platform-browser";
import {TitlepageComponent} from "../components/titlepage/titlepage.component";
import {FoCollapsibleBarComponent} from "../components/commons/fo-collapsible-bar/fo-collapsible-bar.component";
import {FoDataTableComponent} from "../components/commons/fo-data-table/fo-data-table.component";
import {LoadingIndicatorComponent} from "../components/commons/loading-indicator/loading-indicator.component";
import {FoSwitchComponent} from "../components/commons/fo-switch/fo-switch.component";

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
    CheckboxModule,
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
    LoadingIndicatorComponent,
    FoSwitchComponent
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
    CheckboxModule,
    DataTableModule,
    DataListModule,
    ChartModule,
    ProgressBarModule
  ]


})
export class SharedModule { }

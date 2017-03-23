import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {routing, appRoutingProviders} from "./app.routing";
import {ConfirmationService} from "primeng/primeng";
import {RestCommonUtilsService} from "./utils/rest-common-utils.service";
import {UserService} from "./services/authentication/user.service";
import {LoggedInGuard} from "./services/authentication/logged-in.guard";
import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./components/home/home.component";
// import {DashboardComponent} from "./components/dashboard/dashboard.component";
// import {AcquistiComponent} from "./components/acquisti/acquisti.component";
// import {VenditeComponent} from "./components/vendite/vendite.component";
// import {ContiComponent} from "./components/conti/conti.component";
// import {F24Component} from "./components/f24/f24.component";
// import {CostidipendentiComponent} from "./components/costidipendenti/costidipendenti.component";
// import {ProfilepageComponent} from "./components/profilepage/profilepage.component";
import {SidebarmenuComponent} from "./components/sidebarmenu/sidebarmenu.component";
import {HeaderComponent} from "./components/header/header.component";
import {FooterComponent} from "./components/footer/footer.component";
import {ChatformComponent} from "./components/chatform/chatform.component";
import {CommonService} from "./services/common/common.service";
import {GlobalUtilsComponent} from "./components/commons/global-utils/global-utils.component";
import {ClientifornitoriModule} from "./components/clientifornitori/clientifornitori.module";
import {SharedModule} from "./shared/shared.module";
import {VenditeModule} from "./components/vendite/vendite.module";
// import {RegistrazioneUtenteComponent} from "./components/registrazione-utente/registrazione-utente.component";
// import {RegistrazioneSuccessComponent} from "./components/registrazione-utente/registrazione-success/registrazione-success.component";
// import {RegistrazioneFailedComponent} from "./components/registrazione-utente/registrazione-failed/registrazione-failed.component";
// import {RegistrazioneComponent} from "./components/registrazione-utente/registrazione/registrazione.component";
// import {CorrispettiviModule} from "./components/corrispettivi/corrispettivi.module";
// import {ScadenziarioModule} from "./components/scadenziario/scadenziario.module";

/**
 * #######   FOR EXTERNAL DEVELOPERS   #######
 * README:
 * Uncomment rows relative to your component
 */

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarmenuComponent,
    //DashboardComponent,
    FooterComponent,
    ChatformComponent,
    // AcquistiComponent,
    // VenditeComponent,
    // ContiComponent,
    // F24Component,
    // CostidipendentiComponent,
    // ProfilepageComponent,
    LoginComponent,
    // RegistrazioneUtenteComponent,
    // RegistrazioneComponent,
    HomeComponent,
    GlobalUtilsComponent
    // RegistrazioneSuccessComponent,
    // RegistrazioneFailedComponent
  ],
  imports: [
    routing,
    ClientifornitoriModule,
    // CorrispettiviModule,
    // ScadenziarioModule,
    VenditeModule,
    SharedModule
  ],
  providers: [appRoutingProviders, RestCommonUtilsService, UserService, LoggedInGuard, ConfirmationService, CommonService],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

}

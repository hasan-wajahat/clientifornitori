/**
 * Created by Rocco on 26/08/2016.
 */


import { Routes, RouterModule } from '@angular/router';
// import {AcquistiComponent} from "./components/acquisti/acquisti.component";
// import {DashboardComponent} from "./components/dashboard/dashboard.component";
// import {ClientifornitoriComponent} from "./components/clientifornitori/clientifornitori.component";
// import {VenditeComponent} from "./components/vendite/vendite.component";
// import {CorrispettiviComponent} from "./components/corrispettivi/corrispettivi.component";
// import {ContiComponent} from "./components/conti/conti.component";
// import {F24Component} from "./components/f24/f24.component";
// import {CostidipendentiComponent} from "./components/costidipendenti/costidipendenti.component";
// import {ScadenziarioComponent} from "./components/scadenziario/scadenziario.component";
// import {ProfilepageComponent} from "./components/profilepage/profilepage.component";
import {LoggedInGuard} from "./services/authentication/logged-in.guard";
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
// import {RegistrazioneUtenteComponent} from "./components/registrazione-utente/registrazione-utente.component";
// import {RegistrazioneSuccessComponent} from "./components/registrazione-utente/registrazione-success/registrazione-success.component";
// import {RegistrazioneFailedComponent} from "./components/registrazione-utente/registrazione-failed/registrazione-failed.component";
// import {RegistrazioneComponent} from "./components/registrazione-utente/registrazione/registrazione.component";


const appRoutes: Routes = [

  {
    path: '*',
    redirectTo: '/login'
  },



  // Default example page. To do remove.
  {
    path: '',
    redirectTo: '/home/clientifornitori/lista-clientifornitori',
    pathMatch: 'full'
  },
  // -----------------------------------------------------------

  
  // {
  //   path: '',
  //   redirectTo: '/home/dashboard',
  //   pathMatch: 'full'
  // },
  // { path: 'home', component: HomeComponent, canActivate: [LoggedInGuard],
  //   children: [
  //     // routing left menu
  //     {
  //       path: '',
  //       redirectTo: '/home/dashboard',
  //       pathMatch: 'full'
  //     },
  //     { path: 'dashboard', component: DashboardComponent, canActivate: [LoggedInGuard] },
  //     { path: 'acquisti', component: AcquistiComponent, canActivate: [LoggedInGuard] },
  //     { path: 'vendite', component: VenditeComponent, canActivate: [LoggedInGuard] },
  //     { path: 'corrispettivi', component: CorrispettiviComponent, canActivate: [LoggedInGuard] },
  //     { path: 'conti', component: ContiComponent, canActivate: [LoggedInGuard] },
  //     { path: 'f24', component: F24Component, canActivate: [LoggedInGuard] },
  //     { path: 'costidipendenti', component: CostidipendentiComponent, canActivate: [LoggedInGuard] },
  //     // routing menu utente
  //     {  path: 'profiloutente', component: ProfilepageComponent, canActivate: [LoggedInGuard] },
  //   ]
  // },
  { path: 'login', component: LoginComponent},
  // { path: 'registrazione-utente', component: RegistrazioneUtenteComponent },
  // { path: 'registrazione-success', component: RegistrazioneSuccessComponent},
  // { path: 'registrazione-failed', component: RegistrazioneFailedComponent}
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });

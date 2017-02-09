/**
 * Created by Rocco on 26/08/2016.
 */

import {Routes, RouterModule} from "@angular/router";
import {LoggedInGuard} from "../../services/authentication/logged-in.guard";
import {ListaClientifornitoriComponent} from "./lista-clientifornitori/lista-clientifornitori.component";
import {ClientifornitoriComponent} from "./clientifornitori.component";
import {HomeComponent} from "../home/home.component";
import {ModificaClienteFornitoreComponent} from "./modifica-cliente-fornitore/modifica-cliente-fornitore.component";


const clientiFornitoriRoutes: Routes = [

  { path: 'home',
    component: HomeComponent,
    canActivate: [LoggedInGuard],
    children: [
      { path: 'clientifornitori',
        component: ClientifornitoriComponent,
        canActivate: [LoggedInGuard],
        children: [
          {
            path: '',
            component: ListaClientifornitoriComponent,
            canActivate: [LoggedInGuard]
          },
          {
            path: 'lista-clientifornitori',
            component: ListaClientifornitoriComponent,
            canActivate: [LoggedInGuard]
          },
          {
            path: 'modifica-cliente-fornitore',
            component: ModificaClienteFornitoreComponent,
            canActivate: [LoggedInGuard]
          },
          {
            path: 'modifica-cliente-fornitore/:id',
            component: ModificaClienteFornitoreComponent,
            canActivate: [LoggedInGuard]
          }
        ]
      }
    ]
  }

];

export const clientifornitorirouting = RouterModule.forChild(clientiFornitoriRoutes);

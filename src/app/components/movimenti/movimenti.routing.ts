import {Routes, RouterModule} from "@angular/router";
import {LoggedInGuard} from "../../services/authentication/logged-in.guard";
import {ListaMovimentiComponent} from "./lista-movimenti/lista-movimenti.component";
import {ModificaMovimentoComponent} from "./modifica-movimento/modifica-movimento.component";
import {MovimentiComponent} from "./movimenti.component";
import {HomeComponent} from "../home/home.component";

export const movimentiRoutes: Routes = [
  { path: 'home',
    component: HomeComponent,
    canActivate: [LoggedInGuard],
    children: [
      { path: 'movimenti',
        component: MovimentiComponent,
        canActivate: [LoggedInGuard],
        children: [
          {
            path: 'lista-movimenti/:contoId',
            component: ListaMovimentiComponent,
            canActivate: [LoggedInGuard]
          },
          {
            path: 'modifica-movimento/:contoId',
            component: ModificaMovimentoComponent,
            canActivate: [LoggedInGuard]
          },
          {
            path: 'modifica-movimento/:contoId/:id',
            component: ModificaMovimentoComponent,
            canActivate: [LoggedInGuard]
          }
        ]
      }
    ]
  }

];

export const movimentiRouting = RouterModule.forChild(movimentiRoutes);

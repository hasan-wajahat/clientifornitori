import { Routes, RouterModule } from "@angular/router";
import { LoggedInGuard } from "../../services/authentication/logged-in.guard";
import { HomeComponent } from "../home/home.component";
import { VenditeComponent } from "./vendite.component";
import { InvoiceListComponent } from "./invoice-list/invoice-list.component";
import { InvoiceItemComponent } from "./invoice-item/invoice-item.component";


const vendetiRoutes: Routes = [

  {
    path: 'home',
    component: HomeComponent,
    canActivate: [LoggedInGuard],
    children: [
      {
        path: 'vendite',
        component: VenditeComponent,
        canActivate: [LoggedInGuard],
        children: [
          {
            path: '',
            component: InvoiceListComponent,
            canActivate: [LoggedInGuard]
          },
          {
            path: 'list-item',
            component: InvoiceListComponent,
            canActivate: [LoggedInGuard]
          },
          {
            path: ':id',
            component: InvoiceItemComponent,
            canActivate: [LoggedInGuard]
          }
        ]
      }
    ]
  }

];

export const vendetirouting = RouterModule.forChild(vendetiRoutes);

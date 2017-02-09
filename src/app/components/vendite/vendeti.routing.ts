import { Routes, RouterModule } from "@angular/router";
import { LoggedInGuard } from "../../services/authentication/logged-in.guard";
import { HomeComponent } from "../home/home.component";
import { VenditeComponent } from "./vendite.component";


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
      }
    ]
  }

];

export const vendetirouting = RouterModule.forChild(vendetiRoutes);

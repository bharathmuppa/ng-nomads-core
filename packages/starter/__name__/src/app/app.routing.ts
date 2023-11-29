import {Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard/dashboard.component";

const DEFAULT_ROUTE = 'dashboard';

export const APP_ROUTES: Routes = [
  {
    path: DEFAULT_ROUTE,
    component: DashboardComponent
  },
  {path: '', redirectTo: DEFAULT_ROUTE, pathMatch: 'full'},
  {path: '**', redirectTo: DEFAULT_ROUTE}
];


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsComponent } from './component/cards/cards.component';
import { LandingPageComponent } from './component/landing-page/landing-page.component';

import { LoginComponent } from './component/login/login.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { NoAutorizadoComponent } from './component/no-autorizado/no-autorizado.component';
import { VentaTableComponent } from './component/venta-table/venta-table.component';
import { GuardsGuard } from './guards.guard';

const routes: Routes = [
  {
    path: 'landing',
    component: LandingPageComponent,
    canActivate: [GuardsGuard],
  },
  { path: 'menu', component: CardsComponent, canActivate: [GuardsGuard] },
  { path: '', component: LoginComponent },
  { path: 'no-autorizado', component: NoAutorizadoComponent },
  {
    path: 'carrito',
    component: VentaTableComponent,
    canActivate: [GuardsGuard],
  },
  { path: 'navbar', component: NavbarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

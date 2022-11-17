import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaPlanesComponent } from './planes/lista-planes/lista-planes.component';
import { ListaClientesComponent } from './clientes/lista-clientes/lista-clientes.component';
import { EditarClientesComponent } from './clientes/editar-clientes/editar-clientes.component';
import { EditarPlanesComponent } from './planes/editar-planes/editar-planes.component';
import { LoginComponent } from './login/login.component';
import { AltaClientesComponent } from './clientes/alta-clientes/alta-clientes.component';
import { AltaPlanesComponent } from './planes/alta-planes/alta-planes.component';
import { AuthGuard } from './guards/auth.guard';

import { TortaComponent } from './graficos/torta/torta.component';
import { ListaPrestamosComponent } from './prestamos/lista-prestamos/lista-prestamos.component';
import { AltaPrestamosComponent } from './prestamos/alta-prestamos/alta-prestamos.component';
import { CuotasComponent } from './cuotas/cuotas.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'nuevoCliente',
    component: AltaClientesComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  {
    path: 'nuevoPlan',
    component: AltaPlanesComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  {
    path: 'nuevoPrestamo',
    component: AltaPrestamosComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  {
    path: 'listaPlanes',
    component: ListaPlanesComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  {
    path: 'listaClientes',
    component: ListaClientesComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  {
    path: 'listaPrestamos',
    component: ListaPrestamosComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  {
    path: 'editarClientes/:id',
    component: EditarClientesComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  {
    path: 'editarPlanes/:id',
    component: EditarPlanesComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  {
    path: 'graficos',
    component: TortaComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  {
    path: 'cuotas',
    component: CuotasComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

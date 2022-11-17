import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AltaClientesComponent } from './clientes/alta-clientes/alta-clientes.component';
import { EditarClientesComponent } from './clientes/editar-clientes/editar-clientes.component';
import { ListaClientesComponent } from './clientes/lista-clientes/lista-clientes.component';
import { AltaPlanesComponent } from './planes/alta-planes/alta-planes.component';
import { EditarPlanesComponent } from './planes/editar-planes/editar-planes.component';
import { ListaPlanesComponent } from './planes/lista-planes/lista-planes.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatCardModule } from '@angular/material/card';
import { FilterPipe } from './pipes/filter.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './estructura/navbar/navbar.component';
import { NgChartsModule } from 'ng2-charts';
import { DatePipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { AuthInterceptor } from './services/auth.interceptor';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { BooleanATextoPipe } from './pipes/boolean-a-texto.pipe';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FooterComponent } from './estructura/footer/footer.component';
import { ListaPrestamosComponent } from './prestamos/lista-prestamos/lista-prestamos.component';
import { AltaPrestamosComponent } from './prestamos/alta-prestamos/alta-prestamos.component';
import { TortaComponent } from './graficos/torta/torta.component';
import { BarraComponent } from './graficos/barra/barra.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSliderModule} from '@angular/material/slider';
import {MatChipsModule} from '@angular/material/chips';
import {MatSortModule} from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatExpansionModule} from '@angular/material/expansion';


import 'sweetalert2/src/sweetalert2.scss';



import Swal from 'sweetalert2';
import { CuotasComponent} from './cuotas/cuotas.component';
import { CuotasDialog } from "./cuotas/CuotasDialog.1";
import { DetallesPlanesComponent } from './planes/detalles-planes/detalles-planes.component';

import { DetallesPrestamosComponent } from './prestamos/detalles-prestamos/detalles-prestamos/detalles-prestamos.component';
import { KpiTopClientesComponent } from './graficos/kpi-top-clientes/kpi-top-clientes.component';
import { KpiCapitalComponent } from './graficos/kpi-capital/kpi-capital.component';
import { KpiTopPrestamosComponent } from './graficos/kpi-top-prestamos/kpi-top-prestamos.component';
import { DetallesClienteComponent } from './clientes/detalles-cliente/detalles-cliente.component';
import { StopPropagationDirective } from './directives/stop-propagation.directive';


@NgModule({
  declarations: [
    AppComponent,
    AltaClientesComponent,
    EditarClientesComponent,
    ListaClientesComponent,
    AltaPlanesComponent,
    EditarPlanesComponent,
    ListaPlanesComponent,
    LoginComponent,
    FilterPipe,
    NavbarComponent,

    BooleanATextoPipe,
    FooterComponent,
    ListaPrestamosComponent,
    AltaPrestamosComponent,

    TortaComponent,
    BarraComponent,
    CuotasComponent,
    CuotasDialog,
    DetallesPrestamosComponent,
    KpiTopClientesComponent,
    KpiCapitalComponent,
    KpiTopPrestamosComponent,
    DetallesPlanesComponent,
    DetallesClienteComponent,
    StopPropagationDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatCardModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatSliderModule,
    MatChipsModule,
    MatSortModule,
    MatDialogModule,

    MatProgressSpinnerModule,
    MatExpansionModule,


    NgChartsModule,
    SweetAlert2Module.forRoot(),
    SweetAlert2Module,

    //CommonModule,

    //ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

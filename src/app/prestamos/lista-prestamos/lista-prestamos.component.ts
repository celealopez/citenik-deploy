import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PrestamosService } from 'src/app/services/prestamos.service';
import {
  Prestamo,
  PrestamoConsultaDTO,
  PrestamoDetallesDTO,
  PrestamoFiltroDTO,
} from '../../model/prestamo';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { HttpParams } from '@angular/common/http';
import { query } from '@angular/animations';
import { DatePipe } from '@angular/common';
import { QueryParam } from '../../model/queryParam';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DetallesPrestamosComponent } from '../detalles-prestamos/detalles-prestamos/detalles-prestamos.component';
import { Cliente } from '../../model/cliente';

@Component({
  selector: 'app-lista-prestamos',
  templateUrl: './lista-prestamos.component.html',
  styleUrls: ['./lista-prestamos.component.css'],
})
export class ListaPrestamosComponent implements OnInit {
  public listaPrestamos: PrestamoConsultaDTO[];
  todosplanes: any;
  planElegido: any;
  private subs: Subscription;
  public page!: number;
  prestamo: Prestamo;
  fechaMinima: Date | null;
  fechaMaxima: Date | null;
  listaQueryParams: QueryParam[];
  filtrosArray: PrestamoFiltroDTO;

  events: string[] = [];
  opened: boolean;

  queryParams = new HttpParams();

  filterPost: any = '';
  ELEMENT_DATA!: PrestamoConsultaDTO[];
  displayedColumns: string[] = [
    'clienteId',
    'planId',
    'capital',
    'fechaOtorgamiento',
    'cuotasTotales',
    'cuotasPagas',
    'cuotasVencidasImpagas',
    'estado',
    'acciones',
  ];
  dataSource = new MatTableDataSource<PrestamoConsultaDTO>(this.ELEMENT_DATA);

  constructor(
    public prestamosService: PrestamosService,
    public router: Router,
    private pd: DatePipe,
    private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog
  ) {
    this.subs = new Subscription();
    this.listaPrestamos = [];
    this.filtrosArray = new PrestamoFiltroDTO();

    // this.fechaMinima = new Date();
    // this.fechaMaxima = new Date();
  }

  ngOnInit(): void {
    this.obtenerPrestamos();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  obtenerPrestamos() {
    this.obtenerParams();
    let resp = this.prestamosService.getPrestamos(this.queryParams);
    resp.subscribe((report) => (this.dataSource.data = report));
  }

  aprobarPrestamo(prestamo: Prestamo, event: Event) {
    Swal.fire({
      title: '¿Estás seguro de aprobar este prestamo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.subs.add(
          this.prestamosService.modificarPrestamo(prestamo).subscribe({
            next: () => {
              setTimeout(() => {
                let resp = this.prestamosService.getPrestamos(this.queryParams);
                resp.subscribe((report) => (this.dataSource.data = report));
              }, 3);
              Swal.fire({
                icon: 'success',
                title: 'Prestamo aprobado',
              });
            },
            error: (err) => {
              console.log(err.status);
            },
          })
        );
      }
    });
  }

  obtenerParams() {
    const arrayPropiedades = Object.entries(this.filtrosArray);
    arrayPropiedades.forEach(([key, value]) => {
      if (key == 'FechaOtorgamientoMinima') {

        this.filtrosArray.FechaOtorgamientoMinima = this.pd.transform(
          this.fechaMinima,
          'yyyy-MM-dd'
        )!;
        value = this.filtrosArray.FechaOtorgamientoMinima;

      } else if (key == 'FechaOtorgamientoMaxima') {
        this.filtrosArray.FechaOtorgamientoMaxima = this.pd.transform(
          this.fechaMaxima,
          'yyyy-MM-dd'
        )!;
        value = this.filtrosArray.FechaOtorgamientoMaxima;
      }
      value &&
        (this.queryParams = this.queryParams.delete(key).append(key, value));
    });
    this.listaQueryParams = this.getlistaQueryParams();
  }

  getlistaQueryParams() {
    const arrayPropiedades = Object.entries(this.filtrosArray);
    let arrayQueryParams: QueryParam[] = [];
    arrayPropiedades.forEach(([key, value]) => {
      let queryParam = this.queryParams.get(key);
      if (queryParam) {
        let nuevoQueryParam: QueryParam = {
          llave: key,
          valor: value,
        };
        arrayQueryParams.push(nuevoQueryParam);
      }
    });
    return arrayQueryParams;
  }

  removerQueryParam(queryParam: QueryParam): void {
    const index = this.listaQueryParams.indexOf(queryParam);

    if (index >= 0) {
      this.listaQueryParams.splice(index, 1);
      let queryARemover = queryParam.llave!;
      this.queryParams = this.queryParams.delete(queryARemover);
    }

    switch (queryParam.llave) {
      case 'Estado':
        this.filtrosArray.Estado = 'vigente';
        break;
      case 'FechaOtorgamientoMinima':
        this.filtrosArray.FechaOtorgamientoMinima = undefined;
        this.fechaMinima = null;
        break;
      case 'FechaOtorgamientoMaxima':
        this.filtrosArray.FechaOtorgamientoMaxima = undefined;
        this.fechaMaxima = null;
        break;
      case 'CapitalMaximo':
        this.filtrosArray.CapitalMaximo = undefined;
        break;
      case 'CapitalMinimo':
        this.filtrosArray.CapitalMinimo = undefined;
        break;
      case 'CuotasTotalesMinimas':
        this.filtrosArray.CuotasTotalesMinimas = undefined;
        break;
      case 'CuotasTotalesMaximas':
        this.filtrosArray.CuotasTotalesMaximas = undefined;
        break;
      case 'CuotasPagasMinimas':
        this.filtrosArray.CuotasPagasMinimas = undefined;
        break;
      case 'CuotasPagasMaximas':
        this.filtrosArray.CuotasPagasMaximas = undefined;
        break;
      case 'CuotasVencidasImpagasMinimas':
        this.filtrosArray.CuotasVencidasImpagasMinimas = undefined;
        break;
      case 'CuotasVencidasImpagasMaximas':
        this.filtrosArray.CuotasVencidasImpagasMaximas = undefined;
        break;
    }
    this.obtenerPrestamos();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  mostrarDetallesPrestamo(row: PrestamoConsultaDTO){
    const data = row.id
    const dialogRef = this.dialog.open(DetallesPrestamosComponent, {
      width: '600px',
      data,
    });
  }
}

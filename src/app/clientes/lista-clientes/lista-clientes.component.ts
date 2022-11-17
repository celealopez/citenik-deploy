import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClienteService } from '../../services/cliente.service';
import { Router } from '@angular/router';
import { Cliente } from '../../model/cliente';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import {
  Prestamo,
  PrestamoConsultaDTO,
  PrestamoDetallesDTO,
  PrestamoFiltroDTO,
} from '../../model/prestamo';
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
import { DetallesClienteComponent } from './../detalles-cliente/detalles-cliente.component';


import { ClienteConsultaIndividual } from '../../model/cliente';


@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css'],
})
export class ListaClientesComponent implements OnInit, AfterViewInit {
  todas: any;
  personaEncontrada: any;

  private subs: Subscription;

  public page!: number;
  filterPost: any = '';
  ELEMENT_DATA!: Cliente[];
  displayedColumns: string[] = [
    'nombre',
    'cuit',
    'fechaNacimiento',
    'activo',
    'acciones2',
    'acciones',
  ];
  dataSource = new MatTableDataSource<Cliente>(this.ELEMENT_DATA);

  constructor(
    public clienteService: ClienteService,
    public router: Router,
    private pd: DatePipe,
    private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog
  ) {
    this.subs = new Subscription();


    // this.fechaMinima = new Date();
    // this.fechaMaxima = new Date();
  }

  ngOnInit(): void {
    let resp = this.clienteService.getClientes();
    resp.subscribe((report) => (this.dataSource.data = report));
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  borrarPersona(cliente: string) {
    Swal.fire({
      title: '¿Estás seguro de colocar al cliente como inactivo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
    }).then(
      (result) => {
        if (result.isConfirmed) {
          this.subs.add(
            this.clienteService.eliminarCliente(cliente).subscribe({
              next: () => {
                setTimeout(() => {
                  let resp = this.clienteService.getClientes();
                  resp.subscribe((report) => (this.dataSource.data = report));
                }, 50);
              },
              error: (err) => {
                console.log(err.status);
              },
            })
          );
        }
      }

      //if (confirm('esta seguro de borrar')) {

      //  this.subs.add(
      //    this.clienteService.eliminarCliente(cliente).subscribe({
      //      next: (result) => {
      //      setTimeout(() => {
      //        let resp = this.clienteService.getClientes();
      //        resp.subscribe(report=>this.dataSource.data=report)
      //      }, 50);

      //      },
      //      error: (err) => {
      //        console.log(err.status);
      //      },
      //    })
      //  );
      //}
    );
  }

  editar(id: string) {
    this.router.navigate([`editarClientes/${id}`]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  //aca tenia el otro
  mostrarDetallesCliente(row: ClienteConsultaIndividual){
    const data = row.id
    const dialogRef = this.dialog.open(DetallesClienteComponent, {
      width: '600px',
      data,
    });}
}

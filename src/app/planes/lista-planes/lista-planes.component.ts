import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Plan } from '../../model/plan';
import { PlanService } from '../../services/plan.service';
import { MatTableDataSource } from '@angular/material/table';

import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { DetallesPlanesComponent } from '../detalles-planes/detalles-planes.component';

@Component({
  selector: 'app-lista-planes',
  templateUrl: './lista-planes.component.html',
  styleUrls: ['./lista-planes.component.css'],
})
export class ListaPlanesComponent implements OnInit, OnDestroy {
  public listaPlanes: Plan[];
  todosplanes: any;
  planElegido: any;
  private subs: Subscription;
  public page!: number;

  filterPost: any = '';
  ELEMENT_DATA!: Plan[];
  displayedColumns: string[] = [
    'nombre',
    'tna',
    'duracionMinimaCuotas',
    'duracionMaximaCuotas',
    'montoMinimo',
    'montoMaximo',
    'vigencia',
    'costoAdministrativo',
    'acciones',
    'acciones2',
  ];
  dataSource = new MatTableDataSource<Plan>(this.ELEMENT_DATA);

  constructor(public planService: PlanService, public router: Router,
    public dialog: MatDialog) {
    this.subs = new Subscription();
    this.listaPlanes = [];
  }

  ngOnInit(): void {
    let resp = this.planService.getPlanes();
    resp.subscribe((report) => (this.dataSource.data = report));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  borrarPlan(plan: string) {
    Swal.fire({
      title: '¿Estás seguro de desactivar este plan?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.subs.add(
          this.planService.eliminarPlan(plan).subscribe({
            next: () => {
              setTimeout(() => {
                let resp = this.planService.getPlanes();
                resp.subscribe((report) => (this.dataSource.data = report));
              }, 50);
            },
            error: (err) => {
              console.log(err.status);
            },
          })
        );
      }
    });
  }

  // borrarPlan(plan: string) {
  //   if (confirm('esta seguro de borrar el plan')) {
  //     this.subs.add(
  //       this.planService.eliminarPlan(plan).subscribe({
  //         next: (result) => {
  //           alert('plan deshabilitado');
  //           setTimeout(() => {
  //             let resp = this.planService.getPlanes();
  //             resp.subscribe(report=>this.dataSource.data=report)
  //           }, 50);
  //         },
  //         error: (err) => {
  //           console.log(err.status);
  //         },
  //       })
  //     );
  //   }
  // }

  editar(id: string) {
    this.router.navigate([`editarPlanes/${id}`]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  mostrarDetallesPlan(row: Plan){
    const data = row.id
    const dialogRef = this.dialog.open(DetallesPlanesComponent, {
      width: '600px',
      data,
    });
  }
}

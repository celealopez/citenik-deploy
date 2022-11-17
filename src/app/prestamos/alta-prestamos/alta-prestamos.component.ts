import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { filter, Subscription } from 'rxjs';
import { PrestamosService } from '../../services/prestamos.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';

import { Prestamo } from 'src/app/model/prestamo';
import { PrestamoCreacionDTO } from '../../model/prestamo';
import { Router } from '@angular/router';
import { Cliente } from '../../model/cliente';
import { ClienteService } from '../../services/cliente.service';

import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alta-prestamos',
  templateUrl: './alta-prestamos.component.html',
  styleUrls: ['./alta-prestamos.component.css'],
})
export class AltaPrestamosComponent implements OnInit {
  formPrestamo = new FormGroup({
    planId: new FormControl<number | null>(null, [Validators.required]),
    clienteId: new FormControl<number | null>(null, [Validators.required]),
    capital: new FormControl<number | null>(null, [Validators.required]),
    cuotasTotales: new FormControl<number | null>(null, [Validators.required]),
    fechaOtorgamiento: new FormControl('', [Validators.required]),
    fechaDeVencimiento: new FormControl<10 | 15 | 20 | null>(null, [
      Validators.required,
    ]),
  });
  private subs: Subscription;
  @Output() onAgregar = new EventEmitter<Prestamo>();

  clientes: Cliente[] = [];
  clientesFiltrados = this.clientes;

  constructor(
    private prestamosService: PrestamosService,
    private router: Router,
    private clienteService: ClienteService
  ) {
    this.subs = new Subscription();
  }

  ngOnInit(): void {
    this.clienteService
      .getClientes()
      .subscribe((data) => (this.clientes = data));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  agregarPrestamo(formData: any, formDirective: FormGroupDirective) {
    const data = this.formPrestamo.getRawValue();
    const prestamo: PrestamoCreacionDTO = {
      planId: data.planId,
      clienteId: data.clienteId,
      capital: data.capital,
      cuotasTotales: data.cuotasTotales,
      fechaOtorgamiento: new Date(data.fechaOtorgamiento!),
      fechaDeVencimiento:
        data.fechaDeVencimiento == 10 ||
        data.fechaDeVencimiento == 15 ||
        data.fechaDeVencimiento == 20
          ? data.fechaDeVencimiento
          : null,
    };
    if (prestamo.planId == 1) {
      if (prestamo.capital! < 50000 || this.prestamo.capital! > 100000000) {
        Swal.fire({
          icon: 'error',
          title:
            'Los montos deben coincidir con los mínimos y máximos del plan',
        });
        return;
      }
      if (prestamo.cuotasTotales! < 12 || this.prestamo.cuotasTotales! > 72) {
        Swal.fire({
          icon: 'error',
          title:
            'Las cuotas deben coincidir con las cantidad mínima y máxima indicada',
        });
        return;
      }
    }
    if (prestamo.planId == 2) {
      if (prestamo.capital! < 1000 || this.prestamo.capital! > 30000) {
        Swal.fire({
          icon: 'error',
          title:
            'Los montos deben coincidir con los mínimos y máximos del plan',
        });
        return;
      }
    }

    this.subs.add(
      this.prestamosService.nuevoPrestamo(prestamo).subscribe({
        next: (result) => {
          Swal.fire({
            title: 'Carga Exitosa',
            icon: 'success',
            showDenyButton: true,
            confirmButtonText: 'Cargar otro préstamo',
            denyButtonText: `Volver a lista de préstamos`,
          }).then((result) => {
            if (result.isDenied) {
              this.router.navigate(['/listaPrestamos']);
            }
          });
        },
        error: (err) => {
          if (err.status == 404) {
            Swal.fire({
              icon: 'error',
              title: 'Cliente inexistente',
            });
            return;
          }

          Swal.fire({
            icon: 'error',
            title: 'Error al cargar préstamo',
          });
        },
      })
    );

    this.formPrestamo.reset({});
    formDirective.resetForm();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.clientesFiltrados = [];
    this.clientes.forEach((cliente) => {
      if (
        cliente.nombre.toLowerCase().includes(filterValue) ||
        cliente.cuit.includes(filterValue) ||
        cliente.id.toString().includes(filterValue)
      ) {
        this.clientesFiltrados.push(cliente);
      }
    });
  }

  setCuotasTotales() {
    if (this.prestamo.planId == 2) {
      this.formPrestamo.patchValue({ cuotasTotales: 6 });
      this.formPrestamo.get(['cuotasTotales'])?.disable();
    }
  }

  get prestamo() {
    return this.formPrestamo.value;
  }
}

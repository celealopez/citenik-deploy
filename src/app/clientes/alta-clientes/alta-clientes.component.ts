import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ClienteCreacionDTO } from '../../model/cliente';
import { ClienteService } from '../../services/cliente.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { DatePipe } from '@angular/common';

import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alta-clientes',
  templateUrl: './alta-clientes.component.html',
  styleUrls: ['./alta-clientes.component.css'],
})
export class AltaClientesComponent implements OnInit {
  formCliente = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.pattern("^[A-Z]{1}[a-z]{1,10}[ ][A-Z]{1}[a-z]{1,10}$")]),
    fechaNacimiento: new FormControl('', [Validators.required]),
    cuit: new FormControl('', [Validators.required, this.validadorCuit()]),
  });
  private subs: Subscription;

  fechaMinima: Date;
  fechaStrMinima: string;

  @Output() onAgregar = new EventEmitter<ClienteCreacionDTO>();
  constructor(
    public clienteService: ClienteService,
    public router: Router,
    private pd: DatePipe
  ) {
    this.subs = new Subscription();
    this.fechaMinima = new Date();
    this.fechaStrMinima = '';
  }

  ngOnInit(): void {
    this.fechaMinima = new Date(
      new Date().getFullYear() - 18,
      new Date().getMonth(),
      new Date().getDate()
    );
    console.log(this.fechaMinima);
    this.fechaStrMinima = this.pd.transform(this.fechaMinima, 'yyyy-MM-dd')!;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  //validar edad
  calculaEdad(value: Date) {
    let val = new Date(value).getFullYear();
    let hoy = new Date().getFullYear();
    let edad = hoy - val;
    return edad;
  }

  //validar cuit or cuil
  validadorCuit() {
    return (c: FormControl) => {
      const cuit = c.value || '';
      return this.isValidCUITCUIL(cuit)
        ? null
        : {
            validateCuil: {
              valid: false,
            },
          };
    };
  }

  isValidCUITCUIL(cuit: string) {
    if (cuit.length != 13) return false;

    let rv;
    let resultado = 0;
    let cuit_nro = cuit.replace('-', '');
    const codes = '6789456789';
    let verificador = parseInt(cuit_nro[cuit_nro.length - 1]);
    let x = 0;

    while (x < 10) {
      let digitoValidador = parseInt(codes.substring(x, x + 1));
      if (isNaN(digitoValidador)) digitoValidador = 0;
      let digito = parseInt(cuit_nro.substring(x, x + 1));
      if (isNaN(digito)) digito = 0;
      let digitoValidacion = digitoValidador * digito;
      resultado += digitoValidacion;
      x++;
    }
    resultado = resultado % 11;
    rv = resultado == verificador;
    return rv;
  }

  agregarCliente(formData: any, formDirective: FormGroupDirective) {
    const data = this.formCliente.value;
    const cliente: ClienteCreacionDTO = {
      nombre: data.nombre!,
      fechaNacimiento: new Date(data.fechaNacimiento!),
      cuit: data.cuit!,
    };
    if (
      !cliente.fechaNacimiento ||
      this.calculaEdad(cliente.fechaNacimiento) < 18
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Debe ser mayor de edad para poder operar',
      });
      console.log('Debe ser mayor de edad para poder operar');
      return;
    }
    if (!cliente.cuit || !this.isValidCUITCUIL(cliente.cuit)) {
      Swal.fire({
        icon: 'error',
        title:
          'Debe ingresar cuil/cuit valido y con guiones para poder continuar',
      });
      console.log(
        'Debe ingresar cuil/cuit valido y con guiones para poder continuar'
      );
      return;
    }

    this.subs.add(
      this.clienteService.nuevoCliente(cliente).subscribe({
        next: (result) => {
          console.log(result);
          Swal.fire({
            icon: 'success',
            title: 'Carga Exitosa',
            showDenyButton: true,
            confirmButtonText: 'Cargar otro cliente',
            denyButtonText: `Volver a lista de clientes`,
          }).then((result) => {
            if (result.isDenied) {
              this.router.navigate(['/listaClientes']);
            }
          });
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al cargar Cliente',
          });
          console.log(err);
        },
      })
    );

    this.onAgregar.emit(cliente);
    this.formCliente.reset({});
    formDirective.resetForm();
  }
}

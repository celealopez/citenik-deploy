import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente, ClienteConsultaIndividual } from '../../model/cliente';
import { ClienteService } from '../../services/cliente.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { DatePipe } from '@angular/common';

import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-clientes',
  templateUrl: './editar-clientes.component.html',
  styleUrls: ['./editar-clientes.component.css'],
})
export class EditarClientesComponent implements OnInit {
  cliente: Cliente;

  constructor(
    public activatedRoute: ActivatedRoute,
    public clienteService: ClienteService,
    public router: Router,
    private fb: FormBuilder,
    private pd: DatePipe
  ) {
    this.cliente = {} as Cliente;
  }

  ngOnInit(): void {
    this.obtenerUna();
  }

  obtenerUna() {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        const id = params['id'];
        this.clienteService.obtenerCliente(id).subscribe({
          next: (result) => {
            this.cliente = result;
          },
          error: (error) => {
            //alert("error al editar")
            Swal.fire({
              icon: 'error',
              title: 'Error al editar cliente',
            });
          },
        });
      },
    });
  }

  editarcliente(cliente: Cliente) {
    this.clienteService.modificarCliente(cliente).subscribe({
      next: (result) => {
        //alert("edicion exitosa");
        Swal.fire({
          icon: 'success',
          title: 'Cambios actualizados',
        });
        this.router.navigate(['/listaClientes']);
      },
      error: (error) => {
        //alert("error")

        Swal.fire({
          icon: 'error',
          title: 'Error al cargar Cliente',
        });
      },
    });
  }
}

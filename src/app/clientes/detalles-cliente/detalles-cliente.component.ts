import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ClienteConsultaIndividual } from '../../model/cliente';
import { ClienteService } from 'src/app/services/cliente.service';


@Component({
  selector: 'app-detalles-cliente',
  templateUrl: './detalles-cliente.component.html',
  styleUrls: ['./detalles-cliente.component.css']
})
export class DetallesClienteComponent implements OnInit {

  cliente: ClienteConsultaIndividual;
  clienteEstaCargado: boolean = false;
  clientesDesplegado = false;
  planesDesplegado = false;
  cuotasDesplegado = false;
  cuotasDetalleDesplegado = false;


  constructor(
    public dialogRef: MatDialogRef<DetallesClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private clienteService: ClienteService,
  ) { }

  ngOnInit(): void {
    this.obtenerDetallesCliente()
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  obtenerDetallesCliente(){
    this.clienteService.obtenerCliente(this.data)
      .subscribe({
          next: (resultado) => {console.log(resultado);

              this.cliente = resultado;
              this.clienteEstaCargado = true;
            },
            error: (err) => {
                console.log(err.status);
              },

            });
    }

    esNullOCero(valor: number | null){
      return (valor === 0 || null) ? true : false;
    }

}

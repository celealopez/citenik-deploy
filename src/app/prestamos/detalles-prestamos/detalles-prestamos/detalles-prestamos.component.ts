import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PrestamoDetallesDTO } from '../../../model/prestamo';
import { PrestamosService } from 'src/app/services/prestamos.service';

@Component({
  selector: 'app-detalles-prestamos',
  templateUrl: './detalles-prestamos.component.html',
  styleUrls: ['./detalles-prestamos.component.css']
})
export class DetallesPrestamosComponent implements OnInit {

  prestamo: PrestamoDetallesDTO;
  prestamoEstaCargado: boolean = false;
  clientesDesplegado = false;
  planesDesplegado = false;
  cuotasDesplegado = false;
  cuotasDetalleDesplegado = false;

  constructor(
    public dialogRef: MatDialogRef<DetallesPrestamosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private prestamosService: PrestamosService,
  ) { }

  ngOnInit(): void {
    this.obtenerDetallesPrestamo()
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  obtenerDetallesPrestamo(){
    this.prestamosService.obtenerPrestamo(this.data)
      .subscribe({
          next: (resultado) => {
              this.prestamo = resultado;
              this.prestamoEstaCargado = true;
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

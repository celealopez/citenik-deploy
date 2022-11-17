import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Data, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Cuotas, CuotasDTO } from '../model/cuotas';
import { CuotasService } from '../services/cuotas.service';
import { ConsultaCuota } from '../model/consultaCuota';

@Component({
  selector: 'cuotas-dialog',
  templateUrl: 'cuotasDialog.html',
  styleUrls: ['./cuotasDialog.css'],
})
export class CuotasDialog implements OnInit {
  private subs: Subscription;
  cuotaEstaCargada: boolean = false;
  cuotaAPagar: CuotasDTO;
  cuotasConsulta: ConsultaCuota = {
    fechaPago: null,
    prestamoId: '',
  };

  constructor(
    public router: Router,
    public cuotasService: CuotasService,
    public dialogRef: MatDialogRef<CuotasDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ConsultaCuota
  ) {
    this.subs = new Subscription();
    console.log(this.data);
  }

  ngOnInit(): void {
    this.consultarCuota();
  }

  consultarCuota(){
    const cuotasConsulta: ConsultaCuota = {
      fechaPago: this.data.fechaPago!,
      prestamoId: this.data.prestamoId!,
    };
    this.cuotasService.consultaCuotas(cuotasConsulta).subscribe({
      next: (result) => {




        this.cuotaAPagar= {
          fechaPago: this.data.fechaPago,
          prestamoId: result.prestamoId,
          cuotaNumero: result.cuotaNumero,
          fechaDeVencimiento: result.fechaDeVencimiento,
          diasDeDemora: result.diasDeDemora,
          interesesPunitorios: result.interesesPunitorios,
          capital: result.capital,
          interesesFinancieros: result.interesesFinancieros,
          gastosOtorgamiento: result.gastosOtorgamiento,
          montoTotalCuota: result.montoTotalCuota,
        };
        this.cuotaEstaCargada = true;
      },


      });
  }

  pagarCuota() {
    const cuotasConsulta: ConsultaCuota = {
      fechaPago: this.data.fechaPago!,
      prestamoId: this.data.prestamoId!,
    };

    Swal.fire({
      title: '¿Estás seguro que quiere pagar esta cuota?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.subs.add(
          this.cuotasService.pagoCuotas(cuotasConsulta).subscribe({
            next: (result) => {
              console.log(result);
              Swal.fire({
                icon: 'success',
                title: 'Pago Exitoso',
                showDenyButton: true,
                confirmButtonText: 'Consultar por la próxima cuota a pagar',
                denyButtonText: `Volver al inicio`,
              }).then((result) => {
                if (result.isDenied) {
                  this.router.navigate(['/graficos']);
                }
              });
            },
            error: (err) => {
              Swal.fire({
                icon: 'error',
                title: 'Error al pagar la cuota',
              });
              console.log(err);
            },
          })
        );
      }
    });
  }
}

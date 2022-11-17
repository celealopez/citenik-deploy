import { DatePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CuotasDTO, Cuotas } from '../model/cuotas';
import { CuotasService } from '../services/cuotas.service';
import { ConsultaCuota } from '../model/consultaCuota';
import Swal from 'sweetalert2';

import { MatDialog } from '@angular/material/dialog';

import { CuotasDialog } from './CuotasDialog.1';
import { AnyObject } from 'chart.js/types/basic';

@Component({
  selector: 'app-cuotas',
  templateUrl: './cuotas.component.html',
  styleUrls: ['./cuotas.component.css'],
})
export class CuotasComponent implements OnInit {
  cuotas: CuotasDTO;
  formConsulta = new FormGroup({
    fechaPago: new FormControl(null, [Validators.required]),
    prestamoId: new FormControl(null, [Validators.required]),
  });

  private subs: Subscription;

  cuotasConsulta: ConsultaCuota = {
    fechaPago: null,
    prestamoId: '',
  };

  constructor(
    public cuotasService: CuotasService,
    public router: Router,
    private pd: DatePipe,
    public dialog: MatDialog
  ) {
    this.subs = new Subscription();
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  consultarCuota(formData: any, formDirective: FormGroupDirective) {
    const value = this.formConsulta.value;

    const cuotasConsulta: ConsultaCuota = {
      fechaPago: value.fechaPago!,
      prestamoId: value.prestamoId!,
    };
    this.cuotasService.consultaCuotas(cuotasConsulta).subscribe({
      next: (result) => {


        this.openDialog(cuotasConsulta);
        console.log(result);
      },
      error: (err) => {
        if (err.status == 400) {
          Swal.fire({
            icon: 'error',
            title: 'Todas las cuotas están pagas o el préstamo no está vigente',
          });
          return;
        }if (err.status == 404 ) {
          Swal.fire({
            icon: 'error',
            title: 'No existe este préstamo',
          });
          return;
      }
    }
    });
  }

  openDialog(data: any): void {
    const dialogRef = this.dialog.open(CuotasDialog, {
      data,
    });
  }
}

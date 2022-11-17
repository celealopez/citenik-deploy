import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ChartData } from 'chart.js';
import { Subscription, filter } from 'rxjs';
import { Graficos} from 'src/app/model/graficos';
import { QueryParam } from 'src/app/model/queryParam';
import { GraficosService } from 'src/app/services/graficos.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.css'],
})
export class BarraComponent implements OnInit {
  datos: ChartData<'bar'>;

  private labels: string[] = ['Cantidad de prestamos otorgados'];

  private subscription = new Subscription();
  canvaEstaCargado: boolean = false;
  listaQueryParams: QueryParam[];
  queryParams = new HttpParams();

  constructor(private graficosService: GraficosService) {

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription.add(
      this.graficosService.getPrestamos().subscribe({
        next: (respuesta) => {
          this.datos = {
            labels: this.labels,

            datasets: [
              {
                data: [respuesta.rango0A4999],

                label: '$0 a $4999',
              },
              {
                data: [respuesta.rango5000A9999],
                label: '$5000 a $9999',
              },
              {
                data: [respuesta.rango10000A24999],
                label: '$10000 a $24999',
              },
              {
                data: [respuesta.rango25000A49999],
                label: '$25000 a $44999',
              },
              {
                data: [respuesta.mayoresDe50000],
                label: 'Más de $50000',
              },
            ],
          };this.canvaEstaCargado = true;
        },
        error: () => alert('API no responde'),
      })
    );
  }

}

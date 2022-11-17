import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChartData } from 'chart.js';
import { GraficosService } from 'src/app/services/graficos.service';
import { Subscription, Observable } from 'rxjs';
import { Graficos } from '../../model/graficos';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-torta',
  templateUrl: './torta.component.html',
  styleUrls: ['./torta.component.css'],
})
export class TortaComponent implements OnInit, OnDestroy {
  datos: ChartData<'pie'>;

  graficos: Graficos;
  private subscription = new Subscription();
  canvaEstaCargado: boolean = false;
  constructor(
    private graficosService: GraficosService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription.add(
      this.graficosService.ObtenerEstadistica().subscribe({
        next: (respuesta) => {

          this.datos = {
            labels: [
              respuesta.find(
                (graficos) => graficos.nombrePlan === 'Tradicional Plano'
              )?.nombrePlan!,
              respuesta.find(
                (graficos) => graficos.nombrePlan === 'Plan Express Plano'
              )?.nombrePlan!,
            ],
            datasets: [
              {
                data: [
                  respuesta.find(
                    (graficos) => graficos.nombrePlan === 'Tradicional Plano'
                  )?.prestamosVigentes!,
                  respuesta.find(
                    (graficos) => graficos.nombrePlan === 'Plan Express Plano'
                  )?.prestamosVigentes!,
                ],
              },
            ],
          };
          this.canvaEstaCargado = true;
        },
        error: () => alert('API no responde'),
      })
    );
  }
}

import { TopClientes } from './../../model/graficos';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { GraficosService } from 'src/app/services/graficos.service';

@Component({
  selector: 'app-kpi-top-clientes',
  templateUrl: './kpi-top-clientes.component.html',
  styleUrls: ['./kpi-top-clientes.component.css'],
})
export class KpiTopClientesComponent implements OnInit {
  private subscription = new Subscription();
  canvaEstaCargado: boolean = false;
  data: TopClientes[];

  constructor(private graficosService: GraficosService) {}

  ngOnInit(): void {
    this.graficosService.getTopClientes().subscribe({
      next: (result) => {
        this.data = result;

        this.canvaEstaCargado = true;
      },
    });
  }
}

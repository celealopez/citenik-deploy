import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Capital } from 'src/app/model/graficos';
import { GraficosService } from 'src/app/services/graficos.service';
import { Interes, Punitorio } from '../../model/graficos';

@Component({
  selector: 'app-kpi-capital',
  templateUrl: './kpi-capital.component.html',
  styleUrls: ['./kpi-capital.component.css'],
})
export class KpiCapitalComponent implements OnInit {
  private subscription = new Subscription();

  data: Capital;
  dataInteres:Interes;
  dataPunitorio:Punitorio;

  constructor(private graficosService: GraficosService) {}

  ngOnInit(): void {
    this.graficosService.getCapital().subscribe({
      next: (result) => {
        this.data = result;


      },
    });
    this.graficosService.getInteres().subscribe({
      next: (resultado) => {
        this.dataInteres = resultado;


      },
    });
    this.graficosService.getPunitorio().subscribe({
      next: (resultado2) => {
        this.dataPunitorio = resultado2;


      },
    });
  }
}

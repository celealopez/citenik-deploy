import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TopPrestamos } from 'src/app/model/graficos';
import { GraficosService } from 'src/app/services/graficos.service';

@Component({
  selector: 'app-kpi-top-prestamos',
  templateUrl: './kpi-top-prestamos.component.html',
  styleUrls: ['./kpi-top-prestamos.component.css']
})
export class KpiTopPrestamosComponent implements OnInit {
  private subscription = new Subscription();
  canvaEstaCargado: boolean = false;
  data:TopPrestamos[];

  constructor( private graficosService: GraficosService) {}



  ngOnInit(): void {
    this.graficosService.getTopPrestamos().subscribe({
      next: (result) => {
        this.data=result;

        this.canvaEstaCargado = true;

      }

    })


  }

}


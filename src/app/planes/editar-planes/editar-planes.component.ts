import { Component, OnInit } from '@angular/core';
import { Plan } from '../../model/plan';
import { PlanService } from '../../services/plan.service';
import { Router, ActivatedRoute } from '@angular/router';

import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-planes',
  templateUrl: './editar-planes.component.html',
  styleUrls: ['./editar-planes.component.css'],
})
export class EditarPlanesComponent implements OnInit {
  plan: Plan;
  constructor(
    public planService: PlanService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {
    this.plan = {} as Plan;
  }

  ngOnInit(): void {
    this.obtenerPlan();
  }

  obtenerPlan() {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        const id = params['id'];
        this.planService.obtenerPlan(id).subscribe({
          next: (result) => {
            this.plan = result;
          },
          error: (error) => {
            //alert("error al editar")
            Swal.fire({
              icon: 'error',
              title: 'Error al editar',
            });
          },
        });
      },
    });
  }

  editarPlan(plan: Plan) {
    console.log(plan);
    this.planService.modificarPlan(plan).subscribe({
      next: (result) => {
        //alert("edicion exitosa");
        Swal.fire({
          icon: 'success',
          title: 'Cambios actualizados',
        });
        this.router.navigate(['/listaPlanes']);
      },
      error: (error) => {
        //alert("error")
        Swal.fire({
          icon: 'error',
          title: 'Error',
        });
      },
    });
  }
}

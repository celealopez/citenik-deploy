import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Plan, PlanCreacionDTO } from '../../model/plan';
import { PlanService } from '../../services/plan.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-alta-planes',
  templateUrl: './alta-planes.component.html',
  styleUrls: ['./alta-planes.component.css'],
})
export class AltaPlanesComponent implements OnInit {
  formPlanes = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    tna: new FormControl(null, [Validators.required]),
    duracionMinimaCuotas: new FormControl(null, [Validators.required]),
    duracionMaximaCuotas: new FormControl(null, [Validators.required]),
    montoMinimo: new FormControl(null, [Validators.required]),
    montoMaximo: new FormControl(null, [Validators.required]),
    edadMaxima: new FormControl(null, [Validators.required]),
    precancelacion: new FormControl(false, [Validators.required]),
    precancelacionCuotaMinima: new FormControl(null),
    precancelacionMulta: new FormControl(null),
    vigencia: new FormControl(true, [Validators.required]),
    costoAdministrativo: new FormControl(null, [Validators.required]),
  });

  private subs: Subscription;
  @Output() onAgregar = new EventEmitter<PlanCreacionDTO>();
  constructor(public planService: PlanService, public router: Router) {
    this.subs = new Subscription();
  }

  ngOnInit(): void {}
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  agregarPlan(formData: any, formDirective: FormGroupDirective) {
    const data = this.formPlanes.value;
    const plan: PlanCreacionDTO = {
      nombre: data.nombre!,
      tna: data.tna!,
      duracionMinimaCuotas: data.duracionMinimaCuotas!,
      duracionMaximaCuotas: data.duracionMaximaCuotas!,
      montoMinimo: data.montoMinimo!,
      montoMaximo: data.montoMaximo!,
      edadMaxima: data.edadMaxima!,
      precancelacion: data.precancelacion!,
      precancelacionCuotaMinima: data.precancelacionCuotaMinima!,
      precancelacionMulta: data.precancelacionMulta!,
      vigencia: data.vigencia!,
      costoAdministrativo: data.costoAdministrativo!,
    };
    this.subs.add(
      this.planService.nuevoPlan(plan).subscribe({
        next: (result) => {
          console.log(result);
          //alert('carga exitosa');

          Swal.fire({
            title: 'Carga Exitosa',
            showDenyButton: true,
            confirmButtonText: 'Cargar otro plan',
            denyButtonText: `Volver a lista de planes`,
          }).then((result) => {
            if (result.isDenied) {
              this.router.navigate(['/listaPlanes']);
            }
          });
        },
        error: (err) => {
          //alert('error al cargar el plan');
          Swal.fire({
            icon: 'error',
            title: 'Error al cargar Plan',
          });
          console.log(err);
        },
      })
    );

    this.onAgregar.emit(plan);
    this.formPlanes.reset({});
    formDirective.resetForm();
  }
}

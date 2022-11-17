import { Injectable } from '@angular/core';
import { Plan, PlanConsultaIndividualDTO, PlanCreacionDTO } from '../model/plan';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  listaPlanes: Plan[];
  uri: string = 'https://citenik-nodocker.azurewebsites.net/api/planes';
  constructor(public http: HttpClient,public router:Router) {
   this.listaPlanes = [];
  }

  getPlanes(): Observable<Plan[]> {
    return this.http.get<Plan[]>(this.uri);
  }



  nuevoPlan(nuevoPlan: PlanCreacionDTO): Observable<any> {
    const plan = {
      nombre:nuevoPlan.nombre,
      tna:nuevoPlan.tna,
      duracionMinimaCuotas:nuevoPlan.duracionMinimaCuotas,
      duracionMaximaCuotas:nuevoPlan.duracionMaximaCuotas,
      montoMinimo:nuevoPlan.montoMinimo,
      montoMaximo:nuevoPlan.montoMaximo,
      edadMaxima:nuevoPlan.edadMaxima,
      precancelacion:nuevoPlan.precancelacion,
      precancelacionCuotaMinima:nuevoPlan.precancelacionCuotaMinima,
      precancelacionMulta:nuevoPlan.precancelacionMulta,
      vigencia:nuevoPlan.vigencia,
      costoAdministrativo:nuevoPlan.costoAdministrativo
    };
    console.log(plan);
    return this.http.post(this.uri, plan, {
      headers: { 'Content-Type': 'application/json' },

    });

  }




  obtenerPlan(id: string): Observable<PlanConsultaIndividualDTO>{
    return this.http.get<PlanConsultaIndividualDTO>(`${this.uri}/${id}`);
  }
  modificarPlan(plan: Plan):Observable<Plan>{
    return this.http.put<Plan>(`${this.uri}/${plan.id}`,plan);
  }
  eliminarPlan(id: string){
    return this.http.delete(`${this.uri}/${id}`)
  }

  cantidad() {
    return this.listaPlanes.length;
  }

}

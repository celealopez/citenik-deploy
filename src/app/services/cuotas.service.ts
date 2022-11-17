
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ConsultaCuota } from '../model/consultaCuota';
import { Cuotas, CuotasDTO } from '../model/cuotas';

@Injectable({
  providedIn: 'root',
})
export class CuotasService {


  uri: string = 'https://citenik-nodocker.azurewebsites.net/api/cuotas';
  constructor(
    public http: HttpClient,
    public router: Router,
    private pd: DatePipe
  ) {}


  consultaCuotas(cuotas: ConsultaCuota): Observable<any> {
    return this.http.post<Cuotas>(`${this.uri}/consulta`,cuotas,{
      headers: { 'Content-Type': 'application/json' },
    });
  }

  pagoCuotas(cuotas: ConsultaCuota): Observable<any> {
    return this.http.post<CuotasDTO>(`${this.uri}/pago`,cuotas,{
      headers: { 'Content-Type': 'application/json' },
    });
  }

}

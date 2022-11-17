import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Capital, GraficoBarra, Graficos, Interes, Punitorio, TopClientes, TopPrestamos } from '../model/graficos';

@Injectable({
  providedIn: 'root'
})
export class GraficosService {

  private uri: string = 'https://citenik-nodocker.azurewebsites.net/api/graficos';


  constructor(private http: HttpClient) {

  }



ObtenerEstadistica(): Observable<Graficos[]> {
  return this.http.get<Graficos[]>(`${this.uri}/prestamosActivoPorPlan`);
}
getPrestamos(): Observable<GraficoBarra> {
  return this.http.get<GraficoBarra>(`${this.uri}/prestamosActivosPorRango`);
}
getTopClientes():Observable<TopClientes[]> {
  return this.http.get<TopClientes[]>(`${this.uri}/top5ClientesMayorDeuda`);
}
getCapital():Observable<Capital> {
  return this.http.get<Capital>(`${this.uri}/capitalImpago`);
}
getInteres():Observable<Interes> {
  return this.http.get<Interes>(`${this.uri}/interesFinancieroImpago`);
}
getPunitorio():Observable<Punitorio> {
  return this.http.get<Punitorio>(`${this.uri}/punitorioCobrado`);
}
getTopPrestamos():Observable<TopPrestamos[]> {
  return this.http.get<TopPrestamos[]>(`${this.uri}/top5MayorRentabilidad`);
}
}

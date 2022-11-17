import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Prestamo, PrestamoCreacionDTO, PrestamoConsultaDTO, PrestamoDetallesDTO } from '../model/prestamo';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PrestamosService {
  listaPrestamos: Prestamo[];
  uri: string = 'https://citenik-nodocker.azurewebsites.net/api/prestamos';
  constructor(public http: HttpClient,public router:Router,
    private pd: DatePipe) {
   this.listaPrestamos = [];
  }

  getPrestamos(queryParams: HttpParams): Observable<PrestamoConsultaDTO[]> {
    return this.http.get<PrestamoConsultaDTO[]>(`${this.uri}`, {params: queryParams});
  }



  nuevoPrestamo(prestamo: PrestamoCreacionDTO): Observable<any> {
    return this.http.post(`${this.uri}/simular`, prestamo, {
      headers: { 'Content-Type': 'application/json' },

    });

  }




  obtenerPrestamo(id: string): Observable<PrestamoDetallesDTO>{
    return this.http.get<PrestamoDetallesDTO>(`${this.uri}/${id}`);
  }
  modificarPrestamo(prestamo: Prestamo):Observable<any>{

    return this.http.put<Prestamo>(`${this.uri}/aprobar`,{id:prestamo});
  }
  cantidad() {
    return this.listaPrestamos.length;
  }
}

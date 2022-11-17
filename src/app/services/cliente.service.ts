import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente, ClienteCreacionDTO, ClienteConsultaIndividual } from '../model/cliente';
import { Prestamo, PrestamoCreacionDTO, PrestamoConsultaDTO, PrestamoDetallesDTO } from '../model/prestamo';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  listaClientes: Cliente[];
  uri : string = 'https://citenik-nodocker.azurewebsites.net/api/clientes'
  constructor(public http : HttpClient) {
    this.listaClientes = [];
  }

  getClientes(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.uri)
  }

  nuevoCliente(cliente: ClienteCreacionDTO): Observable<any> {
    console.log(cliente);
    return this.http.post(this.uri, cliente, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  obtenerCliente(id: string): Observable<ClienteConsultaIndividual>{
    return this.http.get<ClienteConsultaIndividual>(`${this.uri}/${id}`);
  }
  modificarCliente(cliente: Cliente):Observable<Cliente>{
    return this.http.put<Cliente>(`${this.uri}/${cliente.id}`,cliente);


  }

  eliminarCliente(id: string){
    return this.http.delete(`${this.uri}/${id}`)
  }

  cantidad() {
    return this.listaClientes.length;
  }

  //obtenerClienteDetalle(id: string): Observable<ClienteConsultaIndividualDTO>{
  //  return this.http.get<ClienteConsultaIndividualDTO>(`${this.uri}/${id}`);
  //}





}

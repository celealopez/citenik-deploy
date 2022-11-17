import { PlanCreacionDTO } from "./plan";
import { Cuotas } from "./cuotas";
import { PrestamoConsultaDTO } from "./prestamo";

export class Cliente {
  public id: string;
  public nombre: string;
  public cuit: string;
  public fechaNacimiento: Date;
  public activo: boolean;

  constructor() {
    this.id = '';
    this.nombre = '';
    this.cuit = '';
    this.fechaNacimiento = new Date();
    this.activo = true;
  }

  toString() {
    return `${this.id} ${this.nombre} ${this.cuit}`;
  }
}

export interface ClienteCreacionDTO extends Omit<Cliente, 'id' | 'activo'> {}

export interface ClienteConsultaIndividual{
  id: string;
  nombre:string;
  cuit:string;
  fechaNacimiento: Date;
  activo:boolean;
  prestamosActivos:number;
  deudaTotal:number;

}



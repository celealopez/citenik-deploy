import { ClienteCreacionDTO } from "./cliente";
import { Cuotas } from "./cuotas";
import { PlanCreacionDTO } from "./plan";

export class Prestamo {
  public id: string;
  public planId: number | null;
  public clienteId: number | null;
  public capital: number | null;
  public fechaOtorgamiento: Date | null;
  public cuotasTotales: number | null;
  public estado: string;

  constructor() {
    this.id = '';
    this.planId = null;
    this.clienteId = null;
    this.capital = null;
    this.cuotasTotales = null;
    this.fechaOtorgamiento = null;
    this.estado = '';
  }

  // toString() {
  //   return `${this.id} ${this.nombre} ${this.cuit}`;
  // }
}

export interface PrestamoCreacionDTO
  extends Partial<Omit<Prestamo, 'id' | 'estado'>> {
  fechaDeVencimiento: 10 | 15 | 20 | null;
}
export interface PrestamoConsultaDTO extends Prestamo{
  cuotasPagas: number;
  cuotasVencidasImpagas: number;
}

export interface PrestamoDetallesDTO{
  id: number;
  capital:number;
  fechaOtorgamiento: Date;
  estado: string;
  cuotasTotales: number;
  cuotasPagas: number;
  cuotasVencidasImpagas: number;

  cliente: ClienteCreacionDTO;
  plan: PlanCreacionDTO;
  cuotas: Cuotas[];
}

export class PrestamoFiltroDTO{
  public Id: number | undefined;
  public Estado:string;
  public FechaOtorgamientoMinima:string|undefined;
  public FechaOtorgamientoMaxima:string|undefined;
  public Cliente:string | undefined;
  public Plan:string | undefined;
  public CapitalMinimo: number | undefined;
  public CapitalMaximo: number | undefined;
  public CuotasTotalesMinimas: number | undefined;
  public CuotasTotalesMaximas: number | undefined;
  public CuotasPagasMinimas: number | undefined;
  public CuotasPagasMaximas: number | undefined;
  public CuotasVencidasImpagasMinimas: number | undefined;
  public CuotasVencidasImpagasMaximas: number | undefined;

  constructor(){
  this.Id = undefined;
  this.Estado = "vigente"
  this.FechaOtorgamientoMinima  = undefined;
  this.FechaOtorgamientoMaxima  = undefined;
  this.Cliente = undefined;
  this.Plan = undefined;
  this.CapitalMinimo = undefined;
  this.CapitalMaximo = undefined;
  this.CuotasTotalesMinimas = undefined;
  this.CuotasTotalesMaximas = undefined;
  this.CuotasPagasMinimas = undefined;
  this.CuotasPagasMaximas = undefined;
  this.CuotasVencidasImpagasMinimas = undefined;
  this.CuotasVencidasImpagasMaximas = undefined;
  }
}

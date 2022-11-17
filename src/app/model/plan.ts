import { PrestamoConsultaDTO } from "./prestamo";

export class Plan {
  public id: string;
  public nombre: string;
  public tna: number | null;
  public duracionMinimaCuotas: number | null;
  public duracionMaximaCuotas: number | null;
  public montoMinimo: number | null;
  public montoMaximo: number | null;
  public edadMaxima: number | null;
  public precancelacion: boolean;
  public precancelacionCuotaMinima: number | null;
  public precancelacionMulta: number | null;
  public vigencia: boolean;
  public costoAdministrativo: number | null;

  constructor() {
    this.id = '';
    this.nombre = '';
    this.tna = null;
    this.duracionMinimaCuotas = null;
    this.duracionMaximaCuotas = null;
    this.montoMinimo = null;
    this.montoMaximo = null;
    this.edadMaxima = null;
    this.precancelacion = false;
    this.precancelacionCuotaMinima = null;
    this.precancelacionMulta = null;
    this.vigencia = true;
    this.costoAdministrativo = null;
  }

  toString() {
    return `${this.id} ${this.nombre}`;
  }
}
export interface PlanCreacionDTO extends Omit<Plan, 'id'> {}
export interface PlanConsultaIndividualDTO extends Plan {
  prestamos: PrestamoConsultaDTO[];
}

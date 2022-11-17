

export interface Graficos {
   nombrePlan: string;
   prestamosPendientes: number;
   prestamosVigentes: number;
}
export interface GraficoBarra{
  rango0A4999: number;
  rango5000A9999: number;
  rango10000A24999:  number;
  rango25000A49999:  number;
  mayoresDe50000: number;
}

export interface TopClientes{
  idCliente: number;
    nombreCliente: string;
    montoImpago: number;
}
export interface Capital{
  capitalImpago:number;
}
export interface Interes{
  interesFinanciero:number;
}
export interface Punitorio{
  interesPunitorioCobrado:number;
}
export interface TopPrestamos{

  nombreCliente: string;
  interesesPagados: number;
}

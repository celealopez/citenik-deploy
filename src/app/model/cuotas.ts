export class Cuotas {

    public prestamoId: string;
    public cuotaNumero: number | null;
    public fechaDeVencimiento: Date | null;
    public diasDeDemora: number | null;
    public interesesPunitorios: number | null;
    public capital: number | null;
    public interesesFinancieros: number | null;
    public gastosOtorgamiento: number | null;
    public montoTotalCuota: number | null;

    constructor() {
      this.prestamoId = '';
      this.cuotaNumero = null;
      this.fechaDeVencimiento = new Date();
      this.diasDeDemora = null;
      this.interesesPunitorios = null;
      this.capital = null;
      this.interesesFinancieros = null;
      this.gastosOtorgamiento = null;
      this.montoTotalCuota = null;
    }

    toString() {
      return `${this.prestamoId} ${this.cuotaNumero} `;
    }
  }

  export interface CuotasDTO extends Cuotas {

    fechaPago:Date |null;
  }

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlanService } from 'src/app/services/plan.service';
import { PlanConsultaIndividualDTO } from '../../model/plan';

@Component({
  selector: 'app-detalles-planes',
  templateUrl: './detalles-planes.component.html',
  styleUrls: ['./detalles-planes.component.css']
})
export class DetallesPlanesComponent implements OnInit {

  plan: PlanConsultaIndividualDTO;
  planEstaCargado: boolean = false;
  prestamosDesplegado: boolean = false;
  prestamoDetalleDesplegado: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DetallesPlanesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private planService: PlanService,
    ) { }

  ngOnInit(): void {
    this.obtenerDetallesPlan()
  }


  obtenerDetallesPlan(){
    this.planService.obtenerPlan(this.data)
    .subscribe({
        next: (resultado) => {
            this.plan = resultado;
            this.planEstaCargado = true;
          },
          error: (err) => {
              console.log(err.status);
            },
        
          });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

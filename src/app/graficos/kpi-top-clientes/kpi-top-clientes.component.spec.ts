import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiTopClientesComponent } from './kpi-top-clientes.component';

describe('KpiTopClientesComponent', () => {
  let component: KpiTopClientesComponent;
  let fixture: ComponentFixture<KpiTopClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KpiTopClientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KpiTopClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

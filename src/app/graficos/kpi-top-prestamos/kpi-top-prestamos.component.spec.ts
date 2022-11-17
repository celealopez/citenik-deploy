import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiTopPrestamosComponent } from './kpi-top-prestamos.component';

describe('KpiTopPrestamosComponent', () => {
  let component: KpiTopPrestamosComponent;
  let fixture: ComponentFixture<KpiTopPrestamosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KpiTopPrestamosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KpiTopPrestamosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

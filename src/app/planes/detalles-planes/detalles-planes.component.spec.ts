import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesPlanesComponent } from './detalles-planes.component';

describe('DetallesPlanesComponent', () => {
  let component: DetallesPlanesComponent;
  let fixture: ComponentFixture<DetallesPlanesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesPlanesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesPlanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

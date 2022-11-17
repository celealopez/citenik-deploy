import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaPrestamosComponent } from './alta-prestamos.component';

describe('AltaComponent', () => {
  let component: AltaPrestamosComponent;
  let fixture: ComponentFixture<AltaPrestamosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AltaPrestamosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AltaPrestamosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPlanesComponent } from './editar-planes.component';

describe('EditarPlanesComponent', () => {
  let component: EditarPlanesComponent;
  let fixture: ComponentFixture<EditarPlanesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarPlanesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditarPlanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaPlanesComponent } from './alta-planes.component';

describe('AltaPlanesComponent', () => {
  let component: AltaPlanesComponent;
  let fixture: ComponentFixture<AltaPlanesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AltaPlanesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AltaPlanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

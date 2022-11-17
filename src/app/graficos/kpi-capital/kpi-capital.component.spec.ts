import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiCapitalComponent } from './kpi-capital.component';

describe('KpiCapitalComponent', () => {
  let component: KpiCapitalComponent;
  let fixture: ComponentFixture<KpiCapitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KpiCapitalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KpiCapitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

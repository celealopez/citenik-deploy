/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CuotasService } from './cuotas.service';

describe('Service: Cuotas', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CuotasService]
    });
  });

  it('should ...', inject([CuotasService], (service: CuotasService) => {
    expect(service).toBeTruthy();
  }));
});

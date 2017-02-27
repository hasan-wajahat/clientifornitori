/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MovimentiService } from './movimenti.service';

describe('Service: Movimenti', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovimentiService]
    });
  });

  it('should ...', inject([MovimentiService], (service: MovimentiService) => {
    expect(service).toBeTruthy();
  }));
});

/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { PuntoDetalleService } from './punto-detalle.service';

describe('PuntoDetalle Service', () => {
  beforeEachProviders(() => [PuntoDetalleService]);

  it('should ...',
      inject([PuntoDetalleService], (service: PuntoDetalleService) => {
    expect(service).toBeTruthy();
  }));
});

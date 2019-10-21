/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ServiceService } from './service.service';

describe('Service: Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceService]
    });
  });

  it('should ...', inject([ServiceService], (service: ServiceService) => {
    expect(service).toBeTruthy();
  }));
});

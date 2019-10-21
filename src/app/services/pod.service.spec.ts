/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PodService } from './pod.service';

describe('Service: Pod', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PodService]
    });
  });

  it('should ...', inject([PodService], (service: PodService) => {
    expect(service).toBeTruthy();
  }));
});

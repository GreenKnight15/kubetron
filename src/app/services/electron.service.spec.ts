/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ElectronService } from './electron.service';

describe('Service: Electron', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ElectronService]
    });
  });

  it('should ...', inject([ElectronService], (service: ElectronService) => {
    expect(service).toBeTruthy();
  }));
});

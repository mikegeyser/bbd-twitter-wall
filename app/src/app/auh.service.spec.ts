import { TestBed, inject } from '@angular/core/testing';

import { AuhService } from './auh.service';

describe('AuhService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuhService]
    });
  });

  it('should ...', inject([AuhService], (service: AuhService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { VisitmodeService } from './visitmode.service';

describe('VisitmodeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VisitmodeService]
    });
  });

  it('should be created', inject([VisitmodeService], (service: VisitmodeService) => {
    expect(service).toBeTruthy();
  }));
});

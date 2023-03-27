import { TestBed } from '@angular/core/testing';

import { UtlitesService } from './utlites.service';

describe('UtlitesService', () => {
  let service: UtlitesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtlitesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

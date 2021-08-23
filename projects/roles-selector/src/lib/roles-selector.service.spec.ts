import { TestBed } from '@angular/core/testing';

import { RolesSelectorService } from './roles-selector.service';

describe('RolesSelectorService', () => {
  let service: RolesSelectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolesSelectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

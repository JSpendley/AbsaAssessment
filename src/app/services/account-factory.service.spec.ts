import { TestBed } from '@angular/core/testing';

import { AccountFactoryService } from './account-factory.service';

describe('AccountFactoryService', () => {
  let service: AccountFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

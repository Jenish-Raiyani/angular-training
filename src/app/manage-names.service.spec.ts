import { TestBed } from '@angular/core/testing';

import { ManageNamesService } from './manage-names.service';

describe('ManageNamesService', () => {
  let service: ManageNamesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageNamesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

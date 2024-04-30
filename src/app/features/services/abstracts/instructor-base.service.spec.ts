import { TestBed } from '@angular/core/testing';

import { InstructorBaseService } from './instructor-base.service';

describe('InstructorBaseService', () => {
  let service: InstructorBaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstructorBaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

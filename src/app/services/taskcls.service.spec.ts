import { TestBed } from '@angular/core/testing';

import { TaskclsService } from './taskcls.service';

describe('TaskclsService', () => {
  let service: TaskclsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskclsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

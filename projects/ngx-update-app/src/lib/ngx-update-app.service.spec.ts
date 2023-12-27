import { TestBed } from '@angular/core/testing';

import { NgxUpdateAppService } from './ngx-update-app.service';

describe('NgxUpdateAppService', () => {
  let service: NgxUpdateAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxUpdateAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

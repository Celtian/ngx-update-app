import { TestBed } from '@angular/core/testing';

import { ApplicationRef } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { provideUpdateApp } from './ngx-update-app.provider';
import { NgxUpdateAppService } from './ngx-update-app.service';

describe('NgxUpdateAppService', () => {
  let service: NgxUpdateAppService;
  let updateSpy: jasmine.SpyObj<SwUpdate>;
  let appRefSpy: jasmine.SpyObj<ApplicationRef>;

  beforeEach(() => {
    updateSpy = jasmine.createSpyObj('SwUpdate', ['checkForUpdate', 'activateUpdate']);
    appRefSpy = jasmine.createSpyObj('ApplicationRef', ['isStable']);

    TestBed.configureTestingModule({
      providers: [
        { provide: SwUpdate, useValue: updateSpy },
        { provide: ApplicationRef, useValue: appRefSpy },
        provideUpdateApp({
          interval: 1000,
          onUpdate: () => {
            console.log('should update');
          }
        })
      ]
    });
    service = TestBed.inject(NgxUpdateAppService);
  });

  it('should create service', () => {
    expect(service).toBeTruthy();
  });
});

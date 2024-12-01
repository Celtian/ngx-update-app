import { ApplicationRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SwUpdate } from '@angular/service-worker';
import { Subject, of } from 'rxjs';
import { provideUpdateApp } from './ngx-update-app.provider';
import { NgxUpdateAppService } from './ngx-update-app.service';

describe('NgxUpdateAppService', () => {
  let service: NgxUpdateAppService;
  let updateSpy: jest.Mocked<Partial<SwUpdate>>;
  let appRefSpy: jest.Mocked<Partial<ApplicationRef>> & { afterTick: Subject<void> };

  beforeEach(() => {
    updateSpy = {
      checkForUpdate: jest.fn(),
      activateUpdate: jest.fn()
    };

    appRefSpy = {
      isStable: of(true),
      afterTick: new Subject()
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: SwUpdate, useValue: updateSpy },
        { provide: ApplicationRef, useValue: appRefSpy },
        provideUpdateApp({
          interval: 1000 * 60,
          dryRun: false,
          onUpdateFactory: () => {
            console.log('Should update');
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

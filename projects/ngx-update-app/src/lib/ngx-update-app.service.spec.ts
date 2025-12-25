import { ApplicationRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { Subject, of } from 'rxjs';
import { Mocked } from 'vitest';
import { provideUpdateApp } from './ngx-update-app.provider';
import { NgxUpdateAppService } from './ngx-update-app.service';

describe('NgxUpdateAppService', () => {
  let service: NgxUpdateAppService;
  let updateSpy: Mocked<Partial<SwUpdate>> & { versionUpdates: Subject<VersionReadyEvent> };
  let appRefSpy: Mocked<Partial<ApplicationRef>>;
  let onUpdateSpy: ReturnType<typeof vi.fn>;

  function configureTestBed(dryRun: boolean, isEnabled: boolean, interval = 1000 * 60) {
    onUpdateSpy = vi.fn();
    updateSpy = {
      isEnabled,
      checkForUpdate: vi.fn(),
      activateUpdate: vi.fn(),
      versionUpdates: new Subject<VersionReadyEvent>()
    };

    appRefSpy = {
      isStable: of(true)
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: SwUpdate, useValue: updateSpy },
        { provide: ApplicationRef, useValue: appRefSpy },
        provideUpdateApp({
          interval,
          dryRun,
          onUpdateFactory: () => onUpdateSpy
        })
      ]
    });
    service = TestBed.inject(NgxUpdateAppService);
  }

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should create service', () => {
    configureTestBed(false, true);
    expect(service).toBeTruthy();
  });

  describe('checkForUpdates', () => {
    it('should call onUpdate directly if dryRun is true', () => {
      configureTestBed(true, true);
      service.checkForUpdates();
      expect(onUpdateSpy).toHaveBeenCalled();
    });

    it('should not check for updates if not enabled', () => {
      configureTestBed(false, false);
      service.checkForUpdates();
      expect(updateSpy.checkForUpdate).not.toHaveBeenCalled();
    });

    it('should check for updates when app is stable', async () => {
      configureTestBed(false, true);
      service.checkForUpdates();
      await vi.advanceTimersByTimeAsync(0);
      expect(updateSpy.checkForUpdate).toHaveBeenCalledTimes(1);
    });

    it('should trigger onUpdate when a new version is ready', async () => {
      configureTestBed(false, true);
      service.checkForUpdates();
      await vi.advanceTimersByTimeAsync(0);

      updateSpy.versionUpdates.next({
        type: 'VERSION_READY',
        currentVersion: { hash: 'a' },
        latestVersion: { hash: 'b' }
      });

      expect(onUpdateSpy).toHaveBeenCalled();
    });

    it('should periodically check for updates', async () => {
      const interval = 1000 * 60;
      configureTestBed(false, true, interval);
      service.checkForUpdates();
      await vi.advanceTimersByTimeAsync(0);
      expect(updateSpy.checkForUpdate).toHaveBeenCalledTimes(1);
      await vi.advanceTimersByTimeAsync(interval);
      expect(updateSpy.checkForUpdate).toHaveBeenCalledTimes(2);
      await vi.advanceTimersByTimeAsync(interval);
      expect(updateSpy.checkForUpdate).toHaveBeenCalledTimes(3);
    });
  });
});

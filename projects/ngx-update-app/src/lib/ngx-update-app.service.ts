import { isPlatformBrowser } from '@angular/common';
import { ApplicationRef, Inject, Injectable, PLATFORM_ID, inject, isDevMode } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { concat, filter, first, interval } from 'rxjs';
import { APP_VERSION_INTERVAL_TOKEN, APP_VERSION_ON_UPDATE_TOKEN } from './ngx-update-app.provider';

@Injectable({
  providedIn: 'root'
})
export class NgxUpdateAppService {
  public interval = inject(APP_VERSION_INTERVAL_TOKEN);
  public onUpdate = inject(APP_VERSION_ON_UPDATE_TOKEN);

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private appRef: ApplicationRef,
    private updates: SwUpdate
  ) {}

  public checkForUpdates(): void {
    if (this.isEnabled) {
      const appIsStable$ = this.appRef.isStable.pipe(first((isStable) => isStable === true));
      const pollInterval$ = concat(appIsStable$, interval(this.interval));
      pollInterval$.subscribe(() => this.updates.checkForUpdate());
      this.updates.versionUpdates.pipe(filter((e) => e.type === 'VERSION_READY')).subscribe(() => {
        this.onUpdate();
      });
    }
  }

  private get isEnabled(): boolean {
    return (
      typeof window !== 'undefined' &&
        'navigator' in window &&
        'serviceWorker' in navigator &&
        isPlatformBrowser(this.platformId) &&
        !isDevMode(),
      this.updates.isEnabled
    );
  }
}

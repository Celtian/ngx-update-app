import { isPlatformBrowser } from '@angular/common';
import { ApplicationRef, Injectable, PLATFORM_ID, inject, isDevMode } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { concat, filter, first, interval } from 'rxjs';
import {
  APP_VERSION_DRY_RUN_TOKEN,
  APP_VERSION_INTERVAL_TOKEN,
  APP_VERSION_ON_UPDATE_TOKEN
} from './ngx-update-app.provider';

@Injectable({
  providedIn: 'root'
})
export class NgxUpdateAppService {
  private platformId = inject(PLATFORM_ID);
  private appRef = inject(ApplicationRef);
  private updates = inject(SwUpdate);

  public interval = inject(APP_VERSION_INTERVAL_TOKEN);
  public dryRun = inject(APP_VERSION_DRY_RUN_TOKEN) || false;
  public onUpdate = inject(APP_VERSION_ON_UPDATE_TOKEN);

  public checkForUpdates(): void {
    if (this.dryRun) {
      this.onUpdate();
    } else if (this.isEnabled) {
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

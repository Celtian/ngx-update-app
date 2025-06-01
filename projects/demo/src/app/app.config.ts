import { ApplicationConfig, isDevMode, provideZonelessChangeDetection } from '@angular/core';
import { provideServiceWorker } from '@angular/service-worker';
import { provideUpdateApp } from '../../../ngx-update-app/src/public-api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideUpdateApp({
      interval: 1000 * 60,
      dryRun: false,
      onUpdateFactory: () => {
        // you can use inject() here
        return () => {
          alert('Should update');
        };
      }
    }),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    })
  ]
};

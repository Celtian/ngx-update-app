import { ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideServiceWorker } from '@angular/service-worker';
import { provideUpdateApp } from 'ngx-update-app';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
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

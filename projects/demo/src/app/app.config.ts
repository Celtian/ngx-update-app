import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideServiceWorker } from '@angular/service-worker';
import { provideUpdateApp } from '../../../ngx-update-app/src/public-api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideUpdateApp({
      interval: 1000 * 60,
      onUpdateFactory: () => {
        // you can use inject() here
        return () => console.log('should update');
      }
    }),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    })
  ]
};

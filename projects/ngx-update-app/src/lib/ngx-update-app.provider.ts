import { EnvironmentProviders, InjectionToken, makeEnvironmentProviders } from '@angular/core';
import { NgxUpdateAppOptions } from './ngx-update-app.interface';

export const APP_VERSION_INTERVAL_TOKEN = new InjectionToken<NgxUpdateAppOptions['interval']>(
  '[ngxAppVersion] Interval'
);

export const APP_VERSION_ON_UPDATE_TOKEN = new InjectionToken<NgxUpdateAppOptions['onUpdateFactory']>(
  '[ngxAppVersion] On Update'
);

export const provideUpdateApp = (options: NgxUpdateAppOptions): EnvironmentProviders => {
  return makeEnvironmentProviders([
    {
      provide: APP_VERSION_INTERVAL_TOKEN,
      useValue: options.interval
    },
    {
      provide: APP_VERSION_ON_UPDATE_TOKEN,
      useFactory: options.onUpdateFactory
    }
  ]);
};

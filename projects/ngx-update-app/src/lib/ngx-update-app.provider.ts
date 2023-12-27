import { InjectionToken, Provider } from '@angular/core';
import { NgxUpdateAppOptions } from './ngx-update-app.interface';

export const APP_VERSION_OPTIONS_TOKEN = new InjectionToken<NgxUpdateAppOptions>('[ngxAppVersion] Options');

export const provideUpdateApp = (options: NgxUpdateAppOptions): Provider => {
  return {
    provide: APP_VERSION_OPTIONS_TOKEN,
    useValue: {
      interval: options.interval,
      onUpdate: options.onUpdate
    }
  };
};

import { isDevMode } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideServiceWorker } from '@angular/service-worker';
import { provideUpdateApp } from 'ngx-update-app';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
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
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const anchor = compiled.querySelector('.github-logo') as HTMLAnchorElement | null;
    expect(anchor?.href).toContain('https://github.com/celtian/ngx-update-app');
  });
});

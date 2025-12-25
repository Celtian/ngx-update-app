import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { NgxUpdateAppDirective } from './ngx-update-app.directive';
import { provideUpdateApp } from './ngx-update-app.provider';
import { NgxUpdateAppService } from './ngx-update-app.service';

describe('NgxUpdateAppDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let mockUpdateService: { checkForUpdates: ReturnType<typeof vi.fn> };

  @Component({ template: `<div>test</div>`, hostDirectives: [NgxUpdateAppDirective] })
  class TestHostComponent {}

  beforeEach(() => {
    vi.useFakeTimers();
    mockUpdateService = { checkForUpdates: vi.fn().mockReturnValue(of(null)) };

    TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [
        { provide: NgxUpdateAppService, useValue: mockUpdateService },
        provideUpdateApp({
          interval: 1000,
          onUpdateFactory: () => {
            console.log('should update');
          }
        })
      ]
    });

    fixture = TestBed.createComponent(TestHostComponent);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should create the directive', async () => {
    fixture.detectChanges();
    await vi.advanceTimersByTimeAsync(1000);
    await fixture.whenStable();
    const directiveInstance = fixture.debugElement.injector.get(NgxUpdateAppDirective);
    expect(directiveInstance).toBeTruthy();
  });
});

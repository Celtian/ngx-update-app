import { Component } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { NgxUpdateAppDirective } from './ngx-update-app.directive';
import { provideUpdateApp } from './ngx-update-app.provider';
import { NgxUpdateAppService } from './ngx-update-app.service';

describe('NgxUpdateAppDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let mockUpdateService: { checkForUpdates: jest.Mock<unknown> };

  @Component({
    template: `<div>test</div>`,
    hostDirectives: [NgxUpdateAppDirective],
    standalone: true
  })
  class TestHostComponent {}

  beforeEach(() => {
    mockUpdateService = {
      checkForUpdates: jest.fn().mockReturnValue(of(null))
    };

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

  it('should create the directive', fakeAsync(() => {
    fixture.detectChanges();
    tick(); // Simulate passage of time for fakeAsync
    const directiveInstance = fixture.debugElement.injector.get(NgxUpdateAppDirective);
    expect(directiveInstance).toBeTruthy();
  }));
});

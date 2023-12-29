import { Component } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { NgxUpdateAppDirective } from './ngx-update-app.directive';
import { provideUpdateApp } from './ngx-update-app.provider';
import { NgxUpdateAppService } from './ngx-update-app.service';

describe('NgxUpdateAppDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let mockUpdateService: jasmine.SpyObj<NgxUpdateAppService>;

  @Component({
    template: `<div>test</div>`,
    hostDirectives: [NgxUpdateAppDirective],
    standalone: true
  })
  class TestHostComponent {}

  beforeEach(() => {
    mockUpdateService = jasmine.createSpyObj('NgxUpdateAppService', ['checkForUpdates']);

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
    fixture.whenStable().then(() => {
      const directiveInstance = fixture.debugElement.injector.get(NgxUpdateAppDirective);
      expect(directiveInstance).toBeTruthy();
    });
  }));
});

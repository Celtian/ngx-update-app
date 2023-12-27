import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxUpdateAppComponent } from './ngx-update-app.component';

describe('NgxUpdateAppComponent', () => {
  let component: NgxUpdateAppComponent;
  let fixture: ComponentFixture<NgxUpdateAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxUpdateAppComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(NgxUpdateAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

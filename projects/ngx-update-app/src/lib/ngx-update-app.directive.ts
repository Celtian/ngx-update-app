import { Directive, OnInit } from '@angular/core';
import { NgxUpdateAppService } from './ngx-update-app.service';

@Directive({
  selector: '[ngxUpdateApp]',
  standalone: true
})
export class NgxUpdateAppDirective implements OnInit {
  constructor(private update: NgxUpdateAppService) {}

  public ngOnInit(): void {
    this.update.checkForUpdates();
  }
}

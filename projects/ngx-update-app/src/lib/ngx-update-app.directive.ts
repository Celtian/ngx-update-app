import { Directive, OnInit, inject } from '@angular/core';
import { NgxUpdateAppService } from './ngx-update-app.service';

@Directive({ selector: '[ngxUpdateApp]' })
export class NgxUpdateAppDirective implements OnInit {
  private readonly update = inject(NgxUpdateAppService);

  public ngOnInit(): void {
    this.update.checkForUpdates();
  }
}

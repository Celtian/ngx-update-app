import { Component } from '@angular/core';
import { NgxUpdateAppDirective } from '../../../ngx-update-app/src/public-api';
import { VERSION } from '../environments/version';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  hostDirectives: [NgxUpdateAppDirective]
})
export class AppComponent {
  public readonly title = 'ngx-update-app';
  public readonly version = VERSION;
}

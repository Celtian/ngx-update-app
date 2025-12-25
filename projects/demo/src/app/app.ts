import { Component } from '@angular/core';
import { NgxUpdateAppDirective } from 'ngx-update-app';
import { VERSION } from '../environments/version';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  hostDirectives: [NgxUpdateAppDirective]
})
export class App {
  public title = 'ngx-update-app';
  public version = VERSION;
}

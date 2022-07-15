import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slider } from './slider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slider],
})
export class AppComponent {
  title = 'chat-panel';

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation']
    );
  }
}

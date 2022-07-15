import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { delay } from 'rxjs';
import { SocketService } from './services/socket.service';
import { slider } from './slider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slider],
})
export class AppComponent {
  typeMessage = false;

  constructor(private socketService: SocketService, private router: Router) {
    this.socketService.connected.pipe(delay(500)).subscribe(() => {
      this.router.navigate(['queuing']);
    });
    this.socketService.pickuped.subscribe(() => {
      this.router.navigate(['chat-room']);
      this.typeMessage = true;
    });
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
}

import { Component, OnInit } from '@angular/core';
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
export class AppComponent implements OnInit {
  typeMessage = false;

  constructor(private socketService: SocketService, private router: Router) {
    this.socketService.connected.pipe(delay(500)).subscribe(({ name }) => {
      this.router.navigate(['queuing'], { skipLocationChange: true });
      sessionStorage.setItem('name', name);
    });
    this.socketService.pickuped.subscribe(() => {
      this.router.navigate(['chat-room'], { skipLocationChange: true });
      this.typeMessage = true;
    });
    this.socketService.disconnected.subscribe(() => {
      sessionStorage.removeItem('name');
      this.typeMessage = false;
    });
    this.socketService.endChat.subscribe(() => {
      this.socketService.disconnect();
    })
  }

  ngOnInit(): void {
    const sessionName = sessionStorage.getItem('name')
    if (sessionName) {
      this.socketService.connect(sessionName);
    } else {
      this.router.navigate(['tnc'], { skipLocationChange: true });
    }
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
}

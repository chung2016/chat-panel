import { Component, NgZone, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { delay } from 'rxjs';
import { CommonService } from './services/common.service';
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

  constructor(
    private socketService: SocketService,
    private router: Router,
    private commonService: CommonService,
    private ngZone: NgZone
  ) {
    this.socketService.connected.subscribe(() => {
      this.ngZone.run(() => {
        this.commonService.bc.postMessage({ type: 'connection' });
        this.router.navigate(['queuing'], { skipLocationChange: true });
      });
    });
    this.socketService.recivedMessage.subscribe((msg) => {
      this.ngZone.run(() => {
        this.router.navigate(['chat-room'], { skipLocationChange: true });
        this.commonService.pushChatMessage(msg);
        this.typeMessage = true;
      });
    });
    this.socketService.pickuped.subscribe(() => {
      this.ngZone.run(() => {
        this.router.navigate(['chat-room'], { skipLocationChange: true });
        this.typeMessage = true;
      });
    });
    this.socketService.disconnected.subscribe(() => {
      this.ngZone.run(() => {
        localStorage.removeItem('name');
        this.typeMessage = false;
      });
    });
    this.socketService.endChat.subscribe(() => {
      this.ngZone.run(() => {
        this.socketService.disconnect();
        this.typeMessage = false;
      });
    });
    this.commonService.connectionSync.subscribe(() => {
      const name = localStorage.getItem('name');
      if (name) this.socketService.connect(name);
    });
    this.commonService.resetSync.subscribe(() => {
      this.ngZone.run(() => {
        this.commonService.resetMessage();
        this.router.navigate(['name-form'], { skipLocationChange: true });
        this.typeMessage = false;
      });
    });
  }

  ngOnInit(): void {
    const sessionName = localStorage.getItem('name');
    if (sessionName) {
      this.socketService.connect(sessionName);
    } else {
      this.router.navigate(['name-form'], { skipLocationChange: true });
      this.commonService.bc.postMessage({ type: 'reset' });
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

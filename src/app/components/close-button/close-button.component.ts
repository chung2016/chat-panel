import { Component, OnInit } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-close-button',
  templateUrl: './close-button.component.html',
  styleUrls: ['./close-button.component.scss'],
})
export class CloseButtonComponent implements OnInit {
  faXmark = faXmark;
  
  constructor(private socketService: SocketService) {}

  ngOnInit(): void {}

  close() {
    const name = localStorage.getItem('name');
    if (!name) {
      return;
    }
    this.socketService.closeChat(name);
  }
}

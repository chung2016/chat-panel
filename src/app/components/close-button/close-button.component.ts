import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-close-button',
  templateUrl: './close-button.component.html',
  styleUrls: ['./close-button.component.scss'],
})
export class CloseButtonComponent implements OnInit {
  faXmark = faXmark;
  @Output() close = new EventEmitter();
  
  constructor(private socketService: SocketService) {}

  ngOnInit(): void {}

  handleClick() {
    this.close.emit();
    const name = localStorage.getItem('name');
    if (!name) {
      return;
    }
    this.socketService.closeChat(name);
  }
}

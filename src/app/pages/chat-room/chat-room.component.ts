import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit {

  messages: any[] = [];

  constructor(private socketService: SocketService) {
    this.socketService.recivedMessage.subscribe((msg) => {
      this.messages.push(msg);
    });
  }

  ngOnInit(): void {
  }

}

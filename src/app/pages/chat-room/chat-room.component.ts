import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
})
export class ChatRoomComponent implements OnInit {
  messages: any[] = [];

  constructor(private commonService: CommonService) {
    this.commonService.onChatMessages().subscribe((msg) => (this.messages = msg));
  }

  ngOnInit(): void {}
}

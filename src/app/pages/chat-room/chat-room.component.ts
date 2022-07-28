import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
})
export class ChatRoomComponent implements OnInit {
  messages$ = this.commonService.onChatMessages();
  myName = '';

  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    this.myName = localStorage.getItem('name') || '';
  }
}

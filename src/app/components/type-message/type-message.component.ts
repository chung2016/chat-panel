import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-type-message',
  templateUrl: './type-message.component.html',
  styleUrls: ['./type-message.component.scss'],
})
export class TypeMessageComponent implements OnInit {
  @Input() componentEnabled = false;

  typeMessageForm = new FormGroup({
    content: new FormControl({ value: '', disabled: this.componentEnabled }),
  });

  constructor(private socketService: SocketService) {}
  

  ngOnInit(): void {
    
  }

  send() {
    const content = this.typeMessageForm.get('content')?.value
    const name = sessionStorage.getItem('name');
    if (!content || !name) {
      return;
    }
    this.socketService.sendMessage(content, name);
    this.typeMessageForm.reset();
  }
}

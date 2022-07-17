import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  $chatMessages = new BehaviorSubject<any[]>([]);

  bc = new BroadcastChannel('chat-panel');
  connectionSync = new EventEmitter();
  resetSync = new EventEmitter();

  onChatMessages() {
    return this.$chatMessages.asObservable();
  }

  pushChatMessage(msg: any) {
    if (!this.$chatMessages.getValue().find(m => m.id === msg.id)) {
      this.$chatMessages.next([...this.$chatMessages.getValue(), msg]);
    }
  }

  resetMessage() {
    this.$chatMessages.next([]);
  }

  constructor() {
    this.bc.onmessage = (event) => {
      if (event.data.type === 'connection') {
        this.connectionSync.emit();
      } else if (event.data.type === 'reset') {
        this.resetSync.emit();
      }
    }
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  $chatMessages = new BehaviorSubject<any[]>([]);

  onChatMessages() {
    return this.$chatMessages.asObservable();
  }

  pushChatMessage(msg: any) {
    if (!this.$chatMessages.getValue().find(m => m.id === msg.id)) {
      this.$chatMessages.next([...this.$chatMessages.getValue(), msg]);
    }
  }

  constructor() {}
}

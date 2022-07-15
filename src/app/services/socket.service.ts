import { EventEmitter, Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  socket: Socket | null = null;

  attempts = 0;
  reconnectionAttempts = 3;
  connected = new EventEmitter();
  pickuped = new EventEmitter();
  recivedMessage = new EventEmitter();
  disconnected = new EventEmitter();
  endChat = new EventEmitter();

  constructor() {}

  disconnect() {
    if (!this.socket) {
      return;
    }
    this.socket.disconnect();
  }

  connect(name: string) {
    if (this.socket) {
      return;
    }
    this.socket = io(environment.serverUrl, {
      auth: { name },
      reconnectionAttempts: this.reconnectionAttempts,
      reconnectionDelay: 500,
    });
    this.socket.on('connect', () => {
      console.log('connect');
      this.connected.emit({ name });
    });
    this.socket.on('disconnect', (e) => {
      this.socket = null;
      console.log('disconnect', e);
      this.disconnected.emit();
    });
    this.socket.on('connect_error', (e) => {
      console.log('connect_error', e);
      this.attempts++;
      if (this.attempts > this.reconnectionAttempts) {
        this.disconnect();
      }
    });
    this.socket.on('pickup', (e) => {
      console.log('pickup', e);
      this.pickuped.emit();
    });
    console.log(this.socket.id);
    this.socket.on('chat message', (msg) => {
      console.log('chat message', msg);
      this.recivedMessage.emit(msg);
    });
    this.socket.on('end chat', () => {
      this.endChat.emit();
    })
  }

  sendMessage(content: string, name: string) {
    if (!!!this.socket) {
      return;
    }
    this.socket.emit('chat message', {
      username: name,
      userid: this.socket.id,
      content,
      room: name,
    });
  }

  closeChat(name: string) {
    if (!!!this.socket) {
      return;
    }
    this.socket?.emit('close chat', {
      name,
      socketid: this.socket.id,
    });
  }
}

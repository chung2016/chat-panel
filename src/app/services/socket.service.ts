import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  socket: Socket | null = null;

  constructor() {}

  disconnect() {
    this.socket?.disconnect();
  }

  connect(name: string) {
    this.socket = io(environment.serverUrl, {
      auth: { name },
    });
    this.socket.on('connect', () => {
      console.log('connect');
    });
    this.socket.on('disconnect', (e) => {
      this.socket = null;
      console.log('disconnect', e);
    });
    this.socket.on('connect_error', (e) => {
      console.log('disconnect', e);
    });
  }

  sendMessage() {}
}

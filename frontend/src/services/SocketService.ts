import { io, Socket } from 'socket.io-client';
import { Video } from '@/interfaces/interfaces';
class SocketioService {
  socket: Socket | null;

  constructor() {
    this.socket = null;
  }

  setupSocketConnection() {
    this.socket = io('http://localhost:3000');
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  on(eventName: string, callback: (args: Video[]) => void) {
    if (!this.socket) {
      throw new Error('Socket not initialized.');
    }

    this.socket.on(eventName, callback);
  }

  emit(eventName: string, data?: string) {
    if (!this.socket) {
      throw new Error('Socket not initialized.');
    }

    this.socket.emit(eventName, data);
  }
}

const socketioService = new SocketioService();
export default socketioService;

  
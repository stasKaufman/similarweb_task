const { Server } = require("socket.io");

class SocketIoService {
  constructor() {
    this.socket = null;
  }

  // set up a socket connection using an HTTP server.
  setupSocketConnection(httpServer) {
    this.socket = new Server(httpServer, {
      cors: {
        origin: "http://localhost:8080"
      }
    });
  }

  on(eventName, callback) {
    if (!this.socket) {
      throw new Error('Socket not initialized.');
  }

    this.socket.on(eventName, callback);
  }

  emit(eventName, data) {
    if (!this.socket) {
      throw new Error('Socket not initialized.');
  }

    this.socket.emit(eventName, data);
  }
}

module.exports = new SocketIoService()


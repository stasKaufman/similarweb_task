// external packages
const express = require('express');
const cors = require('cors');
const { createServer } = require("http");

// services
const io = require('./services/SocketService');
const redis = require('./services/RedisService');

// handlers
const { addNewVideo, removeVideo } = require('./handler/socket')
const { getAllVideos } = require('./handler/videoLists')
const { redisCallback } = require('./handler/redis')

const app = express();
const bodyParser = require('body-parser');

// subscribe to redis channel and init socket/http connection.
const startServer = async () => {

    redis.subscribeToChannel('videos_changed', redisCallback)
  
    const httpServer = createServer(app);
    io.setupSocketConnection(httpServer);
  
    const port = process.env.NODE_PORT || 3000;
  
    app.use(cors());
    app.use(bodyParser.json());
  
  // socket api.
  io.socket.on('connection', (socket) => {

      // add new video.
      try {
        socket.on('newURL', addNewVideo)
      } catch (error) {
        io.emit("server_error", error)
      }
      
      // remove video.
      try {
        socket.on('removeVideo', removeVideo)
      } catch (error) {
        io.emit("server_error", error)
      }

  })
  
    // http api.
    app.get('/api/playlist', getAllVideos);

    // main error handler
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send('Something broke!');
    });
  
    httpServer.listen(port, () => console.log(`server started on port ${port}`));
}
  
startServer();

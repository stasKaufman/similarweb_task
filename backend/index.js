// external packages
const express = require('express');
const cors = require('cors');
const { createServer } = require("http");

// services
const io = require('./services/SocketService');
const redis = require('./services/RedisService');
const youtube = require('./services/YouTubeAPIService');

// handlers
const { addNewVideo, removeVideo } = require('./handler/socket')
const { getAllVideos } = require('./handler/videoLists')
const { redisCallback } = require('./handler/redis')

const app = express();
const bodyParser = require('body-parser');

// set API Key - In a real app this fetched and set on runtime.
let youTubeAPIKey = 'AIzaSyD_1oEq39N2CZn-bjpF9R6_FssZc5FMVyA';
// let youTubeAPIKey = null;
youtube.setAPIKey(youTubeAPIKey);

// subscribe to redis channel and init socket/http connection.
const startServer = async () => {

  redis.subscribeToChannel('videos_changed', redisCallback)

  const httpServer = createServer(app);
  io.setupSocketConnection(httpServer);

  const port = process.env.NODE_PORT || 3000;

  app.use(cors());
  app.use(bodyParser.json());
  
  // socket api.
  io.on('connection', (socket) => {

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

  // 
  if (!youtube.getAPIKey()) {
    throw new Error('API key does not exist')
  }


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

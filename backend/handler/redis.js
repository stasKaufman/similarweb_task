const io = require('../services/SocketService');
const redis = require('../services/RedisService');
const redisClient = redis.getStorageClient();

// if one of the clients modify the video array we notify all client (from all servers)
const redisCallback = async () => {
    let videos
    try {
        videos = await redisClient.get('videos');
    } catch (error) {
        io.emit('server_error', error);
        return;
    }
    videos = JSON.parse(videos);
    io.emit('newList', videos);
}

module.exports = {redisCallback}
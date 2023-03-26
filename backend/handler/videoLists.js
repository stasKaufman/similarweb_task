const redis = require('../services/RedisService');
let redisClient = redis.getStorageClient();

let getAllVideos = async (req, res, next) => {
    let videos
    try {
        // get updated list from redis and return to the client.
        videos = await redisClient.get('videos');
        videos = JSON.parse(videos);
        // in case list empty.
        if (!videos) {
            videos = []   
        }
    } catch (error) {
        return next(error)
    }

    res.json(videos)
}

module.exports = { getAllVideos }
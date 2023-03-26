/*
This module add OR remove video from the redis storage and notify all the other users.
it's doing it with redis pub/sub & websocket for live updates.
*/
const youtube = require('../services/YouTubeAPIService');
const redis = require('../services/RedisService');
// get redis clients.
const redisClient = redis.getStorageClient();
const redisClientPub = redis.getPublisher();
// Set the API key for the YouTubeAPIService.
youtube.setAPIKey('AIzaSyD_1oEq39N2CZn-bjpF9R6_FssZc5FMVyA');


const addNewVideo = async (url) => {
    let videoInfo
    try {
        videoInfo = await youtube.getVideoInfo(url);
    } catch (error) {
        throw new Error('Failed to get video info from Youtube api')
    }
    
    let videos
    try {
        videos = await redisClient.get('videos');
    } catch (error) {
        throw new Error('Failed to get video from redis.')
    }
    
    videos = JSON.parse(videos);
    let videoInfoObject = {
        name: videoInfo.title, 
        duration: videoInfo.duration, 
        videoId: videoInfo.videoId
    }
    if (videos) {
        videos.push(videoInfoObject)    
    } else {
        videos = [videoInfoObject]
    }

    try {
        await redisClient.set('videos', JSON.stringify(videos));
        await redisClientPub.publish('videos_changed', 'add')
    } catch (error) {
        throw new Error('Failed to set video & publish video with redis.')
    }
}

const removeVideo = async (videoId) => {
    let videos
    try {
        videos = await redisClient.get('videos');
    } catch (error) {
        throw new Error('Failed to get video')
    }
    videos = JSON.parse(videos);
    let videoIndex = videos.findIndex((video) => {
        return video.videoId === videoId
    });
    // if video not found it meant it already been deleted.
    if (videoIndex != -1) {
        videos.splice(videoIndex, 1);
    }

    try {
        await redisClient.set('videos', JSON.stringify(videos));
        await redisClientPub.publish('videos_changed', 'remove');
    } catch (error) {
        throw new Error('Failed to set video')
    }
}

module.exports = {addNewVideo, removeVideo}
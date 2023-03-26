/*
This module add OR remove video from the redis storage and notify all the other users.
it's doing it with redis pub/sub & websocket for live updates.
*/
const youtube = require('../services/YouTubeAPIService');
const redis = require('../services/RedisService');
// get redis clients.
const redisClient = redis.getStorageClient();
const redisClientPub = redis.getPublisher();



const addNewVideo = async (url) => {
    let videoInfo = await _getVideoInfo(url)
    let videos = await _getStoredVideosArray()

    // if array empty create one, if not push to existing.
    if (videos) {
        videos.push(videoInfo)    
    } else {
        videos = [videoInfo]
    }

    // notify all about the change.
    try {
        await redisClient.set('videos', JSON.stringify(videos));
        await redisClientPub.publish('videos_changed', 'add')
    } catch (error) {
        throw new Error('Failed to set video & publish video with redis.', error)
    }
}

const removeVideo = async (videoId) => {
    let videos = await _getStoredVideosArray()

    let videoIndex = videos.findIndex((video) => {
        return video.videoId === videoId
    });

    // if video not found it meant it already been deleted.
    if (videoIndex != -1) {
        videos.splice(videoIndex, 1);
    }

    // notify all about the change.
    try {
        await redisClient.set('videos', JSON.stringify(videos));
        await redisClientPub.publish('videos_changed', 'remove');
    } catch (error) {
        throw new Error('Failed to set video & publish video with redis.', error)
    }
}

const _getStoredVideosArray = async () => {
    let videos
    try {
        videos = await redisClient.get('videos');
    } catch (error) {
        throw new Error('Failed to get video from redis.', error)
    }
    return videos = JSON.parse(videos);
}

const _getVideoInfo = async (url) => {
    let videoInfo;
    try {
        videoInfo = await youtube.getVideoInfo(url);
    } catch (error) {
        throw new Error('Failed to get video info from Youtube api', error)
    }
    let videoInfoObject = {
        name: videoInfo.title, 
        duration: videoInfo.duration, 
        videoId: videoInfo.videoId
    }
    return videoInfoObject
}

module.exports = {addNewVideo, removeVideo}
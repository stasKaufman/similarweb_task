/*
This module uses the Google API Client Library for JavaScript to access 
the YouTube Data API v3. The module exports a class called YoutubeAPI.
*/
const { google } = require('googleapis');
const youtube = google.youtube('v3');

class YoutubeAPI {
  constructor() {
      this.apiKey = null;
      this.youtube = youtube;
  }

  setAPIKey (apiKey) {
    this.apiKey = apiKey;
  }

  getAPIKey () {
    return this.apiKey;
  }

  formatDuration(duration) {
    const match = duration.match(/^PT((\d+)H)?((\d+)M)?((\d+)S)?$/);
    if (!match) {
      throw new Error('Invalid duration format');
    }
    
    const hours = parseInt(match[2]) || 0;
    const minutes = parseInt(match[4]) || 0;
    const seconds = parseInt(match[6]) || 0;
    
    let formattedDuration = '';
    
    if (hours > 0) {
      formattedDuration += hours.toString().padStart(2, '0') + ':';
    }
    
    formattedDuration += minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
    return formattedDuration;
  }
  

  async getVideoInfo(url) {
    try {
      const params = new URLSearchParams(new URL(url).search);
      const videoId = params.get("v");
      const response = await this.youtube.videos.list({
        key: this.apiKey,
        part: 'snippet,contentDetails',
        id: videoId,
      });
      try {
        const video = response.data.items[0];
        const title = video.snippet.title;
        const duration = this.formatDuration(video.contentDetails.duration);
        return { title, duration, videoId };
        } catch (error) {
          return new Error(error)
        }
      } catch (error) {
        return new Error('Unable to fetch video info from Youtube.', error);
      }
  }
}

module.exports = new YoutubeAPI()
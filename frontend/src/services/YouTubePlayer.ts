import YouTubePlayer from 'youtube-player';
import SocketioService from './SocketService';

enum events {
  ENDED,
  PLAYING,
  PAUSED
}

class YoutubeVideoPlayer {
  player;
  isVideoPlaying: boolean;

  constructor(element: HTMLElement) {
    // Create a new YouTubePlayer instance, disable control buttons (skip/seek etc..)
    this.player = YouTubePlayer(element, {
      playerVars: {
        autoplay: 1,
        controls: 0
      },
    });

    this.isVideoPlaying = false;

    this.setEvent();
  }

  setEvent() {
    // if video still playing we wont remove it. just when it finish.
    this.player.on('stateChange', (event: any) => {
      const videoData = event.target.getVideoData();

      if (event.data === events.ENDED) {
        SocketioService.emit('removeVideo', videoData.video_id);
        this.isVideoPlaying = false;
      }

      if (event.data === events.PLAYING || event.data === events.PAUSED) {
        this.isVideoPlaying = true;
      }
    });
  }

  setVideoId(videoId: string) {
    this.player.loadVideoById(videoId);
  }

  playNextVideo(videoId: string) {
    if (!this.isVideoPlaying) {
      this.player.loadVideoById(videoId);
    }
  }
}

export default YoutubeVideoPlayer;

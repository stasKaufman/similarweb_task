<template>
  <div>
    <div class="player" ref="player"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import YouTubeVideoPlayer from '@/services/YouTubePlayer';
import  { Video } from '@/interfaces/interfaces';

export default defineComponent({
  data() {
    return {
      player: null as YouTubeVideoPlayer | null,
    };
  },
  mounted() {
    this.player = new YouTubeVideoPlayer(this.$refs.player as HTMLElement);
    // Setting the first video in the playlist as the current video if the playlist is not empty
    if (this.playList.length) this.player.setVideoId(this.playList[0].videoId);
  },
  computed: {
    playList(): Video[] {
      return this.$store.getters.playList;
    },
  },
  methods: {
    playNextVideo(newList: Video[]) {
      let nextVideo = newList[0];
      if (nextVideo) {
        this.player?.playNextVideo(nextVideo.videoId);
      }
    },
  },
  watch: {
    // when the server sent new list we play the next video.
    playList(newList: Video[]) {
      this.playNextVideo(newList);
    },
  },
});
</script>

<style>
.player {
  min-height: 500px;
}

</style>

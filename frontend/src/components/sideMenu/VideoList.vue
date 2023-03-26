<template>
  <div class="video-items">
    <VideoItem v-for="video in playlist"
      :name="video.name"
      :duration="video.duration"
      :key="video.videoId"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VideoItem from './VideoItem.vue';
import SocketioService from '../../services/SocketService';
import { Video } from '../../interfaces/interfaces';

export default defineComponent({
  components: {
    VideoItem,
  },
  created() {
    // if new video is add, we notify the server, and the server(s) notify all the rest.
    SocketioService.on('newList', (videos: Video[]) => {
      this.$store.dispatch('updatePlayList', videos);
    });
  },
  computed: {
    playlist(): Video[] {
      return this.$store.getters.playList;
    },
  },
});
</script>

<style scoped>
.video-items {
  overflow-y: auto;
  height: 445px;
  margin-top: 10px;
}
</style>

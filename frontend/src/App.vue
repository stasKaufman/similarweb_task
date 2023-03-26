<template>
<div class="app-container">
  <div class="side-menu">
    <SideMenu></SideMenu>
  </div>
  <div class="youtube-player">
    <YoutubePlayer></YoutubePlayer>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import YoutubePlayer from './components/youtubePlayer/YoutubePlayer.vue';
import SideMenu from './components/sideMenu/SideMenu.vue';
import SocketService from './services/SocketService';

export default defineComponent({
  name: 'App',
  components: {
    YoutubePlayer,
    SideMenu
  },
  async created () {
    // Sets up a socket connection & load videos.
    SocketService.setupSocketConnection();
    await this.$store.dispatch('getPlayList');
    // Print to the console if the server throw error
    SocketService.on('server_error', (error) => console.error(error))
  },
  unmounted () {
    // Disconnects the socket connection when the component is unmounted
    SocketService.disconnect();
  }
});
</script>

<style scoped>

.app-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 12px;
}

</style>

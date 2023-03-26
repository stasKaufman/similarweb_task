<template>
  <div class="input-container">
    <el-input placeholder="URL..." v-model="url"></el-input>
    <el-button @click="submit" type="primary">Add</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SocketioService from '../../services/SocketService';

export default defineComponent({
  data() {
    return {
      url: '',
    };
  },
  methods: {
    submit() {
      // validate that input is youtube domain. 
      if (this.isYoutubeUrl(this.url)) {
        SocketioService.emit('newURL', this.url);
      }
      this.url = '';
    },
    isYoutubeUrl(input: string) {
      try {
        const url = new URL(input);
        return url.hostname === 'www.youtube.com';
      } catch (_) {
        return false;
      }
    },
  },
});
</script>

<style scoped>
.input-container {
  display: flex;
  gap: 6px;
}

</style>

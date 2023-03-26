<template>
  <div class="container">
    <InputMenu class="input"></InputMenu>
    <VideoList class="list"></VideoList>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import InputMenu from './InputMenu.vue';
import VideoList from './VideoList.vue';

export default defineComponent({
  components: {
    InputMenu,
    VideoList
  }
});
</script>

<style scoped>
  .container {
    background-color: #e5e6eb;
    padding:6px;
    min-height: 485px;
    width: 310px;
  }
</style>

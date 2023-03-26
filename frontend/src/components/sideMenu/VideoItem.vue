<template>
  <div id="item">
    <div>{{ videoName }}</div>
    <div>{{ duration }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    name: String,
    duration: String,
  },
  computed: {
    videoName(): string {
      if (this.name && this.name.length > 30) {
        return this.name.slice(0, 31) + '...';
      }
      return this.name || '';
    },
  },
});
</script>

<style scoped>
#item {
  width: 93%;
  height: 32px;
  display: flex;
  justify-content: space-between;
  border: 2px solid #e3dcdc;
  align-items: center;
  padding: 4px;
  margin: 3px 3px;
  background-color: #d8dae4;
}
</style>

<script setup lang="ts">
import REDIRECTS_JSON from '@/router/redirects.json'
import { RouterLink } from 'vue-router'
</script>
<template>
  <div class="wrapper">
    <p>Redirect urls</p>
    <span v-for="(newPath, oldPath) in REDIRECTS_JSON" :key="newPath">
      <RouterLink :to="oldPath">{{ oldPath }}</RouterLink> - <span>{{ newPath }}</span>
    </span>
  </div>
</template>
<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;

  a {
    color: white;
  }
}
</style>

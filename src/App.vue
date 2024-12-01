<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { computed } from 'vue'

const router = useRouter()
const routes = computed(() => router.getRoutes().filter((route) => route.components))
</script>
<template>
  <header>
    <nav class="wrapper">
      <RouterLink v-for="route in routes" :key="route.path" class="item" :to="route.path">
        {{ route.name }}
      </RouterLink>
      <span class="current-date">{{ $date(new Date()) }}</span>
    </nav>
  </header>
  <RouterView />
</template>
<style lang="scss" scoped>
.wrapper {
  display: flex;
  gap: 0.5rem;
}

.item {
  border-radius: 0.5rem;
  background-color: #eeeeee;
  color: black;
  padding: 0.5rem 1rem;
}

header {
  margin-bottom: 2rem;
}

.current-date {
  margin-left: auto;
}
</style>

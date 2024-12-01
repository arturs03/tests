<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{ list?: string[] }>()

const emit = defineEmits<{
  (e: 'search', item: string): void
  (e: 'selected', item: string): void
}>()

function setPickedItem(e: MouseEvent | KeyboardEvent) {
  const target = e.target as HTMLElement
  if (!target) {
    return
  }

  if (target.className.includes('suggested-list__item')) {
    emit('selected', target.innerHTML)
  }
}

function handleInput(e: KeyboardEvent) {
  const target = e.target as HTMLInputElement
  if (!target) {
    return
  }

  const value = target.value
  debounce(() => emit('search', value))
}

const timeout = ref<number | undefined>(0)
function debounce(callback: () => void) {
  if (timeout.value) {
    clearTimeout(timeout.value)
  }

  timeout.value = setTimeout(() => {
    callback()
    timeout.value = undefined
  }, 400)
}
</script>
<template>
  <div class="search-input">
    <input type="text" @keyup="handleInput" placeholder="Search..." data-test="search-input" />
    <div class="suggested-wrapper">
      <div
        v-show="props.list?.length"
        class="suggested-list"
        @click="setPickedItem"
        @keyup.enter="setPickedItem"
      >
        <span
          v-for="(suggestion, index) in props.list"
          :key="index"
          v-focusable
          class="suggested-list__item"
        >
          {{ suggestion }}
        </span>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.search-input {
  max-width: 18.75rem;
  width: 100%;

  input {
    width: 100%;
    border-radius: 0.5rem;
    height: 2rem;
    border: unset;
    padding: 0.25rem 0.5rem;
  }

  .suggested-wrapper {
    position: relative;
  }

  .suggested-list {
    position: absolute;
    top: 0;
    left: 0;
    box-shadow: 5px 5px black;
    border-radius: 0.5rem;
    width: 100%;
    max-height: 18.75rem;
    background-color: white;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    color: black;
    overflow-y: scroll;

    &__item {
      list-style: unset;
      border-bottom: 1px solid transparent;

      &:hover {
        cursor: pointer;
        border-bottom: 1px solid black;
      }
    }
  }
}
</style>

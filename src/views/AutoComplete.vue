<script setup lang="ts">
import SearchInput from '@/components/SearchInput.vue'
import { WORDS_LIST } from '@/constants'
import { ref } from 'vue'

const suggestionList = ref<string[]>([])
const selectedItems = ref<Set<string>>(new Set())

function searchItem(input: string) {
  if (!input.length) {
    suggestionList.value = []

    return
  }

  suggestionList.value = WORDS_LIST.filter((item) => item.startsWith(input))
}

function addItem(item: string) {
  selectedItems.value.add(item)
}

function removeItem(e: MouseEvent | KeyboardEvent) {
  const target = e.target as HTMLElement

  if (!target) {
    return
  }

  const value = target.innerText
  if (selectedItems.value.has(value)) {
    selectedItems.value.delete(value)
  }
}
</script>
<template>
  <div class="wrapper">
    <SearchInput :list="suggestionList" @search="searchItem" @selected="addItem" />
    <div v-if="selectedItems?.size" class="pills" @click="removeItem" @keyup.enter="removeItem">
      <span v-for="item in selectedItems" :key="item" v-focusable class="pills__item">
        {{ item }}
      </span>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.wrapper {
  color: white;
  display: flex;
}

.pills {
  max-width: 400px;
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;

  &__item {
    border-radius: 0.75rem;
    border: 1px solid white;
    padding: 0.5rem 1rem;

    &:hover,
    &:focus {
      cursor: pointer;
      background-color: rgba(255, 0, 0, 0.232);
    }
  }
}
</style>

<template>
  <div
    v-if="entryIcon"
    :data-icon="name"
    class="flex icon-wrapper items-center justify-center"
    :class="[proxySize]"
    v-html="entryIcon"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import icons from './icons.js'

const sizeList = {
  xs: 'h-4 w-4',
  sm: 'h-5 w-5',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-10 w-10',
  none: ''
}

interface Props {
  name: string
  size?: keyof typeof sizeList
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md'
})

const proxySize = computed(() => props.size && sizeList[props.size])
const entryIcon = computed(() => props.name && (icons as { [key: string]: string })[props.name])
</script>

<style scoped>
.icon-wrapper :deep(svg) {
  width: 100%;
  height: 100%;
}
</style>

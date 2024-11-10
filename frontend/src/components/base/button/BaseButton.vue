<template>
  <button
    class="relative inline-flex items-center focus:outline-none transition duration-150 ease-in-out select-none"
    :class="[
      proxyRounded,
      proxyJustify,
      proxySize,
      proxyTheme,
      (disabled || loading) && 'opacity-70 pointer-events-none'
    ]"
    :type="type"
    :disabled="disabled || loading"
  >
    <span class="inline-flex items-center truncate" :class="loading && 'opacity-0'">
      <slot />
    </span>
    <span v-if="loading" class="absolute inset-0 flex items-center justify-center">
      <BaseSpinner />
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue'
import { themes, sizes, justify as justifyMap, rounded as roundedMap } from './themes'
import type { Look, Theme } from './themes'

const props = defineProps({
  loading: Boolean,
  disabled: Boolean,
  rounded: {
    type: String as PropType<keyof typeof roundedMap>,
    default: 'xl'
  },
  look: {
    type: String as PropType<Look>,
    default: 'solid'
  },
  theme: {
    type: String as PropType<Theme>,
    default: 'primary'
  },
  size: {
    type: String as PropType<keyof typeof sizes>,
    default: 'md'
  },
  type: {
    type: String as PropType<'button' | 'submit' | 'reset' | undefined>,
    default: 'button'
  },
  justify: {
    type: String as PropType<keyof typeof justifyMap>,
    default: 'center'
  }
})

const proxyTheme = computed(() => props.theme && props.look && themes[props.look][props.theme])

const proxySize = computed(() => props.size && sizes[props.size])

const proxyRounded = computed(() => props.size && props.rounded && roundedMap[props.rounded])
const proxyJustify = computed(() => props.justify && justifyMap[props.justify])
</script>

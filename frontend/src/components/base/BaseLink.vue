<template>
  <template v-if="to">
    <RouterLink :class="[proxyClass, proxyWeight, proxyTheme]" :to="to">
      <slot />
    </RouterLink>
  </template>
  <template v-else>
    <a :class="[proxyClass, proxyWeight, proxyTheme]" :target="target" :href="href">
      <slot />
    </a>
  </template>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { RouteLocationRaw } from 'vue-router'
import type { PropType } from 'vue'
import { RouterLink } from 'vue-router'

const themes = {
  black: 'text-black hover:text-gray-600 active:text-gray-600 transition duration-150',
  dark: 'text-gray-900 hover:text-gray-600 active:text-gray-600 transition duration-150',
  light: 'text-gray-500 hover:text-gray-400 active:text-gray-600 transition duration-150',
  white: 'text-gray-100 hover:text-gray-300 active:text-gray-400 transition duration-150',
  primary: 'text-primary hover:text-primary-800 active:text-primary-900 transition duration-150',
  success: 'text-green-500 hover:text-green-400 active:text-green-600 transition duration-150',
  destructive: 'text-red-500 hover:text-red-400 active:text-red-600 transition duration-150',
  info: 'text-blue-500 hover:text-blue-400 active:text-blue-600 transition duration-150'
} as { [key: string]: string }

const weights = {
  light: 'font-light',
  normal: 'font-normal',
  semibold: 'font-semibold',
  bold: 'font-bold',
  black: 'font-black'
} as { [key: string]: string }

const props = defineProps({
  to: {
    type: [Object, String] as PropType<RouteLocationRaw>,
    default: undefined
  },
  href: {
    type: String,
    default: ''
  },
  theme: {
    type: [String],
    default: 'primary'
  },
  weight: {
    type: [String],
    default: 'normal'
  },
  target: {
    type: String,
    default: '_self'
  },
  proxyClass: {
    type: String,
    default: 'inline-flex items-center'
  }
})

const proxyTheme = computed(() => props.theme && themes[props.theme])
const proxyWeight = computed(() => props.weight && weights[props.weight])
</script>

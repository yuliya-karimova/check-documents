<template>
  <div class="fixed z-40 inset-0 overflow-y-auto" :class="!isOpen && 'pointer-events-none hidden'">
    <div
      class="flex items-end justify-center min-h-screen pt-4 sm:block sm:p-0 text-center"
      :class="[!fullscreen && 'px-4 pb-20']"
    >
      <transition
        enter-active-class="ease-out duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="ease-out duration-300"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isOpen"
          class="fixed inset-0 flex items-center justify-center"
          :class="bgClass"
          aria-hidden="true"
          @click="close"
        >
          <BaseSpinner v-if="isLoading" class="text-white" size="xl" />
        </div>
      </transition>

      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
        &#8203;
      </span>

      <transition
        enter-active-class="transition ease-out transform"
        enter-from-class="translate-y-10 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition ease-out transform"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-10 opacity-0"
      >
        <template v-if="displayOnLoading || (isOpen && !isLoading)">
          <div
            v-show="isOpen && !isLoading"
            class="relative inline-block text-left align-bottom bg-white shadow-xl safe-padding-bottom transform sm:my-8 sm:align-middle w-full"
            :class="[proxySize, fullscreen ? 'rounded-t-xl sm:rounded-b-xl' : 'rounded-xl']"
          >
            <slot name="header">
              <div class="flex justify-between items-center px-6 h-16 border-b">
                <div class="text-2xl font-bold leading-6 text-gray-900 truncate">
                  {{ title }}
                </div>
                <BaseButton theme="white" size="sm" class="w-8 !p-0" @click="close">
                  <BaseIcon name="outline_x" />
                </BaseButton>
              </div>
            </slot>
            <slot name="body">
              <div class="p-6">
                <slot />
              </div>
            </slot>
          </div>
        </template>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const sizes = {
  xs: 'max-w-xs',
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-screen-sm',
  '2xl': 'max-w-screen-md'
}

interface Props {
  isOpen: boolean
  title?: string
  isLoading?: boolean
  size?: keyof typeof sizes
  bgClass?: any
  fullscreen?: boolean
  displayOnLoading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
  bgClass: 'bg-gray-500 bg-opacity-75 transition-opacity',
  title: '',
  isLoading: false,
  size: 'md',
  fullscreen: false,
  displayOnLoading: false
})

const emit = defineEmits(['close'])
const proxySize = computed(() => props.size && sizes[props.size])

const close = () => {
  emit('close')
}
</script>

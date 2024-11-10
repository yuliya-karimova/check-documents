<template>
  <main class="flex justify-center flex-1 py-12 lg:py-20 px-4 lg:px-8 bg-gray-900">
    <HomeBlock />
  </main>

  <footer class="flex justify-center px-4 lg:px-8 py-8 bg-gray-900">
    <div class="max-w-screen-xl w-full">
      <img alt="Косатка Analytics" class="w-28 h-auto mx-auto" src="/logo_white.svg" />
    </div>
  </footer>

  <div class="fixed bottom-10 right-10">
    <BaseButton
      theme="white"
      rounded="full"
      class="h-14 w-14 !p-0"
      :class="scrollHeight > 10 ? 'opacity-100' : 'opacity-0'"
      @click="scrollToTop"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
        />
      </svg>
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import BaseButton from '@/components/base/button/BaseButton.vue'
import HomeBlock from './components/HomeBlock.vue';

const scrollHeight = ref(0)

const updateScroll = () => {
  scrollHeight.value = window.scrollY || document.documentElement.scrollTop
}

const scrollToTop = () => {
  window.scrollTo({ left: 0, top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', updateScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScroll)
})
</script>

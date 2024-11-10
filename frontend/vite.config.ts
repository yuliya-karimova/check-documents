import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { VueUseComponentsResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  // base: '/dist/',
  plugins: [
    vue(),
    Components({
      resolvers: [VueUseComponentsResolver()],
      dts: true         
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    sourcemap: true,
    outDir: 'dist', // Путь к директории, куда будет производиться сборка
    emptyOutDir: true // Очистка директории перед сборкой
  },
  server: {
    port: 3000,
  }
})


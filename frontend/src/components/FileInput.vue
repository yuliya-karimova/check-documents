<template>
  <div class="file-upload">
    <input
      type="file"
      accept=".docx,.pdf"
      @change="onFileChange"
      class="bg-primary-700 hover:bg-primary-600 transition p-2 rounded-xl text-white cursor-pointer"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['uploaded'])
const selectedFile = ref<File | null>(null)

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files ? target.files[0] : null
  if (file) {
    selectedFile.value = file
    emit('uploaded', file) // Передаём файл, а не текст
  }
}
</script>

<style scoped>
.file-upload {
  display: flex;
  gap: 1rem;
  align-items: center;
}
</style>

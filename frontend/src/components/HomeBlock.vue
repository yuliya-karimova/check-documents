<template>
  <div class="max-w-screen-xl w-full flex flex-col gap-20">
    <!-- главная -->
    <div
      class="flex flex-col sm:flex-row items-center gap-6 lg:gap-12 font-mont max-sm:text-center"
    >
      <h1 class="text-2xl sm:text-2xl lg:text-3xl uppercase font-bold text-white">
        Контроль и управление изменениями в тендерных закупках
      </h1>
    </div>

    <!-- анализ -->
    <div class="flex flex-col gap-12">
      <div class="flex gap-6 items-end flex-wrap">
        <div>
          <div class="text-white mb-2">Спецификация (UC-number)</div>
          <FileInput @uploaded="onFileUploadUC" />
        </div>
        <div>
          <div class="text-white mb-2">Техническая документациия (SSTS-number)</div>
          <FileInput @uploaded="onFileUploadSSTS" />
        </div>
        <BaseButton
          theme="secondary"
          class="h-[46px]"
          :disabled="!ucFile || !sstsFile"
          @click="checkCase"
        >
          Проанализировать
        </BaseButton>
      </div>

      <!-- анимация текста проверки -->
      <div v-if="isChecking">
        <div class="text-white mb-2 opacity-45">Пожалуйста, подождите, обработка занимает 40-50 секунд:</div>

        <div class="text-white font-bold">
          {{ checkingText }}
        </div>
      </div>

      <!-- результаты -->
      <div v-else-if="checkResult" class="flex flex-col gap-24">
        <div>
          <div class="text-3xl font-bold text-accent-500 mb-6">Результаты анализа</div>
          <MarkdownBlock :content="checkResult" />
        </div>

        <div v-if="docxUrl && pdfUrl && !isChecking">
          <div class="text-xl font-bold text-accent-500 mb-4">
            Также можно скачать результаты проверки в PDF, Docx и CSV:
          </div>
          <div class="flex items-center gap-2">
            <!-- Ссылка для скачивания DOCX -->
            <a :href="docxUrl" target="_blank" download>
              <BaseButton theme="primary"> Скачать DOCX </BaseButton>
            </a>
            <!-- Ссылка для скачивания PDF -->
            <a :href="pdfUrl" target="_blank" download>
              <BaseButton theme="primary"> Скачать PDF </BaseButton>
            </a>
            <!-- Ссылка для скачивания csv -->
            <a v-if="csvUrl" :href="csvUrl" target="_blank" download>
              <BaseButton theme="secondary"> Скачать отчет CSV </BaseButton>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCheckStore } from '@/stores/check'
import BaseButton from '@/components/base/button/BaseButton.vue'
import MarkdownBlock from '@/components/MarkdownBlock.vue'
import FileInput from '@/components/FileInput.vue'

const ucFile = ref<File | null>(null) // Файл для UC-number
const sstsFile = ref<File | null>(null) // Файл для SSTS-number

const onFileUploadUC = (file: File) => {
  ucFile.value = file // Сохраняем файл UC-number
}

const onFileUploadSSTS = (file: File) => {
  sstsFile.value = file // Сохраняем файл SSTS-number
}

const isChecking = ref<boolean>(false)
const checkingText = ref('')
const checkResult = ref('')

const docxUrl = ref('')
const pdfUrl = ref('')
const csvUrl = ref('')

// Фразы пайплайна для отображения
const phrases = [
  'Обработка контекста для удаления нерелевантной информации...',
  'Формирование вопросов...',
  'Проверка контекста на релевантность...',
  'Создание цепочки рассуждений с помощью LlaMA...',
  'Работа RoBERTa , специально обученной для задачи определения текстовых отношений NLI...',
  'Пошаговая обработка ответа...',
  'Проверка, является ли ответ обоснованным на контексте...',
  'Суммация заключения...'
]

let phraseIndex = 0
let intervalId: ReturnType<typeof setInterval> | null = null

const startPhraseRotation = () => {
  intervalId = setInterval(() => {
    checkingText.value = phrases[phraseIndex]
    phraseIndex = (phraseIndex + 1) % phrases.length // Зацикливаем индекс
  }, 2000) // Интервал 2 секунды (можно изменить)
}

const stopPhraseRotation = () => {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}

const checkStore = useCheckStore()

const checkCase = async () => {
  if (!ucFile.value || !sstsFile.value) return // Проверяем, что оба файла загружены
  isChecking.value = true
  startPhraseRotation()

  const response = await checkStore.checkCase(ucFile.value, sstsFile.value)

  checkResult.value = response.full_text

  docxUrl.value = checkStore.getDownloadLink(response.docx_url)
  pdfUrl.value = checkStore.getDownloadLink(response.pdf_url)

  if (response.csv_url) {
    csvUrl.value = checkStore.getDownloadLink(response.csv_url)
  }

  isChecking.value = false
  stopPhraseRotation()
}
</script>

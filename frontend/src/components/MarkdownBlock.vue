<template>
  <div v-html="compiledMarkdown" class="markdown-body text-white"></div>
</template>

<script setup lang="ts">
import { parse } from 'marked'
import { computed } from 'vue'

interface Props {
  content?: string
}

const props = withDefaults(defineProps<Props>(), {
  content: ''
})

const compiledMarkdown = computed(() =>
  (parse(props.content) as string).replace(/<a /g, '<a target="_blank" ')
)
</script>

<style lang="scss">
/* Основные стили для Markdown */
.markdown-body h1,
.markdown-body h2,
.markdown-body h3,
.markdown-body h4,
.markdown-body h5,
.markdown-body h6 {
  margin: 1em 0 0.5em;
  padding: 0;
  font-weight: bold;
}

.markdown-body h1 {
  font-size: 1.75em;
}

.markdown-body h2 {
  font-size: 1.5em;
}

.markdown-body h3 {
  font-size: 1.25em;
}

.markdown-body h4 {
  font-size: 1em;
}

.markdown-body h5 {
  font-size: 0.875em;
}

.markdown-body h6 {
  font-size: 0.75em;
}

.markdown-body p {
  margin: 0 0 1em;
}

.markdown-body a {
  color: #0366d6;
  text-decoration: none;
}

.markdown-body a:hover {
  text-decoration: underline;
}

.markdown-body blockquote {
  margin: 0;
  padding: 0.5em 1em;
  color: #666;
  border-left: 0.25em solid #dfe2e5;
  background-color: #f9f9f9;
}

.markdown-body ul,
.markdown-body ol {
  margin: 0 0 1em 2em;
  padding: 0;
}

.markdown-body ul li,
.markdown-body ol li {
  margin-bottom: 0.5em;
  list-style-type: decimal;

  ul li {
    list-style-type: disc;
  }
}

.markdown-body code {
  font-family: Consolas, 'Liberation Mono', Menlo, Courier, monospace;
  font-size: 0.9em;
  padding: 0.2em 0.4em;
  background-color: #f8f8f8;
  border-radius: 3px;
}

.markdown-body pre {
  background-color: #f8f8f8;
  padding: 1em;
  border-radius: 3px;
  overflow: auto;
}

.markdown-body pre code {
  background: none;
  padding: 0;
}

.markdown-body table {
  width: 100%;
  border-collapse: collapse;
  margin: 1em 0;
}

.markdown-body table th,
.markdown-body table td {
  padding: 0.5em;
  border: 1px solid #dfe2e5;
}

.markdown-body table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.markdown-body img {
  max-width: 100%;
  height: auto;
}

.markdown-body hr {
  border: 0;
  border-top: 1px solid #dfe2e5;
  margin: 1em 0;
}

/* Media query for screens up to 640px */
@media (max-width: 640px) {
  .markdown-body h1 {
    font-size: 1.5em;
  }

  .markdown-body h2 {
    font-size: 1.25em;
  }

  .markdown-body h3 {
    font-size: 1em;
  }

  .markdown-body h4 {
    font-size: 0.875em;
  }

  .markdown-body h5 {
    font-size: 0.75em;
  }

  .markdown-body h6 {
    font-size: 0.625em;
  }

  table {
    font-size: 0.9em;
  }
}
</style>

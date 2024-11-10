<template>
  <div :class="hasError && 'has-error'" style="scroll-margin-top: calc(4rem + var(--sat))">
    <div class="space-y-4">
      <div>
        <div v-if="title" class="font-bold text-xl">
          {{ title }}
        </div>
        <div v-if="description" class="text-xs text-gray-500 mb-1 -mt-1 px-4">
          {{ description }}
        </div>
      </div>
      <div
        v-if="options && options.length"
        class="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6"
      >
        <BaseCheckbox
          v-for="option in options"
          :key="option.value"
          v-model="value"
          :label="option.label"
          :value="option.value"
          :disabled="props.disabled"
        />
      </div>
    </div>
    <div class="flex text-sm leading-4">
      <transition
        enter-active-class="transition-all duration-300"
        enter-from-class="transform -translate-y-3 opacity-0"
        enter-to-class="transform translate-y-0 opacity-100"
        leave-active-class="transition-all duration-300"
        leave-from-class="transform translate-y-0"
        leave-to-class="transform -translate-y-3 opacity-0"
      >
        <span v-if="hasError" class="text-red-600 mt-1 px-4">
          <slot name="error">
            {{ errorMessage }}
          </slot>
        </span>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, useSlots, computed, watch } from 'vue'
import type { RuleExpression } from 'vee-validate'
import { useSimpleInput } from './use-simple-input'
import type { OptionInterface } from './use-simple-input'
import BaseCheckbox from './BaseCheckbox.vue'

interface PropsInterface {
  title?: string
  description?: string
  modelValue?: Array<string | number>
  options: OptionInterface[]
  name?: string
  rules?: RuleExpression<string | number | object | boolean | any[] | null>
  error?: string
  disabled?: boolean
  required?: boolean
}

const props = withDefaults(defineProps<PropsInterface>(), {
  title: '',
  description: '',
  modelValue: () => [],
  options: () => [],
  name: '',
  rules: '',
  error: '',
  disabled: false,
  required: false
})

const emit = defineEmits(['update:modelValue', 'input'])

const { errorMessage, handleChange } = useSimpleInput(props, getCurrentInstance())

const slots = useSlots()
const hasError = computed(() => !props.disabled && (errorMessage.value || slots.error))

const value = computed({
  get() {
    return props.modelValue || []
  },
  set(newValue) {
    emit('update:modelValue', newValue)
    emit('input')

    handleChange(newValue, true)
  }
})

watch(
  () => props.modelValue,
  (value) => {
    handleChange(value, false)
  }
)
</script>

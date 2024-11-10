<template>
  <div
    class="relative"
    :class="hasError && 'has-error'"
    style="scroll-margin-top: calc(4rem + var(--sat))"
  >
    <label
      v-if="label"
      class="block text-md font-medium leading-5 mb-1"
      :class="[rounded === 'full' ? 'px-6' : 'px-4']"
    >
      {{ label }}
      {{ required ? '*' : '' }}
    </label>
    <div
      v-if="description"
      class="text-xs text-gray-500 mb-1 -mt-1"
      :class="[rounded === 'full' ? 'px-6' : 'px-4']"
    >
      {{ description }}
    </div>
    <div
      v-show="!hideInput"
      class="relative border transition duration-150 ease-in-out"
      :class="[
        !isFocused && !errorMessage && 'border-gray-300',
        isFocused && !errorMessage && 'border-blue-300',
        errorMessage && 'border-red-400',
        disabled && 'cursor-not-allowed',
        proxyInputShadow,
        proxyRounded,
      ]"
    >
      <div
        class="absolute inset-0 bg-clip-content"
        :class="[
          disabled ? disabledInputBackgroundClass : inputBackgroundClass,
          proxyRounded,
        ]"
      />
      <div class="relative flex items-center">
        <div v-if="$slots.left" :class="[disabled && 'pointer-events-none']">
          <slot name="left" />
        </div>
        <div class="flex-1 overflow-hidden flex items-center">
          <input
            ref="inputEl"
            v-model="value"
            class="appearance-none bg-transparent flex-1 max-w-full h-10 placeholder-gray-400 focus:outline-none sm:text-sm sm:leading-5"
            :class="[
              disabled && 'pointer-events-none',
              $slots.left || rounded !== 'full' ? 'px-4' : 'px-6',
              proxyInputTextAlign,
              proxyRounded,
            ]"
            :name="name"
            :type="proxyType"
            :disabled="disabled"
            :maxlength="maxlength"
            :placeholder="placeholder"
            :min="min"
            :max="max"
            :step="step"
            :readonly="readonly"
            :autocomplete="autocomplete"
            aria-label=""
            v-on="handlers"
            @focus="isFocused = true"
            @blur="isFocused = false"
          />
        </div>

        <div
          v-if="$slots.right || type === 'password'"
          :class="[disabled && 'pointer-events-none']"
        >
          <slot name="right">
            <BaseButton
              v-if="type === 'password'"
              class="w-10 !p-0 rounded-l-none"
              look="link"
              theme="dark"
              rounded="md"
              @click="showPassword = !showPassword"
            >
              <BaseIcon
                :name="showPassword ? 'outline_eye_off' : 'outline_eye'"
                size="sm"
              />
            </BaseButton>
          </slot>
        </div>
      </div>
    </div>
    <div class="flex pt-px text-sm leading-4">
      <transition
        enter-active-class="transition-all duration-300"
        enter-from-class="transform -translate-y-3 opacity-0"
        enter-to-class="transform translate-y-0 opacity-100"
        leave-active-class="transition-all duration-300"
        leave-from-class="transform translate-y-0"
        leave-to-class="transform -translate-y-3 opacity-0"
      >
        <span
          v-if="hasError"
          class="text-red-600 mt-1"
          :class="[rounded === 'full' ? 'px-6' : 'px-4']"
        >
          <slot name="error">
            {{ errorMessage }}
          </slot>
        </span>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RuleExpression } from 'vee-validate'
import { useSimpleInput } from './use-simple-input'
import { computed, getCurrentInstance, nextTick, ref, useSlots, watch } from 'vue'

const shadow = {
  none: 'shadow-none',
  sm: 'shadow-sm',
  normal: 'shadow',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  '2xl': 'shadow-2xl',
  inner: 'shadow-inner',
}

const textAlign = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify',
}

const roundedMap = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  '3xl': 'rounded-3xl',
  full: 'rounded-full',
}

interface InputProps {
  modelValue?: string | number | null
  placeholder?: string
  description?: string
  type?: string
  label?: string
  disabled?: boolean
  hideInput?: boolean
  validateOnBlur?: boolean
  clearInput?: boolean
  name: string
  error?: string
  rules?: RuleExpression<boolean | object | string | number | any[] | null>
  required?: boolean
  readonly?: boolean
  step?: number | string
  max?: number | string
  min?: number | string
  maxlength?: number
  inputBackgroundClass?: string | string[] | Record<string, string>
  disabledInputBackgroundClass?: string | string[] | Record<string, string>
  inputShadow?: keyof typeof shadow
  rounded?: keyof typeof roundedMap
  inputTextAlign?: keyof typeof textAlign
  autocomplete?: string
}

const props = withDefaults(defineProps<InputProps>(), {
  modelValue: '',
  placeholder: '',
  description: '',
  type: 'text',
  label: '',
  disabled: false,
  hideInput: false,
  validateOnBlur: true,
  clearInput: false,
  error: '',
  rules: '',
  required: false,
  readonly: undefined,
  step: undefined,
  max: undefined,
  min: undefined,
  maxlength: undefined,
  inputBackgroundClass: '',
  disabledInputBackgroundClass: 'bg-gray-100',
  inputShadow: 'sm',
  rounded: 'xl',
  inputTextAlign: 'left',
  autocomplete: undefined,
})

const emits = defineEmits(['update:modelValue'])

const inputEl = ref<InstanceType<typeof HTMLInputElement> | null>(null)
const showPassword = ref(false)
const isFocused = ref(false)
const proxyType = computed(() => {
  if (props.type === 'password') {
    return showPassword.value ? 'text' : 'password'
  }

  return props.type
})
const proxyInputShadow = computed(
  () => props.inputShadow && shadow[props.inputShadow]
)
const proxyInputTextAlign = computed(
  () => props.inputTextAlign && textAlign[props.inputTextAlign]
)
const proxyRounded = computed(() => props.rounded && roundedMap[props.rounded])

const { errorMessage, value, handleChange, meta, validate } = useSimpleInput(
  props,
  getCurrentInstance()
)

const slots = useSlots()
const hasError = computed(
  () => !props.disabled && (errorMessage.value || slots.error)
)

watch(
  () => props.modelValue,
  (newValue) => {
    handleChange(newValue, false)
  }
)

const handlers = {
  input(event: any) {
    const value = props.clearInput
      ? event.target?.value.replace(
          /[^\p{sc=Han}а-яёa-z0-9!"#$%&'()*+,./:;<=>?@[\]^_`{|}~-]/gi,
          ''
        )
      : event.target?.value
    handleChange(value, false)
    emits('update:modelValue', value)
    meta.validated && validate()
  },
  blur() {
    props.validateOnBlur && validate()
  },
}

function focus() {
  nextTick(() => {
    inputEl.value?.focus?.()
  })
}

defineExpose({ focus })
</script>

<template>
  <label
    class="flex text-sm font-medium select-none cursor-pointer"
    :class="disabled && 'opacity-60 pointer-events-none'"
  >
    <input
      v-model="proxyChecked"
      type="checkbox"
      class="hidden"
      v-bind="$attrs"
      :disabled="disabled"
      aria-label=""
    />

    <span
      class="w-5 h-5 flex-shrink-0 border border-gray-300 shadow-sm rounded-md mr-3 flex justify-center items-center"
      :class="[backgroundClass, proxyChecked && proxyTheme]"
    >
      <BaseIcon v-if="proxyChecked" name="outline_check" size="xs" />
    </span>

    <div class="flex flex-col">
      <div class="block leading-5">
        <slot name="label">
          {{ label }}
          {{ required ? '*' : '' }}
        </slot>
      </div>
      <div v-if="description" class="text-xs font-normal text-gray-500">
        {{ description }}
      </div>
      <transition
        enter-active-class="transition-all duration-300"
        enter-from-class="transform -translate-y-3 opacity-0"
        enter-to-class="transform translate-y-0 opacity-100"
        leave-active-class="transition-all duration-300"
        leave-from-class="transform translate-y-0"
        leave-to-class="transform -translate-y-3 opacity-0"
      >
        <div
          v-if="!disabled && (currentErrorMessage || $slots.error)"
          class="text-red-600 mt-1"
        >
          <slot name="error">
            {{ currentErrorMessage }}
          </slot>
        </div>
      </transition>
    </div>
  </label>
</template>

<script setup lang="ts">
import { type PropType, computed, watch, ref, getCurrentInstance } from 'vue'
import { useSimpleInput } from './use-simple-input'
import type { RuleExpression } from 'vee-validate'

const themes = {
  primary: 'text-white !bg-accent-500 hover:bg-accent-800',
  success: 'text-white !bg-green-600 hover:bg-green-500',
  destructive: 'text-white !bg-red-600 hover:bg-red-500',
  info: 'text-white !bg-blue-600 hover:bg-blue-500',
  none: '',
}

const props = defineProps({
  value: {
    type: [Number, Boolean, String, Object],
    default: undefined,
  },
  modelValue: {
    type: [Boolean, String, Array],
    default: false,
  },
  label: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    default: '',
  },
  rules: {
    type: [String, Function, Object] as PropType<
      RuleExpression<string | number | boolean | object | null | any[]>
    >,
    default: '',
  },
  error: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
  theme: {
    type: String as PropType<keyof typeof themes>,
    default: 'primary',
  },
  backgroundClass: {
    type: [String, Array, Object] as PropType<
      string | string[] | Record<string, string>
    >,
    default: '',
  },
})

const emits = defineEmits(['update:modelValue'])
const proxyTheme = computed(() => props.theme && themes[props.theme])
const proxyChecked = computed({
  get() {
    return Array.isArray(props.modelValue)
      ? props.modelValue.includes(props.value)
      : !!props.modelValue
  },
  set(val: any) {
    let value = val

    if (Array.isArray(props.modelValue)) {
      const i = props.modelValue.indexOf(props.value)

      value =
        i >= 0
          ? props.modelValue.filter((item) => item !== props.value)
          : [...props.modelValue, props.value]
    }
    emits('update:modelValue', value)
  },
})

const currentErrorMessage = ref<string | undefined>('')

if (props.name) {
  const { handleChange, errorMessage } = useSimpleInput(
    props,
    getCurrentInstance()
  )

  watch(
    () => props.modelValue,
    (value) => {
      handleChange(value, false)
    }
  )

  watch(
    errorMessage,
    (value) => {
      currentErrorMessage.value = value
    },
    { immediate: true }
  )
}
</script>

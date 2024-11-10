<template>
  <div
    ref="root"
    class="relative"
    :class="hasError && 'has-error'"
    style="scroll-margin-top: calc(4rem + var(--sat))"
  >
    <label
      v-if="label"
      class="block mb-1 text-md font-medium leading-5"
      :class="labelPadding"
    >
      {{ label }}
      {{ required ? '*' : '' }}
    </label>
    <div
      v-if="description"
      class="text-xs text-gray-500 mb-1 -mt-1"
      :class="labelPadding"
    >
      {{ description }}
    </div>
    <slot name="above" />
    <div v-click-away="close" :class="proxyRounded">
      <div class="flex truncate relative">
        <div
          class="absolute inset-0 bg-clip-content"
          :class="[
            disabled ? disabledBackgroundClass : backgroundClass,
            proxyRounded,
          ]"
        />
        <input
          type="text"
          class="absolute h-0 w-0 pointer-events-none opacity-0"
          aria-label=""
          :name="name"
          @focus="open"
          @blur="close"
        />

        <button
          ref="input"
          tabindex="-1"
          class="relative shadow-sm flex items-center w-full h-10 bg-transparent focus:outline-none focus:shadow-outline-blue transition duration-150 ease-in-out sm:text-sm sm:leading-5 truncate"
          :class="[
            borderClass || 'border focus:border-blue-300',
            !borderClass && errorMessage ? 'border-red-400' : 'border-gray-300',
            disabled && 'cursor-not-allowed',
            loading && 'pointer-events-none',
            labelPadding,
            proxyRounded,
          ]"
          type="button"
          :disabled="disabled"
          @click="toggle"
          @keydown="onKeydown"
        >
          <span
            v-if="selectedLabels.length > 0 || empty"
            class="flex-1 text-left truncate"
          >
            {{ selectedLabels.join(', ') || empty }}
          </span>
          <span v-else class="flex-1 w-0 text-left text-gray-400 truncate">
            {{ placeholder }}
          </span>
          <span class="flex-shrink-0 ml-3">
            <BaseSpinner v-if="loading" size="xs" />
            <BaseIcon
              v-else
              name="outline_chevron_down"
              :class="expanded && 'transform rotate-180'"
              size="xs"
            />
          </span>
        </button>

        <BaseButton
          v-if="isShowClearButton"
          theme="white"
          class="relative w-10 !p-0 ml-3 flex-shrink-0"
          tabindex="-1"
          @click="clear"
        >
          <BaseIcon name="outline_trash" />
        </BaseButton>
      </div>

      <transition
        enter-active-class="transition-all duration-200"
        enter-from-class="transform -translate-y-3 opacity-0"
        enter-to-class="transform translate-y-0 opacity-100"
        leave-active-class="transition-all duration-200"
        leave-from-class="transform translate-y-0"
        leave-to-class="transform -translate-y-3 opacity-0"
      >
        <div
          v-if="expanded"
          class="absolute z-10 left-0 w-full origin-top-left rounded-md shadow-lg"
          :class="!canOpenBottom && 'bottom-full'"
          :style="{ marginTop: `${listMargin}px` }"
        >
          <div
            class="rounded-md whitespace-nowrap shadow-xs bg-white overflow-y-auto"
            :style="{ maxHeight: `${listMaxHeight}px` }"
          >
            <div class="py-2" role="menu" aria-orientation="vertical">
              <div
                v-if="proxyOptions.length === 0"
                class="truncate px-4 py-2 text-gray-500"
              >
                {{ emptyPlaceholder }}
              </div>
              <div
                v-for="(option, idx) in proxyOptions"
                :key="idx"
                class="flex truncate items-center px-4 py-2 cursor-pointer text-gray-500 focus:outline-none"
                :class="[
                  focusedOption &&
                    focusedOption.value === option.value &&
                    'bg-gray-100 text-gray-800',
                  selectedValues.includes(option.value)
                    ? 'text-primary-500 bg-primary-100'
                    : 'hover:bg-gray-100 hover:text-gray-800',
                ]"
                role="menuitem"
                @click="onSelect(option)"
              >
                <BaseButton
                  v-if="multiple"
                  class="w-6 !p-0 mr-3 flex-shrink-0"
                  size="xs"
                  tabindex="-1"
                  :look="
                    selectedValues.includes(option.value) ? 'solid' : 'border'
                  "
                  :theme="
                    selectedValues.includes(option.value) ? 'primary' : 'white'
                  "
                >
                  <BaseIcon
                    v-if="selectedValues.includes(option.value)"
                    name="outline_check"
                  />
                </BaseButton>

                <slot :option="option" name="option">
                  <span
                    class="flex-1 truncate"
                    :title="option.label || option.value?.toString()"
                  >
                    {{ option.label || option.value }}
                  </span>
                </slot>
              </div>
            </div>
          </div>
        </div>
      </transition>
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
        <span v-if="hasError" class="text-red-600 mt-1" :class="labelPadding">
          <slot name="error">
            {{ errorMessage }}
          </slot>
        </span>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, nextTick, ref, useSlots, watch, type PropType } from 'vue'
import type { RuleExpression } from 'vee-validate'
import { useSimpleInput } from './use-simple-input'
import type { OptionInterface } from './use-simple-input'

// hardcode list height to prevent slow DOM calculation
const listMargin = 8
const listMaxHeight = 256
const listHeight = listMargin + listMaxHeight

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

const props = defineProps({
  modelValue: {
    type: [String, Number, Array, Object] as PropType<
      string | number | Array<any> | null
    >,
    default: '',
  },
  value: {
    type: [String, Number],
    default: undefined,
  },
  placeholder: {
    type: String,
    default: '',
  },
  emptyPlaceholder: {
    type: String,
    default: 'Nothing to show',
  },
  label: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  rounded: {
    type: String as PropType<keyof typeof roundedMap>,
    default: 'xl',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
  rules: {
    type: [String, Function, Object] as PropType<
      RuleExpression<boolean | object | string | number | any[] | null>
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
  empty: {
    type: String,
    default: undefined,
  },
  options: {
    type: Array as () => OptionInterface[],
    default: () => [],
  },
  backgroundClass: {
    type: [String, Array, Object] as PropType<
      string | string[] | Record<string, string>
    >,
    default: 'bg-white',
  },
  disabledBackgroundClass: {
    type: [String, Array, Object] as PropType<
      string | string[] | Record<string, string>
    >,
    default: 'bg-gray-100',
  },
  borderClass: {
    type: [String, Array, Object] as PropType<
      string | string[] | Record<string, string>
    >,
    default: '',
  },
  showClearButton: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['change', 'update:modelValue'])

const { errorMessage, handleChange, validate } = useSimpleInput(
  props,
  getCurrentInstance()
)

const slots = useSlots()
const hasError = computed(
  () => !props.disabled && (errorMessage.value || slots.error)
)

watch(
  () => props.modelValue,
  (value) => {
    handleChange(value, false)
  }
)

const focused = ref(-1)
const expanded = ref(false)
const canOpenBottom = ref(true)

const parsedValue = computed(() => {
  let value = props.modelValue ?? props.value

  if (props.multiple && !Array.isArray(value)) {
    value = [value]
  }

  return value
})
const proxyOptions = computed(() => {
  const options = [...props.options]

  if (props.empty) {
    options.unshift({
      label: props.empty,
      value: undefined,
    })
  }

  return options
})
const selectedOptions = computed(() => {
  const value = parsedValue.value

  return props.options.filter((option) => {
    if (props.multiple && Array.isArray(value)) {
      return (
        value.includes(option.value) || value.includes(option.value?.toString())
      )
    }

    return option.value === value
  })
})
const selectedValues = computed(() =>
  selectedOptions.value.map(({ value }) => value)
)
const selectedLabels = computed(() =>
  selectedOptions.value.map(({ label }) => label)
)
const focusedOption = computed(() => proxyOptions.value[focused.value])
const proxyRounded = computed(() => props.rounded && roundedMap[props.rounded])
const isShowClearButton = computed(
  () =>
    props.showClearButton && props.multiple && selectedOptions.value.length > 0
)
const labelPadding = computed(() =>
  props.rounded === 'full' ? 'px-6' : 'px-4'
)

const root = ref<HTMLElement | null>(null)

function open() {
  expanded.value = true
  nextTick(() => {
    checkPosition()
  })
}

function checkPosition() {
  if (root.value) {
    const rectEl = root.value.getBoundingClientRect()

    canOpenBottom.value = window.innerHeight - rectEl.bottom > listHeight
  }
}

function close() {
  focused.value = -1
  expanded.value = false
}

function toggle() {
  if (expanded.value) {
    close()
  } else {
    open()
  }
}

function clear() {
  const value = parsedValue.value

  if (Array.isArray(value)) {
    emit('update:modelValue', [])
    emit('change', undefined)
  }
}

function onKeydown(event: any) {
  event.preventDefault()

  if (event.key === 'ArrowDown') {
    focused.value++

    if (!props.options[focused.value]) {
      focused.value = 0
    }
  }

  if (event.key === 'ArrowUp') {
    focused.value--

    if (!props.options[focused.value]) {
      focused.value = props.options.length - 1
    }
  }

  if (event.key === 'Enter' || event.key === 'Escape') {
    const option = props.options[focused.value]

    select(option)
    close()
  }
}

function onSelect(option: any) {
  select(option)

  if (!props.multiple) {
    close()
  }
}

function select(option: any) {
  const value = parsedValue.value
  let result = option.value

  if (props.multiple && Array.isArray(value)) {
    if (selectedValues.value.includes(option.value)) {
      result = value.filter((v) => {
        if (parseInt(v)) {
          return parseInt(v) !== option.value
        }

        return v !== option.value
      })
    } else {
      result = [...value, option.value]
    }
  }

  emit('update:modelValue', result)
  emit('change', option)

  handleChange(result)
}

defineExpose({
  validate,
})
</script>

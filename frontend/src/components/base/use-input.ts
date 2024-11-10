import { computed, ref, reactive, watch } from 'vue'
import { useField } from 'vee-validate'
import type { ComponentInternalInstance } from 'vue'
import type { RuleExpression } from 'vee-validate'

interface InputProps {
  modelValue?: string | number
  value?: string | number
  maxlength?: number
  name?: string
  description?: string
  rules?: RuleExpression<string | number>
  error?: string
  type?: string
  disabled?: boolean
  required?: boolean
}

export interface OptionInterface {
  label: string
  value: number | string | undefined
}

export function useInput(
  props: InputProps,
  context: ComponentInternalInstance | null
) {
  if (!context) {
    throw new Error('Null component instance')
  }
  const { emit } = context
  const localValue = ref(
    props.value === undefined ? props.modelValue : props.value
  )
  const proxyValue = computed(() =>
    props.modelValue === undefined ? props.value : props.modelValue
  )
  const handlers: Record<string, any> = reactive({
    input(e: any) {
      let value: string | number = e.target?.value || e.target?.innerText

      if (props.type === 'number') {
        value = parseFloat(value as string || '0')
      } else {
        localValue.value = (value as string).replace(/<(.|\n)*?>/g, '')
      }

      emit('update:modelValue', value)
    },
    keypress(e: any) {
      const value = e.target?.value || e.target?.innerText

      if (props.maxlength && value.length >= props.maxlength) {
        e.preventDefault()
      }
    },
  })

  const options = {
    errorMessage: computed(() => (props.disabled ? '' : props.error)),
    isValid: computed(() => true),
    handlers,
    localValue,
  }

  if (props.name) {
    const rules = computed(() =>
      props.required && !props.rules ? 'required' : props.rules
    )
    const { errorMessage, meta, handleBlur, handleChange, validate, value } =
      useField(props.name, rules, {
        initialValue: props.modelValue,
        validateOnValueUpdate: false,
        syncVModel: false,
      })

    const handleInput = (value: string | number) => {
      handleChange(value, false)
    }

    handlers.change = function (e: any) {
      handleChange(e)
    }
    handlers.blur = function (e: any) {
      handleBlur(e)
      handleChange(e)
    }

    options.isValid = computed(
      () => meta.valid && (meta.touched || !errorMessage.value)
    )
    options.errorMessage = computed(() => {
      return props.disabled
        ? ''
        : props.error || (errorMessage && errorMessage.value)
    })

    watch(proxyValue, (value) => {
      handleChange(value, meta.validated)
    })

    watch(value, (value) => {
      // handle form reset
      if (value !== props.modelValue) {
        emit('update:modelValue', value)
      }
    })

    return {
      handleInput,
      handleBlur,
      handleChange,
      validate,
      errorMessage: options.errorMessage,
      isValid: options.isValid,
      handlers: options.handlers,
      localValue: options.localValue,
      proxyValue,
    }
  }

  return {
    errorMessage: options.errorMessage,
    isValid: options.isValid,
    handlers: options.handlers,
    localValue: options.localValue,
    proxyValue,
  }
}

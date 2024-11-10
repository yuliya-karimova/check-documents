<template>
  <form @submit="onSubmit">
    <slot />
  </form>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'

const props = defineProps({
  method: {
    type: Function,
    required: true,
  },
  onError: {
    type: Function,
    default: null,
  },
  resetOnSubmit: {
    type: Boolean,
    default: true,
  },
})

const {
  handleSubmit,
  setFieldError,
  meta,
  errors,
  submitForm,
  validate,
  resetForm,
  setErrors,
} = useForm()

const onSubmit = handleSubmit(async (values, actions) => {
  if (props.method) {
    try {
      await props.method(values, actions)

      if (props.resetOnSubmit) {
        actions.resetForm()
      }
    } catch (error: any) {
      const fetchError = error as any

      if (
        !fetchError.data?.errors ||
        typeof fetchError.data?.errors !== 'object' ||
        Object.keys(fetchError.data.errors).some((field) => !values[field])
      ) {
        if (props.onError) {
          props.onError(error)
          return
        } else {
          throw error
        }
      }

      Object.keys(fetchError.data.errors).forEach((field) => {
        const fieldError = Array.isArray(fetchError.data.errors[field])
          ? fetchError.data.errors[field][0]
          : fetchError.data.errors[field]

        setFieldError(field, fieldError || 'Input is not correct')
      })
    }
  }
})

defineExpose({
  meta,
  errors,
  submitForm,
  validate,
  resetForm,
  setErrors,
})
</script>

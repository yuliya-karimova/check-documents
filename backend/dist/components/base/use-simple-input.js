import { computed } from 'vue';
import { useField } from 'vee-validate';
// TODO: try to rework to HOC, like validation agnostic BaseInput and BaseInputWithValidation as validated version
export function useSimpleInput(props, context, syncVModel = false) {
    if (!context) {
        throw new Error('Null component instance');
    }
    const rules = computed(() => props.required && !props.rules ? 'required' : props.rules);
    const { errorMessage, meta, validate, value, handleChange, resetField } = useField(props.name, rules, {
        initialValue: props.modelValue,
        syncVModel,
    });
    return {
        errorMessage: computed(() => {
            return props.disabled
                ? ''
                : props.error || (errorMessage && errorMessage.value);
        }),
        handleChange,
        validate,
        resetField,
        handlers: {
            blur: () => {
                props.validateOnBlur && validate();
            },
            input: () => {
                meta.validated && validate();
            },
        },
        value,
        meta,
    };
}

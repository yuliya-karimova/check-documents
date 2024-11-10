import { useForm } from 'vee-validate';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
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
});
const { handleSubmit, setFieldError, meta, errors, submitForm, validate, resetForm, setErrors, } = useForm();
const onSubmit = handleSubmit(async (values, actions) => {
    if (props.method) {
        try {
            await props.method(values, actions);
            if (props.resetOnSubmit) {
                actions.resetForm();
            }
        }
        catch (error) {
            const fetchError = error;
            if (!fetchError.data?.errors ||
                typeof fetchError.data?.errors !== 'object' ||
                Object.keys(fetchError.data.errors).some((field) => !values[field])) {
                if (props.onError) {
                    props.onError(error);
                    return;
                }
                else {
                    throw error;
                }
            }
            Object.keys(fetchError.data.errors).forEach((field) => {
                const fieldError = Array.isArray(fetchError.data.errors[field])
                    ? fetchError.data.errors[field][0]
                    : fetchError.data.errors[field];
                setFieldError(field, fieldError || 'Input is not correct');
            });
        }
    }
});
const __VLS_exposed = {
    meta,
    errors,
    submitForm,
    validate,
    resetForm,
    setErrors,
};
defineExpose({
    meta,
    errors,
    submitForm,
    validate,
    resetForm,
    setErrors,
});
const __VLS_fnComponent = (await import('vue')).defineComponent({
    props: {
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
    },
});
let __VLS_functionalComponentProps;
const __VLS_modelEmitsType = {};
function __VLS_template() {
    let __VLS_ctx;
    /* Components */
    let __VLS_otherComponents;
    let __VLS_own;
    let __VLS_localComponents;
    let __VLS_components;
    let __VLS_styleScopedClasses;
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({ ...{ onSubmit: (__VLS_ctx.onSubmit) }, });
    var __VLS_0 = {};
    // @ts-ignore
    [onSubmit,];
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    let __VLS_name;
    let __VLS_defineComponent;
    const __VLS_internalComponent = __VLS_defineComponent({
        setup() {
            return {
                onSubmit: onSubmit,
            };
        },
        props: {
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
        },
    });
}
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
        return {
            ...__VLS_exposed,
        };
    },
    props: {
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
    },
});
export default {};
;

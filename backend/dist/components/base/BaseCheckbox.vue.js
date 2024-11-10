import { computed, watch, ref, getCurrentInstance } from 'vue';
import { useSimpleInput } from './use-simple-input';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const themes = {
    primary: 'text-white !bg-accent-500 hover:bg-accent-800',
    success: 'text-white !bg-green-600 hover:bg-green-500',
    destructive: 'text-white !bg-red-600 hover:bg-red-500',
    info: 'text-white !bg-blue-600 hover:bg-blue-500',
    none: '',
};
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
        type: [String, Function, Object],
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
        type: String,
        default: 'primary',
    },
    backgroundClass: {
        type: [String, Array, Object],
        default: '',
    },
});
const emits = defineEmits(['update:modelValue']);
const proxyTheme = computed(() => props.theme && themes[props.theme]);
const proxyChecked = computed({
    get() {
        return Array.isArray(props.modelValue)
            ? props.modelValue.includes(props.value)
            : !!props.modelValue;
    },
    set(val) {
        let value = val;
        if (Array.isArray(props.modelValue)) {
            const i = props.modelValue.indexOf(props.value);
            value =
                i >= 0
                    ? props.modelValue.filter((item) => item !== props.value)
                    : [...props.modelValue, props.value];
        }
        emits('update:modelValue', value);
    },
});
const currentErrorMessage = ref('');
if (props.name) {
    const { handleChange, errorMessage } = useSimpleInput(props, getCurrentInstance());
    watch(() => props.modelValue, (value) => {
        handleChange(value, false);
    });
    watch(errorMessage, (value) => {
        currentErrorMessage.value = value;
    }, { immediate: true });
}
const __VLS_fnComponent = (await import('vue')).defineComponent({
    props: {
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
            type: [String, Function, Object],
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
            type: String,
            default: 'primary',
        },
        backgroundClass: {
            type: [String, Array, Object],
            default: '',
        },
    },
    emits: {},
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ ...{ class: ("flex text-sm font-medium select-none cursor-pointer") }, ...{ class: ((__VLS_ctx.disabled && 'opacity-60 pointer-events-none')) }, });
    __VLS_styleScopedClasses = (disabled && 'opacity-60 pointer-events-none');
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ type: ("checkbox"), ...{ class: ("hidden") }, ...(__VLS_ctx.$attrs), disabled: ((__VLS_ctx.disabled)), "aria-label": (""), });
    (__VLS_ctx.proxyChecked);
    // @ts-ignore
    [disabled, disabled, $attrs, proxyChecked,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("w-5 h-5 flex-shrink-0 border border-gray-300 shadow-sm rounded-md mr-3 flex justify-center items-center") }, ...{ class: (([__VLS_ctx.backgroundClass, __VLS_ctx.proxyChecked && __VLS_ctx.proxyTheme])) }, });
    __VLS_styleScopedClasses = ([backgroundClass, proxyChecked && proxyTheme]);
    if (__VLS_ctx.proxyChecked) {
        // @ts-ignore
        const __VLS_0 = {}
            .BaseIcon;
        ({}.BaseIcon);
        __VLS_components.BaseIcon;
        // @ts-ignore
        [BaseIcon,];
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ name: ("outline_check"), size: ("xs"), }));
        const __VLS_2 = __VLS_1({ name: ("outline_check"), size: ("xs"), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        ({}({ name: ("outline_check"), size: ("xs"), }));
        // @ts-ignore
        [proxyChecked, proxyChecked, backgroundClass, proxyTheme,];
        const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("block leading-5") }, });
    var __VLS_6 = {};
    (__VLS_ctx.label);
    (__VLS_ctx.required ? '*' : '');
    // @ts-ignore
    [label, required,];
    if (__VLS_ctx.description) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("text-xs font-normal text-gray-500") }, });
        (__VLS_ctx.description);
        // @ts-ignore
        [description, description,];
    }
    // @ts-ignore
    const __VLS_7 = {}
        .transition;
    ({}.transition);
    ({}.transition);
    __VLS_components.Transition;
    __VLS_components.transition;
    __VLS_components.Transition;
    __VLS_components.transition;
    // @ts-ignore
    [Transition, Transition,];
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({ enterActiveClass: ("transition-all duration-300"), enterFromClass: ("transform -translate-y-3 opacity-0"), enterToClass: ("transform translate-y-0 opacity-100"), leaveActiveClass: ("transition-all duration-300"), leaveFromClass: ("transform translate-y-0"), leaveToClass: ("transform -translate-y-3 opacity-0"), }));
    const __VLS_9 = __VLS_8({ enterActiveClass: ("transition-all duration-300"), enterFromClass: ("transform -translate-y-3 opacity-0"), enterToClass: ("transform translate-y-0 opacity-100"), leaveActiveClass: ("transition-all duration-300"), leaveFromClass: ("transform translate-y-0"), leaveToClass: ("transform -translate-y-3 opacity-0"), }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    ({}({ enterActiveClass: ("transition-all duration-300"), enterFromClass: ("transform -translate-y-3 opacity-0"), enterToClass: ("transform translate-y-0 opacity-100"), leaveActiveClass: ("transition-all duration-300"), leaveFromClass: ("transform translate-y-0"), leaveToClass: ("transform -translate-y-3 opacity-0"), }));
    if (!__VLS_ctx.disabled && (__VLS_ctx.currentErrorMessage || __VLS_ctx.$slots.error)) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("text-red-600 mt-1") }, });
        var __VLS_13 = {};
        // @ts-ignore
        [disabled, currentErrorMessage, $slots,];
        (__VLS_ctx.currentErrorMessage);
        // @ts-ignore
        [currentErrorMessage,];
        (__VLS_12.slots).default;
    }
    (__VLS_12.slots).default;
    const __VLS_12 = __VLS_pickFunctionalComponentCtx(__VLS_7, __VLS_9);
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['text-sm'];
        __VLS_styleScopedClasses['font-medium'];
        __VLS_styleScopedClasses['select-none'];
        __VLS_styleScopedClasses['cursor-pointer'];
        __VLS_styleScopedClasses['hidden'];
        __VLS_styleScopedClasses['w-5'];
        __VLS_styleScopedClasses['h-5'];
        __VLS_styleScopedClasses['flex-shrink-0'];
        __VLS_styleScopedClasses['border'];
        __VLS_styleScopedClasses['border-gray-300'];
        __VLS_styleScopedClasses['shadow-sm'];
        __VLS_styleScopedClasses['rounded-md'];
        __VLS_styleScopedClasses['mr-3'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['justify-center'];
        __VLS_styleScopedClasses['items-center'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['flex-col'];
        __VLS_styleScopedClasses['block'];
        __VLS_styleScopedClasses['leading-5'];
        __VLS_styleScopedClasses['text-xs'];
        __VLS_styleScopedClasses['font-normal'];
        __VLS_styleScopedClasses['text-gray-500'];
        __VLS_styleScopedClasses['text-red-600'];
        __VLS_styleScopedClasses['mt-1'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    let __VLS_name;
    let __VLS_defineComponent;
    const __VLS_internalComponent = __VLS_defineComponent({
        setup() {
            return {
                proxyTheme: proxyTheme,
                proxyChecked: proxyChecked,
                currentErrorMessage: currentErrorMessage,
            };
        },
        props: {
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
                type: [String, Function, Object],
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
                type: String,
                default: 'primary',
            },
            backgroundClass: {
                type: [String, Array, Object],
                default: '',
            },
        },
        emits: {},
    });
}
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    props: {
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
            type: [String, Function, Object],
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
            type: String,
            default: 'primary',
        },
        backgroundClass: {
            type: [String, Array, Object],
            default: '',
        },
    },
    emits: {},
});
export default {};
;

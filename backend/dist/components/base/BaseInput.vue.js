import { useSimpleInput } from './use-simple-input';
import { computed, getCurrentInstance, nextTick, ref, useSlots, watch } from 'vue';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const shadow = {
    none: 'shadow-none',
    sm: 'shadow-sm',
    normal: 'shadow',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    '2xl': 'shadow-2xl',
    inner: 'shadow-inner',
};
const textAlign = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
};
const roundedMap = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
    full: 'rounded-full',
};
let __VLS_typeProps;
const props = withDefaults(defineProps(), {
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
});
const emits = defineEmits(['update:modelValue']);
const inputEl = ref(null);
const showPassword = ref(false);
const isFocused = ref(false);
const proxyType = computed(() => {
    if (props.type === 'password') {
        return showPassword.value ? 'text' : 'password';
    }
    return props.type;
});
const proxyInputShadow = computed(() => props.inputShadow && shadow[props.inputShadow]);
const proxyInputTextAlign = computed(() => props.inputTextAlign && textAlign[props.inputTextAlign]);
const proxyRounded = computed(() => props.rounded && roundedMap[props.rounded]);
const { errorMessage, value, handleChange, meta, validate } = useSimpleInput(props, getCurrentInstance());
const slots = useSlots();
const hasError = computed(() => !props.disabled && (errorMessage.value || slots.error));
watch(() => props.modelValue, (newValue) => {
    handleChange(newValue, false);
});
const handlers = {
    input(event) {
        const value = props.clearInput
            ? event.target?.value.replace(/[^\p{sc=Han}а-яёa-z0-9!"#$%&'()*+,./:;<=>?@[\]^_`{|}~-]/gi, '')
            : event.target?.value;
        handleChange(value, false);
        emits('update:modelValue', value);
        meta.validated && validate();
    },
    blur() {
        props.validateOnBlur && validate();
    },
};
function focus() {
    nextTick(() => {
        inputEl.value?.focus?.();
    });
}
const __VLS_exposed = { focus };
defineExpose({ focus });
const __VLS_withDefaultsArg = (function (t) { return t; })({
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
});
const __VLS_fnComponent = (await import('vue')).defineComponent({
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("relative") }, ...{ class: ((__VLS_ctx.hasError && 'has-error')) }, ...{ style: ({}) }, });
    __VLS_styleScopedClasses = (hasError && 'has-error');
    if (__VLS_ctx.label) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ ...{ class: ("block text-md font-medium leading-5 mb-1") }, ...{ class: (([__VLS_ctx.rounded === 'full' ? 'px-6' : 'px-4'])) }, });
        __VLS_styleScopedClasses = ([rounded === 'full' ? 'px-6' : 'px-4']);
        (__VLS_ctx.label);
        (__VLS_ctx.required ? '*' : '');
        // @ts-ignore
        [hasError, label, label, rounded, required,];
    }
    if (__VLS_ctx.description) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("text-xs text-gray-500 mb-1 -mt-1") }, ...{ class: (([__VLS_ctx.rounded === 'full' ? 'px-6' : 'px-4'])) }, });
        __VLS_styleScopedClasses = ([rounded === 'full' ? 'px-6' : 'px-4']);
        (__VLS_ctx.description);
        // @ts-ignore
        [rounded, description, description,];
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("relative border transition duration-150 ease-in-out") }, ...{ class: (([
                !__VLS_ctx.isFocused && !__VLS_ctx.errorMessage && 'border-gray-300',
                __VLS_ctx.isFocused && !__VLS_ctx.errorMessage && 'border-blue-300',
                __VLS_ctx.errorMessage && 'border-red-400',
                __VLS_ctx.disabled && 'cursor-not-allowed',
                __VLS_ctx.proxyInputShadow,
                __VLS_ctx.proxyRounded,
            ])) }, });
    __VLS_directiveFunction(__VLS_ctx.vShow)((!__VLS_ctx.hideInput));
    __VLS_styleScopedClasses = ([
        !isFocused && !errorMessage && 'border-gray-300',
        isFocused && !errorMessage && 'border-blue-300',
        errorMessage && 'border-red-400',
        disabled && 'cursor-not-allowed',
        proxyInputShadow,
        proxyRounded,
    ]);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div)({ ...{ class: ("absolute inset-0 bg-clip-content") }, ...{ class: (([
                __VLS_ctx.disabled ? __VLS_ctx.disabledInputBackgroundClass : __VLS_ctx.inputBackgroundClass,
                __VLS_ctx.proxyRounded,
            ])) }, });
    __VLS_styleScopedClasses = ([
        disabled ? disabledInputBackgroundClass : inputBackgroundClass,
        proxyRounded,
    ]);
    // @ts-ignore
    [isFocused, isFocused, errorMessage, errorMessage, errorMessage, disabled, disabled, proxyInputShadow, proxyRounded, proxyRounded, vShow, hideInput, disabledInputBackgroundClass, inputBackgroundClass,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("relative flex items-center") }, });
    if (__VLS_ctx.$slots.left) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: (([__VLS_ctx.disabled && 'pointer-events-none'])) }, });
        __VLS_styleScopedClasses = ([disabled && 'pointer-events-none']);
        var __VLS_0 = {};
        // @ts-ignore
        [disabled, $slots,];
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex-1 overflow-hidden flex items-center") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ ...{ onFocus: (...[$event]) => {
                __VLS_ctx.isFocused = true;
                // @ts-ignore
                [isFocused,];
            } }, ...{ onBlur: (...[$event]) => {
                __VLS_ctx.isFocused = false;
                // @ts-ignore
                [isFocused,];
            } }, ref: ("inputEl"), ...{ class: ("appearance-none bg-transparent flex-1 max-w-full h-10 placeholder-gray-400 focus:outline-none sm:text-sm sm:leading-5") }, ...{ class: (([
                __VLS_ctx.disabled && 'pointer-events-none',
                __VLS_ctx.$slots.left || __VLS_ctx.rounded !== 'full' ? 'px-4' : 'px-6',
                __VLS_ctx.proxyInputTextAlign,
                __VLS_ctx.proxyRounded,
            ])) }, name: ((__VLS_ctx.name)), type: ((__VLS_ctx.proxyType)), disabled: ((__VLS_ctx.disabled)), maxlength: ((__VLS_ctx.maxlength)), placeholder: ((__VLS_ctx.placeholder)), min: ((__VLS_ctx.min)), max: ((__VLS_ctx.max)), step: ((__VLS_ctx.step)), readonly: ((__VLS_ctx.readonly)), autocomplete: ((__VLS_ctx.autocomplete)), "aria-label": (""), });
    (__VLS_ctx.handlers);
    (__VLS_ctx.value);
    // @ts-ignore
    (__VLS_ctx.inputEl);
    __VLS_styleScopedClasses = ([
        disabled && 'pointer-events-none',
        $slots.left || rounded !== 'full' ? 'px-4' : 'px-6',
        proxyInputTextAlign,
        proxyRounded,
    ]);
    // @ts-ignore
    [rounded, disabled, disabled, proxyRounded, $slots, proxyInputTextAlign, name, proxyType, maxlength, placeholder, min, max, step, readonly, autocomplete, handlers, value, inputEl,];
    if (__VLS_ctx.$slots.right || __VLS_ctx.type === 'password') {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: (([__VLS_ctx.disabled && 'pointer-events-none'])) }, });
        __VLS_styleScopedClasses = ([disabled && 'pointer-events-none']);
        var __VLS_1 = {};
        // @ts-ignore
        [disabled, $slots, type,];
        if (__VLS_ctx.type === 'password') {
            // @ts-ignore
            const __VLS_2 = {}
                .BaseButton;
            ({}.BaseButton);
            ({}.BaseButton);
            __VLS_components.BaseButton;
            __VLS_components.BaseButton;
            // @ts-ignore
            [BaseButton, BaseButton,];
            // @ts-ignore
            const __VLS_3 = __VLS_asFunctionalComponent(__VLS_2, new __VLS_2({ ...{ 'onClick': {} }, ...{ class: ("w-10 !p-0 rounded-l-none") }, look: ("link"), theme: ("dark"), rounded: ("md"), }));
            const __VLS_4 = __VLS_3({ ...{ 'onClick': {} }, ...{ class: ("w-10 !p-0 rounded-l-none") }, look: ("link"), theme: ("dark"), rounded: ("md"), }, ...__VLS_functionalComponentArgsRest(__VLS_3));
            ({}({ ...{ 'onClick': {} }, ...{ class: ("w-10 !p-0 rounded-l-none") }, look: ("link"), theme: ("dark"), rounded: ("md"), }));
            let __VLS_8;
            const __VLS_9 = {
                onClick: (...[$event]) => {
                    if (!((__VLS_ctx.$slots.right || __VLS_ctx.type === 'password')))
                        return;
                    if (!((__VLS_ctx.type === 'password')))
                        return;
                    __VLS_ctx.showPassword = !__VLS_ctx.showPassword;
                    // @ts-ignore
                    [type, showPassword, showPassword,];
                }
            };
            // @ts-ignore
            const __VLS_10 = {}
                .BaseIcon;
            ({}.BaseIcon);
            __VLS_components.BaseIcon;
            // @ts-ignore
            [BaseIcon,];
            // @ts-ignore
            const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({ name: ((__VLS_ctx.showPassword ? 'outline_eye_off' : 'outline_eye')), size: ("sm"), }));
            const __VLS_12 = __VLS_11({ name: ((__VLS_ctx.showPassword ? 'outline_eye_off' : 'outline_eye')), size: ("sm"), }, ...__VLS_functionalComponentArgsRest(__VLS_11));
            ({}({ name: ((__VLS_ctx.showPassword ? 'outline_eye_off' : 'outline_eye')), size: ("sm"), }));
            // @ts-ignore
            [showPassword,];
            const __VLS_15 = __VLS_pickFunctionalComponentCtx(__VLS_10, __VLS_12);
            (__VLS_7.slots).default;
            const __VLS_7 = __VLS_pickFunctionalComponentCtx(__VLS_2, __VLS_4);
            let __VLS_5;
            let __VLS_6;
        }
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex pt-px text-sm leading-4") }, });
    // @ts-ignore
    const __VLS_16 = {}
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
    const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({ enterActiveClass: ("transition-all duration-300"), enterFromClass: ("transform -translate-y-3 opacity-0"), enterToClass: ("transform translate-y-0 opacity-100"), leaveActiveClass: ("transition-all duration-300"), leaveFromClass: ("transform translate-y-0"), leaveToClass: ("transform -translate-y-3 opacity-0"), }));
    const __VLS_18 = __VLS_17({ enterActiveClass: ("transition-all duration-300"), enterFromClass: ("transform -translate-y-3 opacity-0"), enterToClass: ("transform translate-y-0 opacity-100"), leaveActiveClass: ("transition-all duration-300"), leaveFromClass: ("transform translate-y-0"), leaveToClass: ("transform -translate-y-3 opacity-0"), }, ...__VLS_functionalComponentArgsRest(__VLS_17));
    ({}({ enterActiveClass: ("transition-all duration-300"), enterFromClass: ("transform -translate-y-3 opacity-0"), enterToClass: ("transform translate-y-0 opacity-100"), leaveActiveClass: ("transition-all duration-300"), leaveFromClass: ("transform translate-y-0"), leaveToClass: ("transform -translate-y-3 opacity-0"), }));
    if (__VLS_ctx.hasError) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("text-red-600 mt-1") }, ...{ class: (([__VLS_ctx.rounded === 'full' ? 'px-6' : 'px-4'])) }, });
        __VLS_styleScopedClasses = ([rounded === 'full' ? 'px-6' : 'px-4']);
        var __VLS_22 = {};
        // @ts-ignore
        [hasError, rounded,];
        (__VLS_ctx.errorMessage);
        // @ts-ignore
        [errorMessage,];
        (__VLS_21.slots).default;
    }
    (__VLS_21.slots).default;
    const __VLS_21 = __VLS_pickFunctionalComponentCtx(__VLS_16, __VLS_18);
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['relative'];
        __VLS_styleScopedClasses['block'];
        __VLS_styleScopedClasses['text-md'];
        __VLS_styleScopedClasses['font-medium'];
        __VLS_styleScopedClasses['leading-5'];
        __VLS_styleScopedClasses['mb-1'];
        __VLS_styleScopedClasses['text-xs'];
        __VLS_styleScopedClasses['text-gray-500'];
        __VLS_styleScopedClasses['mb-1'];
        __VLS_styleScopedClasses['-mt-1'];
        __VLS_styleScopedClasses['relative'];
        __VLS_styleScopedClasses['border'];
        __VLS_styleScopedClasses['transition'];
        __VLS_styleScopedClasses['duration-150'];
        __VLS_styleScopedClasses['ease-in-out'];
        __VLS_styleScopedClasses['absolute'];
        __VLS_styleScopedClasses['inset-0'];
        __VLS_styleScopedClasses['bg-clip-content'];
        __VLS_styleScopedClasses['relative'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['items-center'];
        __VLS_styleScopedClasses['flex-1'];
        __VLS_styleScopedClasses['overflow-hidden'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['items-center'];
        __VLS_styleScopedClasses['appearance-none'];
        __VLS_styleScopedClasses['bg-transparent'];
        __VLS_styleScopedClasses['flex-1'];
        __VLS_styleScopedClasses['max-w-full'];
        __VLS_styleScopedClasses['h-10'];
        __VLS_styleScopedClasses['placeholder-gray-400'];
        __VLS_styleScopedClasses['focus:outline-none'];
        __VLS_styleScopedClasses['sm:text-sm'];
        __VLS_styleScopedClasses['sm:leading-5'];
        __VLS_styleScopedClasses['w-10'];
        __VLS_styleScopedClasses['!p-0'];
        __VLS_styleScopedClasses['rounded-l-none'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['pt-px'];
        __VLS_styleScopedClasses['text-sm'];
        __VLS_styleScopedClasses['leading-4'];
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
                inputEl: inputEl,
                showPassword: showPassword,
                isFocused: isFocused,
                proxyType: proxyType,
                proxyInputShadow: proxyInputShadow,
                proxyInputTextAlign: proxyInputTextAlign,
                proxyRounded: proxyRounded,
                errorMessage: errorMessage,
                value: value,
                hasError: hasError,
                handlers: handlers,
            };
        },
        props: {},
        emits: {},
    });
}
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
        return {
            ...__VLS_exposed,
        };
    },
    props: {},
    emits: {},
});
export default {};
;

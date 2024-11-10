import { getCurrentInstance, useSlots, computed, watch } from 'vue';
import { useSimpleInput } from './use-simple-input';
import BaseCheckbox from './BaseCheckbox.vue';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
let __VLS_typeProps;
const props = withDefaults(defineProps(), {
    title: '',
    description: '',
    modelValue: () => [],
    options: () => [],
    name: '',
    rules: '',
    error: '',
    disabled: false,
    required: false
});
const emit = defineEmits(['update:modelValue', 'input']);
const { errorMessage, handleChange } = useSimpleInput(props, getCurrentInstance());
const slots = useSlots();
const hasError = computed(() => !props.disabled && (errorMessage.value || slots.error));
const value = computed({
    get() {
        return props.modelValue || [];
    },
    set(newValue) {
        emit('update:modelValue', newValue);
        emit('input');
        handleChange(newValue, true);
    }
});
watch(() => props.modelValue, (value) => {
    handleChange(value, false);
});
const __VLS_withDefaultsArg = (function (t) { return t; })({
    title: '',
    description: '',
    modelValue: () => [],
    options: () => [],
    name: '',
    rules: '',
    error: '',
    disabled: false,
    required: false
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ((__VLS_ctx.hasError && 'has-error')) }, ...{ style: ({}) }, });
    __VLS_styleScopedClasses = (hasError && 'has-error');
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("space-y-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    if (__VLS_ctx.title) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("font-bold text-xl") }, });
        (__VLS_ctx.title);
        // @ts-ignore
        [hasError, title, title,];
    }
    if (__VLS_ctx.description) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("text-xs text-gray-500 mb-1 -mt-1 px-4") }, });
        (__VLS_ctx.description);
        // @ts-ignore
        [description, description,];
    }
    if (__VLS_ctx.options && __VLS_ctx.options.length) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6") }, });
        for (const [option] of __VLS_getVForSourceType((__VLS_ctx.options))) {
            // @ts-ignore
            [BaseCheckbox,];
            // @ts-ignore
            const __VLS_0 = __VLS_asFunctionalComponent(BaseCheckbox, new BaseCheckbox({ key: ((option.value)), modelValue: ((__VLS_ctx.value)), label: ((option.label)), value: ((option.value)), disabled: ((props.disabled)), }));
            const __VLS_1 = __VLS_0({ key: ((option.value)), modelValue: ((__VLS_ctx.value)), label: ((option.label)), value: ((option.value)), disabled: ((props.disabled)), }, ...__VLS_functionalComponentArgsRest(__VLS_0));
            ({}({ key: ((option.value)), modelValue: ((__VLS_ctx.value)), label: ((option.label)), value: ((option.value)), disabled: ((props.disabled)), }));
            // @ts-ignore
            [options, options, options, value,];
            const __VLS_4 = __VLS_pickFunctionalComponentCtx(BaseCheckbox, __VLS_1);
        }
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex text-sm leading-4") }, });
    // @ts-ignore
    const __VLS_5 = {}
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
    const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({ enterActiveClass: ("transition-all duration-300"), enterFromClass: ("transform -translate-y-3 opacity-0"), enterToClass: ("transform translate-y-0 opacity-100"), leaveActiveClass: ("transition-all duration-300"), leaveFromClass: ("transform translate-y-0"), leaveToClass: ("transform -translate-y-3 opacity-0"), }));
    const __VLS_7 = __VLS_6({ enterActiveClass: ("transition-all duration-300"), enterFromClass: ("transform -translate-y-3 opacity-0"), enterToClass: ("transform translate-y-0 opacity-100"), leaveActiveClass: ("transition-all duration-300"), leaveFromClass: ("transform translate-y-0"), leaveToClass: ("transform -translate-y-3 opacity-0"), }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    ({}({ enterActiveClass: ("transition-all duration-300"), enterFromClass: ("transform -translate-y-3 opacity-0"), enterToClass: ("transform translate-y-0 opacity-100"), leaveActiveClass: ("transition-all duration-300"), leaveFromClass: ("transform translate-y-0"), leaveToClass: ("transform -translate-y-3 opacity-0"), }));
    if (__VLS_ctx.hasError) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("text-red-600 mt-1 px-4") }, });
        var __VLS_11 = {};
        // @ts-ignore
        [hasError,];
        (__VLS_ctx.errorMessage);
        // @ts-ignore
        [errorMessage,];
        (__VLS_10.slots).default;
    }
    (__VLS_10.slots).default;
    const __VLS_10 = __VLS_pickFunctionalComponentCtx(__VLS_5, __VLS_7);
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['space-y-4'];
        __VLS_styleScopedClasses['font-bold'];
        __VLS_styleScopedClasses['text-xl'];
        __VLS_styleScopedClasses['text-xs'];
        __VLS_styleScopedClasses['text-gray-500'];
        __VLS_styleScopedClasses['mb-1'];
        __VLS_styleScopedClasses['-mt-1'];
        __VLS_styleScopedClasses['px-4'];
        __VLS_styleScopedClasses['grid'];
        __VLS_styleScopedClasses['grid-cols-1'];
        __VLS_styleScopedClasses['sm:grid-cols-2'];
        __VLS_styleScopedClasses['gap-y-2'];
        __VLS_styleScopedClasses['gap-x-6'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['text-sm'];
        __VLS_styleScopedClasses['leading-4'];
        __VLS_styleScopedClasses['text-red-600'];
        __VLS_styleScopedClasses['mt-1'];
        __VLS_styleScopedClasses['px-4'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    let __VLS_name;
    let __VLS_defineComponent;
    const __VLS_internalComponent = __VLS_defineComponent({
        setup() {
            return {
                BaseCheckbox: BaseCheckbox,
                errorMessage: errorMessage,
                hasError: hasError,
                value: value,
            };
        },
        props: {},
        emits: {},
    });
}
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    props: {},
    emits: {},
});
export default {};
;

import { computed } from 'vue';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const sizes = {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-screen-sm',
    '2xl': 'max-w-screen-md'
};
let __VLS_typeProps;
const props = withDefaults(defineProps(), {
    isOpen: false,
    bgClass: 'bg-gray-500 bg-opacity-75 transition-opacity',
    title: '',
    isLoading: false,
    size: 'md',
    fullscreen: false,
    displayOnLoading: false
});
const emit = defineEmits(['close']);
const proxySize = computed(() => props.size && sizes[props.size]);
const close = () => {
    emit('close');
};
const __VLS_withDefaultsArg = (function (t) { return t; })({
    isOpen: false,
    bgClass: 'bg-gray-500 bg-opacity-75 transition-opacity',
    title: '',
    isLoading: false,
    size: 'md',
    fullscreen: false,
    displayOnLoading: false
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("fixed z-40 inset-0 overflow-y-auto") }, ...{ class: ((!__VLS_ctx.isOpen && 'pointer-events-none hidden')) }, });
    __VLS_styleScopedClasses = (!isOpen && 'pointer-events-none hidden');
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex items-end justify-center min-h-screen pt-4 sm:block sm:p-0 text-center") }, ...{ class: (([!__VLS_ctx.fullscreen && 'px-4 pb-20'])) }, });
    __VLS_styleScopedClasses = ([!fullscreen && 'px-4 pb-20']);
    // @ts-ignore
    const __VLS_0 = {}
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
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ enterActiveClass: ("ease-out duration-300"), enterFromClass: ("opacity-0"), enterToClass: ("opacity-100"), leaveActiveClass: ("ease-out duration-300"), leaveFromClass: ("opacity-100"), leaveToClass: ("opacity-0"), }));
    const __VLS_2 = __VLS_1({ enterActiveClass: ("ease-out duration-300"), enterFromClass: ("opacity-0"), enterToClass: ("opacity-100"), leaveActiveClass: ("ease-out duration-300"), leaveFromClass: ("opacity-100"), leaveToClass: ("opacity-0"), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    ({}({ enterActiveClass: ("ease-out duration-300"), enterFromClass: ("opacity-0"), enterToClass: ("opacity-100"), leaveActiveClass: ("ease-out duration-300"), leaveFromClass: ("opacity-100"), leaveToClass: ("opacity-0"), }));
    if (__VLS_ctx.isOpen) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ onClick: (__VLS_ctx.close) }, ...{ class: ("fixed inset-0 flex items-center justify-center") }, ...{ class: ((__VLS_ctx.bgClass)) }, "aria-hidden": ("true"), });
        __VLS_styleScopedClasses = (bgClass);
        if (__VLS_ctx.isLoading) {
            // @ts-ignore
            const __VLS_6 = {}
                .BaseSpinner;
            ({}.BaseSpinner);
            __VLS_components.BaseSpinner;
            // @ts-ignore
            [BaseSpinner,];
            // @ts-ignore
            const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({ ...{ class: ("text-white") }, size: ("xl"), }));
            const __VLS_8 = __VLS_7({ ...{ class: ("text-white") }, size: ("xl"), }, ...__VLS_functionalComponentArgsRest(__VLS_7));
            ({}({ ...{ class: ("text-white") }, size: ("xl"), }));
            // @ts-ignore
            [isOpen, isOpen, fullscreen, close, bgClass, isLoading,];
            const __VLS_11 = __VLS_pickFunctionalComponentCtx(__VLS_6, __VLS_8);
        }
    }
    (__VLS_5.slots).default;
    const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("hidden sm:inline-block sm:align-middle sm:h-screen") }, "aria-hidden": ("true"), });
    // @ts-ignore
    const __VLS_12 = {}
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
    const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({ enterActiveClass: ("transition ease-out transform"), enterFromClass: ("translate-y-10 opacity-0"), enterToClass: ("translate-y-0 opacity-100"), leaveActiveClass: ("transition ease-out transform"), leaveFromClass: ("translate-y-0 opacity-100"), leaveToClass: ("translate-y-10 opacity-0"), }));
    const __VLS_14 = __VLS_13({ enterActiveClass: ("transition ease-out transform"), enterFromClass: ("translate-y-10 opacity-0"), enterToClass: ("translate-y-0 opacity-100"), leaveActiveClass: ("transition ease-out transform"), leaveFromClass: ("translate-y-0 opacity-100"), leaveToClass: ("translate-y-10 opacity-0"), }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    ({}({ enterActiveClass: ("transition ease-out transform"), enterFromClass: ("translate-y-10 opacity-0"), enterToClass: ("translate-y-0 opacity-100"), leaveActiveClass: ("transition ease-out transform"), leaveFromClass: ("translate-y-0 opacity-100"), leaveToClass: ("translate-y-10 opacity-0"), }));
    if (__VLS_ctx.displayOnLoading || (__VLS_ctx.isOpen && !__VLS_ctx.isLoading)) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("relative inline-block text-left align-bottom bg-white shadow-xl safe-padding-bottom transform sm:my-8 sm:align-middle w-full") }, ...{ class: (([__VLS_ctx.proxySize, __VLS_ctx.fullscreen ? 'rounded-t-xl sm:rounded-b-xl' : 'rounded-xl'])) }, });
        __VLS_directiveFunction(__VLS_ctx.vShow)((__VLS_ctx.isOpen && !__VLS_ctx.isLoading));
        __VLS_styleScopedClasses = ([proxySize, fullscreen ? 'rounded-t-xl sm:rounded-b-xl' : 'rounded-xl']);
        var __VLS_18 = {};
        // @ts-ignore
        [isOpen, isOpen, fullscreen, isLoading, isLoading, displayOnLoading, proxySize, vShow,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex justify-between items-center px-6 h-16 border-b") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("text-2xl font-bold leading-6 text-gray-900 truncate") }, });
        (__VLS_ctx.title);
        // @ts-ignore
        [title,];
        // @ts-ignore
        const __VLS_19 = {}
            .BaseButton;
        ({}.BaseButton);
        ({}.BaseButton);
        __VLS_components.BaseButton;
        __VLS_components.BaseButton;
        // @ts-ignore
        [BaseButton, BaseButton,];
        // @ts-ignore
        const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({ ...{ 'onClick': {} }, theme: ("white"), size: ("sm"), ...{ class: ("w-8 !p-0") }, }));
        const __VLS_21 = __VLS_20({ ...{ 'onClick': {} }, theme: ("white"), size: ("sm"), ...{ class: ("w-8 !p-0") }, }, ...__VLS_functionalComponentArgsRest(__VLS_20));
        ({}({ ...{ 'onClick': {} }, theme: ("white"), size: ("sm"), ...{ class: ("w-8 !p-0") }, }));
        let __VLS_25;
        const __VLS_26 = {
            onClick: (__VLS_ctx.close)
        };
        // @ts-ignore
        const __VLS_27 = {}
            .BaseIcon;
        ({}.BaseIcon);
        __VLS_components.BaseIcon;
        // @ts-ignore
        [BaseIcon,];
        // @ts-ignore
        const __VLS_28 = __VLS_asFunctionalComponent(__VLS_27, new __VLS_27({ name: ("outline_x"), }));
        const __VLS_29 = __VLS_28({ name: ("outline_x"), }, ...__VLS_functionalComponentArgsRest(__VLS_28));
        ({}({ name: ("outline_x"), }));
        // @ts-ignore
        [close,];
        const __VLS_32 = __VLS_pickFunctionalComponentCtx(__VLS_27, __VLS_29);
        (__VLS_24.slots).default;
        const __VLS_24 = __VLS_pickFunctionalComponentCtx(__VLS_19, __VLS_21);
        let __VLS_22;
        let __VLS_23;
        (__VLS_17.slots).default;
        var __VLS_33 = {};
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("p-6") }, });
        var __VLS_34 = {};
        (__VLS_17.slots).default;
    }
    (__VLS_17.slots).default;
    const __VLS_17 = __VLS_pickFunctionalComponentCtx(__VLS_12, __VLS_14);
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['fixed'];
        __VLS_styleScopedClasses['z-40'];
        __VLS_styleScopedClasses['inset-0'];
        __VLS_styleScopedClasses['overflow-y-auto'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['items-end'];
        __VLS_styleScopedClasses['justify-center'];
        __VLS_styleScopedClasses['min-h-screen'];
        __VLS_styleScopedClasses['pt-4'];
        __VLS_styleScopedClasses['sm:block'];
        __VLS_styleScopedClasses['sm:p-0'];
        __VLS_styleScopedClasses['text-center'];
        __VLS_styleScopedClasses['fixed'];
        __VLS_styleScopedClasses['inset-0'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['items-center'];
        __VLS_styleScopedClasses['justify-center'];
        __VLS_styleScopedClasses['text-white'];
        __VLS_styleScopedClasses['hidden'];
        __VLS_styleScopedClasses['sm:inline-block'];
        __VLS_styleScopedClasses['sm:align-middle'];
        __VLS_styleScopedClasses['sm:h-screen'];
        __VLS_styleScopedClasses['relative'];
        __VLS_styleScopedClasses['inline-block'];
        __VLS_styleScopedClasses['text-left'];
        __VLS_styleScopedClasses['align-bottom'];
        __VLS_styleScopedClasses['bg-white'];
        __VLS_styleScopedClasses['shadow-xl'];
        __VLS_styleScopedClasses['safe-padding-bottom'];
        __VLS_styleScopedClasses['transform'];
        __VLS_styleScopedClasses['sm:my-8'];
        __VLS_styleScopedClasses['sm:align-middle'];
        __VLS_styleScopedClasses['w-full'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['justify-between'];
        __VLS_styleScopedClasses['items-center'];
        __VLS_styleScopedClasses['px-6'];
        __VLS_styleScopedClasses['h-16'];
        __VLS_styleScopedClasses['border-b'];
        __VLS_styleScopedClasses['text-2xl'];
        __VLS_styleScopedClasses['font-bold'];
        __VLS_styleScopedClasses['leading-6'];
        __VLS_styleScopedClasses['text-gray-900'];
        __VLS_styleScopedClasses['truncate'];
        __VLS_styleScopedClasses['w-8'];
        __VLS_styleScopedClasses['!p-0'];
        __VLS_styleScopedClasses['p-6'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    let __VLS_name;
    let __VLS_defineComponent;
    const __VLS_internalComponent = __VLS_defineComponent({
        setup() {
            return {
                proxySize: proxySize,
                close: close,
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

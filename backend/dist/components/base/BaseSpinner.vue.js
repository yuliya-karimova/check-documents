const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const sizes = {
    xs: 'h-4 w-4',
    sm: 'h-5 w-5',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-10 w-10',
    none: ''
};
let __VLS_typeProps;
const props = withDefaults(defineProps(), {
    size: 'md',
    animate: true
});
const emit = defineEmits();
const __VLS_withDefaultsArg = (function (t) { return t; })({
    size: 'md',
    animate: true
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({ ...{ onAnimationiteration: (...[$event]) => {
                __VLS_ctx.emit('animation-iteration');
                // @ts-ignore
                [emit,];
            } }, ...{ class: (([__VLS_ctx.sizes[props.size], props.animate && 'animate-spin'])) }, viewBox: ("0 0 24 24"), fill: ("none"), });
    __VLS_styleScopedClasses = ([sizes[props.size], props.animate && 'animate-spin']);
    __VLS_elementAsFunction(__VLS_intrinsicElements.circle)({ ...{ class: ("opacity-25") }, cx: ("12"), cy: ("12"), r: ("10"), stroke: ("currentColor"), "stroke-width": ("4"), });
    // @ts-ignore
    [sizes,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.path)({ ...{ class: ("opacity-75") }, fill: ("currentColor"), d: ("M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"), });
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['opacity-25'];
        __VLS_styleScopedClasses['opacity-75'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    let __VLS_name;
    let __VLS_defineComponent;
    const __VLS_internalComponent = __VLS_defineComponent({
        setup() {
            return {
                sizes: sizes,
                emit: emit,
            };
        },
        props: {},
        emits: {},
    });
}
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    props: {},
    emits: {},
});
;

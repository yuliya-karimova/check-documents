import { computed } from 'vue';
import icons from './icons.js';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const sizeList = {
    xs: 'h-4 w-4',
    sm: 'h-5 w-5',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-10 w-10',
    none: ''
};
let __VLS_typeProps;
const props = withDefaults(defineProps(), {
    size: 'md'
});
const proxySize = computed(() => props.size && sizeList[props.size]);
const entryIcon = computed(() => props.name && icons[props.name]);
const __VLS_withDefaultsArg = (function (t) { return t; })({
    size: 'md'
});
const __VLS_fnComponent = (await import('vue')).defineComponent({});
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
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    if (__VLS_ctx.entryIcon) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div)({ "data-icon": ((__VLS_ctx.name)), ...{ class: ("flex icon-wrapper items-center justify-center") }, ...{ class: (([__VLS_ctx.proxySize])) }, });
        __VLS_directiveFunction(__VLS_ctx.vHtml)((__VLS_ctx.entryIcon));
        __VLS_styleScopedClasses = ([proxySize]);
        // @ts-ignore
        [entryIcon, entryIcon, name, proxySize, vHtml,];
    }
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['icon-wrapper'];
        __VLS_styleScopedClasses['items-center'];
        __VLS_styleScopedClasses['justify-center'];
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
                entryIcon: entryIcon,
            };
        },
        props: {},
    });
}
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    props: {},
});
;

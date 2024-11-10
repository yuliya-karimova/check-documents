import { ref, onMounted, onUnmounted } from 'vue';
import BaseButton from '@/components/base/button/BaseButton.vue';
import HomeBlock from './components/HomeBlock.vue';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const scrollHeight = ref(0);
const updateScroll = () => {
    scrollHeight.value = window.scrollY || document.documentElement.scrollTop;
};
const scrollToTop = () => {
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
};
onMounted(() => {
    window.addEventListener('scroll', updateScroll);
});
onUnmounted(() => {
    window.removeEventListener('scroll', updateScroll);
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
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)({ ...{ class: ("flex justify-center flex-1 py-12 lg:py-20 px-4 lg:px-8 bg-gray-900") }, });
    // @ts-ignore
    [HomeBlock,];
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(HomeBlock, new HomeBlock({}));
    const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
    ({}({}));
    const __VLS_4 = __VLS_pickFunctionalComponentCtx(HomeBlock, __VLS_1);
    __VLS_elementAsFunction(__VLS_intrinsicElements.footer, __VLS_intrinsicElements.footer)({ ...{ class: ("flex justify-center px-4 lg:px-8 py-8 bg-gray-900") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("max-w-screen-xl w-full") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ alt: ("Косатка Analytics"), ...{ class: ("w-28 h-auto mx-auto") }, src: ("/logo_white.svg"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("fixed bottom-10 right-10") }, });
    // @ts-ignore
    [BaseButton, BaseButton,];
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent(BaseButton, new BaseButton({ ...{ 'onClick': {} }, theme: ("white"), rounded: ("full"), ...{ class: ("h-14 w-14 !p-0") }, ...{ class: ((__VLS_ctx.scrollHeight > 10 ? 'opacity-100' : 'opacity-0')) }, }));
    const __VLS_6 = __VLS_5({ ...{ 'onClick': {} }, theme: ("white"), rounded: ("full"), ...{ class: ("h-14 w-14 !p-0") }, ...{ class: ((__VLS_ctx.scrollHeight > 10 ? 'opacity-100' : 'opacity-0')) }, }, ...__VLS_functionalComponentArgsRest(__VLS_5));
    ({}({ ...{ 'onClick': {} }, theme: ("white"), rounded: ("full"), ...{ class: ("h-14 w-14 !p-0") }, ...{ class: ((__VLS_ctx.scrollHeight > 10 ? 'opacity-100' : 'opacity-0')) }, }));
    __VLS_styleScopedClasses = (scrollHeight > 10 ? 'opacity-100' : 'opacity-0');
    let __VLS_10;
    const __VLS_11 = {
        onClick: (__VLS_ctx.scrollToTop)
    };
    __VLS_elementAsFunction(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({ xmlns: ("http://www.w3.org/2000/svg"), fill: ("none"), viewBox: ("0 0 24 24"), "stroke-width": ("2"), stroke: ("currentColor"), ...{ class: ("w-6 h-6") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.path)({ "stroke-linecap": ("round"), "stroke-linejoin": ("round"), d: ("M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"), });
    // @ts-ignore
    [scrollHeight, scrollToTop,];
    (__VLS_9.slots).default;
    const __VLS_9 = __VLS_pickFunctionalComponentCtx(BaseButton, __VLS_6);
    let __VLS_7;
    let __VLS_8;
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['justify-center'];
        __VLS_styleScopedClasses['flex-1'];
        __VLS_styleScopedClasses['py-12'];
        __VLS_styleScopedClasses['lg:py-20'];
        __VLS_styleScopedClasses['px-4'];
        __VLS_styleScopedClasses['lg:px-8'];
        __VLS_styleScopedClasses['bg-gray-900'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['justify-center'];
        __VLS_styleScopedClasses['px-4'];
        __VLS_styleScopedClasses['lg:px-8'];
        __VLS_styleScopedClasses['py-8'];
        __VLS_styleScopedClasses['bg-gray-900'];
        __VLS_styleScopedClasses['max-w-screen-xl'];
        __VLS_styleScopedClasses['w-full'];
        __VLS_styleScopedClasses['w-28'];
        __VLS_styleScopedClasses['h-auto'];
        __VLS_styleScopedClasses['mx-auto'];
        __VLS_styleScopedClasses['fixed'];
        __VLS_styleScopedClasses['bottom-10'];
        __VLS_styleScopedClasses['right-10'];
        __VLS_styleScopedClasses['h-14'];
        __VLS_styleScopedClasses['w-14'];
        __VLS_styleScopedClasses['!p-0'];
        __VLS_styleScopedClasses['w-6'];
        __VLS_styleScopedClasses['h-6'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    let __VLS_name;
    let __VLS_defineComponent;
    const __VLS_internalComponent = __VLS_defineComponent({
        setup() {
            return {
                BaseButton: BaseButton,
                HomeBlock: HomeBlock,
                scrollHeight: scrollHeight,
                scrollToTop: scrollToTop,
            };
        },
    });
}
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
;

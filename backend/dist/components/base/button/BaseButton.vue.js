import { computed } from 'vue';
import { themes, sizes, justify as justifyMap, rounded as roundedMap } from './themes';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const props = defineProps({
    loading: Boolean,
    disabled: Boolean,
    rounded: {
        type: String,
        default: 'xl'
    },
    look: {
        type: String,
        default: 'solid'
    },
    theme: {
        type: String,
        default: 'primary'
    },
    size: {
        type: String,
        default: 'md'
    },
    type: {
        type: String,
        default: 'button'
    },
    justify: {
        type: String,
        default: 'center'
    }
});
const proxyTheme = computed(() => props.theme && props.look && themes[props.look][props.theme]);
const proxySize = computed(() => props.size && sizes[props.size]);
const proxyRounded = computed(() => props.size && props.rounded && roundedMap[props.rounded]);
const proxyJustify = computed(() => props.justify && justifyMap[props.justify]);
const __VLS_fnComponent = (await import('vue')).defineComponent({
    props: {
        loading: Boolean,
        disabled: Boolean,
        rounded: {
            type: String,
            default: 'xl'
        },
        look: {
            type: String,
            default: 'solid'
        },
        theme: {
            type: String,
            default: 'primary'
        },
        size: {
            type: String,
            default: 'md'
        },
        type: {
            type: String,
            default: 'button'
        },
        justify: {
            type: String,
            default: 'center'
        }
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ class: ("relative inline-flex items-center focus:outline-none transition duration-150 ease-in-out select-none") }, ...{ class: (([
                __VLS_ctx.proxyRounded,
                __VLS_ctx.proxyJustify,
                __VLS_ctx.proxySize,
                __VLS_ctx.proxyTheme,
                (__VLS_ctx.disabled || __VLS_ctx.loading) && 'opacity-70 pointer-events-none'
            ])) }, type: ((__VLS_ctx.type)), disabled: ((__VLS_ctx.disabled || __VLS_ctx.loading)), });
    __VLS_styleScopedClasses = ([
        proxyRounded,
        proxyJustify,
        proxySize,
        proxyTheme,
        (disabled || loading) && 'opacity-70 pointer-events-none'
    ]);
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("inline-flex items-center truncate") }, ...{ class: ((__VLS_ctx.loading && 'opacity-0')) }, });
    __VLS_styleScopedClasses = (loading && 'opacity-0');
    var __VLS_0 = {};
    // @ts-ignore
    [proxyRounded, proxyJustify, proxySize, proxyTheme, disabled, disabled, loading, loading, loading, type,];
    if (__VLS_ctx.loading) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("absolute inset-0 flex items-center justify-center") }, });
        // @ts-ignore
        const __VLS_1 = {}
            .BaseSpinner;
        ({}.BaseSpinner);
        __VLS_components.BaseSpinner;
        // @ts-ignore
        [BaseSpinner,];
        // @ts-ignore
        const __VLS_2 = __VLS_asFunctionalComponent(__VLS_1, new __VLS_1({}));
        const __VLS_3 = __VLS_2({}, ...__VLS_functionalComponentArgsRest(__VLS_2));
        ({}({}));
        // @ts-ignore
        [loading,];
        const __VLS_6 = __VLS_pickFunctionalComponentCtx(__VLS_1, __VLS_3);
    }
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['relative'];
        __VLS_styleScopedClasses['inline-flex'];
        __VLS_styleScopedClasses['items-center'];
        __VLS_styleScopedClasses['focus:outline-none'];
        __VLS_styleScopedClasses['transition'];
        __VLS_styleScopedClasses['duration-150'];
        __VLS_styleScopedClasses['ease-in-out'];
        __VLS_styleScopedClasses['select-none'];
        __VLS_styleScopedClasses['inline-flex'];
        __VLS_styleScopedClasses['items-center'];
        __VLS_styleScopedClasses['truncate'];
        __VLS_styleScopedClasses['absolute'];
        __VLS_styleScopedClasses['inset-0'];
        __VLS_styleScopedClasses['flex'];
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
                proxyTheme: proxyTheme,
                proxySize: proxySize,
                proxyRounded: proxyRounded,
                proxyJustify: proxyJustify,
            };
        },
        props: {
            loading: Boolean,
            disabled: Boolean,
            rounded: {
                type: String,
                default: 'xl'
            },
            look: {
                type: String,
                default: 'solid'
            },
            theme: {
                type: String,
                default: 'primary'
            },
            size: {
                type: String,
                default: 'md'
            },
            type: {
                type: String,
                default: 'button'
            },
            justify: {
                type: String,
                default: 'center'
            }
        },
    });
}
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    props: {
        loading: Boolean,
        disabled: Boolean,
        rounded: {
            type: String,
            default: 'xl'
        },
        look: {
            type: String,
            default: 'solid'
        },
        theme: {
            type: String,
            default: 'primary'
        },
        size: {
            type: String,
            default: 'md'
        },
        type: {
            type: String,
            default: 'button'
        },
        justify: {
            type: String,
            default: 'center'
        }
    },
});
export default {};
;

import { computed } from 'vue';
import { RouterLink } from 'vue-router';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const themes = {
    black: 'text-black hover:text-gray-600 active:text-gray-600 transition duration-150',
    dark: 'text-gray-900 hover:text-gray-600 active:text-gray-600 transition duration-150',
    light: 'text-gray-500 hover:text-gray-400 active:text-gray-600 transition duration-150',
    white: 'text-gray-100 hover:text-gray-300 active:text-gray-400 transition duration-150',
    primary: 'text-primary hover:text-primary-800 active:text-primary-900 transition duration-150',
    success: 'text-green-500 hover:text-green-400 active:text-green-600 transition duration-150',
    destructive: 'text-red-500 hover:text-red-400 active:text-red-600 transition duration-150',
    info: 'text-blue-500 hover:text-blue-400 active:text-blue-600 transition duration-150'
};
const weights = {
    light: 'font-light',
    normal: 'font-normal',
    semibold: 'font-semibold',
    bold: 'font-bold',
    black: 'font-black'
};
const props = defineProps({
    to: {
        type: [Object, String],
        default: undefined
    },
    href: {
        type: String,
        default: ''
    },
    theme: {
        type: [String],
        default: 'primary'
    },
    weight: {
        type: [String],
        default: 'normal'
    },
    target: {
        type: String,
        default: '_self'
    },
    proxyClass: {
        type: String,
        default: 'inline-flex items-center'
    }
});
const proxyTheme = computed(() => props.theme && themes[props.theme]);
const proxyWeight = computed(() => props.weight && weights[props.weight]);
const __VLS_fnComponent = (await import('vue')).defineComponent({
    props: {
        to: {
            type: [Object, String],
            default: undefined
        },
        href: {
            type: String,
            default: ''
        },
        theme: {
            type: [String],
            default: 'primary'
        },
        weight: {
            type: [String],
            default: 'normal'
        },
        target: {
            type: String,
            default: '_self'
        },
        proxyClass: {
            type: String,
            default: 'inline-flex items-center'
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
    if (__VLS_ctx.to) {
        // @ts-ignore
        const __VLS_0 = {}
            .RouterLink;
        ({}.RouterLink);
        ({}.RouterLink);
        __VLS_components.RouterLink;
        __VLS_components.RouterLink;
        // @ts-ignore
        [RouterLink, RouterLink,];
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ ...{ class: (([__VLS_ctx.proxyClass, __VLS_ctx.proxyWeight, __VLS_ctx.proxyTheme])) }, to: ((__VLS_ctx.to)), }));
        const __VLS_2 = __VLS_1({ ...{ class: (([__VLS_ctx.proxyClass, __VLS_ctx.proxyWeight, __VLS_ctx.proxyTheme])) }, to: ((__VLS_ctx.to)), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        ({}({ ...{ class: (([__VLS_ctx.proxyClass, __VLS_ctx.proxyWeight, __VLS_ctx.proxyTheme])) }, to: ((__VLS_ctx.to)), }));
        __VLS_styleScopedClasses = ([proxyClass, proxyWeight, proxyTheme]);
        var __VLS_6 = {};
        // @ts-ignore
        [to, to, proxyClass, proxyWeight, proxyTheme,];
        (__VLS_5.slots).default;
        const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({ ...{ class: (([__VLS_ctx.proxyClass, __VLS_ctx.proxyWeight, __VLS_ctx.proxyTheme])) }, target: ((__VLS_ctx.target)), href: ((__VLS_ctx.href)), });
        __VLS_styleScopedClasses = ([proxyClass, proxyWeight, proxyTheme]);
        var __VLS_7 = {};
        // @ts-ignore
        [proxyClass, proxyWeight, proxyTheme, target, href,];
    }
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
                RouterLink: RouterLink,
                proxyTheme: proxyTheme,
                proxyWeight: proxyWeight,
            };
        },
        props: {
            to: {
                type: [Object, String],
                default: undefined
            },
            href: {
                type: String,
                default: ''
            },
            theme: {
                type: [String],
                default: 'primary'
            },
            weight: {
                type: [String],
                default: 'normal'
            },
            target: {
                type: String,
                default: '_self'
            },
            proxyClass: {
                type: String,
                default: 'inline-flex items-center'
            }
        },
    });
}
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    props: {
        to: {
            type: [Object, String],
            default: undefined
        },
        href: {
            type: String,
            default: ''
        },
        theme: {
            type: [String],
            default: 'primary'
        },
        weight: {
            type: [String],
            default: 'normal'
        },
        target: {
            type: String,
            default: '_self'
        },
        proxyClass: {
            type: String,
            default: 'inline-flex items-center'
        }
    },
});
export default {};
;

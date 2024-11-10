import { computed, getCurrentInstance, nextTick, ref, useSlots, watch } from 'vue';
import { useSimpleInput } from './use-simple-input';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
// hardcode list height to prevent slow DOM calculation
const listMargin = 8;
const listMaxHeight = 256;
const listHeight = listMargin + listMaxHeight;
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
const props = defineProps({
    modelValue: {
        type: [String, Number, Array, Object],
        default: '',
    },
    value: {
        type: [String, Number],
        default: undefined,
    },
    placeholder: {
        type: String,
        default: '',
    },
    emptyPlaceholder: {
        type: String,
        default: 'Nothing to show',
    },
    label: {
        type: String,
        default: '',
    },
    description: {
        type: String,
        default: '',
    },
    rounded: {
        type: String,
        default: 'xl',
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    multiple: {
        type: Boolean,
        default: false,
    },
    loading: {
        type: Boolean,
        default: false,
    },
    name: {
        type: String,
        required: true,
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
    empty: {
        type: String,
        default: undefined,
    },
    options: {
        type: Array,
        default: () => [],
    },
    backgroundClass: {
        type: [String, Array, Object],
        default: 'bg-white',
    },
    disabledBackgroundClass: {
        type: [String, Array, Object],
        default: 'bg-gray-100',
    },
    borderClass: {
        type: [String, Array, Object],
        default: '',
    },
    showClearButton: {
        type: Boolean,
        default: true,
    },
});
const emit = defineEmits(['change', 'update:modelValue']);
const { errorMessage, handleChange, validate } = useSimpleInput(props, getCurrentInstance());
const slots = useSlots();
const hasError = computed(() => !props.disabled && (errorMessage.value || slots.error));
watch(() => props.modelValue, (value) => {
    handleChange(value, false);
});
const focused = ref(-1);
const expanded = ref(false);
const canOpenBottom = ref(true);
const parsedValue = computed(() => {
    let value = props.modelValue ?? props.value;
    if (props.multiple && !Array.isArray(value)) {
        value = [value];
    }
    return value;
});
const proxyOptions = computed(() => {
    const options = [...props.options];
    if (props.empty) {
        options.unshift({
            label: props.empty,
            value: undefined,
        });
    }
    return options;
});
const selectedOptions = computed(() => {
    const value = parsedValue.value;
    return props.options.filter((option) => {
        if (props.multiple && Array.isArray(value)) {
            return (value.includes(option.value) || value.includes(option.value?.toString()));
        }
        return option.value === value;
    });
});
const selectedValues = computed(() => selectedOptions.value.map(({ value }) => value));
const selectedLabels = computed(() => selectedOptions.value.map(({ label }) => label));
const focusedOption = computed(() => proxyOptions.value[focused.value]);
const proxyRounded = computed(() => props.rounded && roundedMap[props.rounded]);
const isShowClearButton = computed(() => props.showClearButton && props.multiple && selectedOptions.value.length > 0);
const labelPadding = computed(() => props.rounded === 'full' ? 'px-6' : 'px-4');
const root = ref(null);
function open() {
    expanded.value = true;
    nextTick(() => {
        checkPosition();
    });
}
function checkPosition() {
    if (root.value) {
        const rectEl = root.value.getBoundingClientRect();
        canOpenBottom.value = window.innerHeight - rectEl.bottom > listHeight;
    }
}
function close() {
    focused.value = -1;
    expanded.value = false;
}
function toggle() {
    if (expanded.value) {
        close();
    }
    else {
        open();
    }
}
function clear() {
    const value = parsedValue.value;
    if (Array.isArray(value)) {
        emit('update:modelValue', []);
        emit('change', undefined);
    }
}
function onKeydown(event) {
    event.preventDefault();
    if (event.key === 'ArrowDown') {
        focused.value++;
        if (!props.options[focused.value]) {
            focused.value = 0;
        }
    }
    if (event.key === 'ArrowUp') {
        focused.value--;
        if (!props.options[focused.value]) {
            focused.value = props.options.length - 1;
        }
    }
    if (event.key === 'Enter' || event.key === 'Escape') {
        const option = props.options[focused.value];
        select(option);
        close();
    }
}
function onSelect(option) {
    select(option);
    if (!props.multiple) {
        close();
    }
}
function select(option) {
    const value = parsedValue.value;
    let result = option.value;
    if (props.multiple && Array.isArray(value)) {
        if (selectedValues.value.includes(option.value)) {
            result = value.filter((v) => {
                if (parseInt(v)) {
                    return parseInt(v) !== option.value;
                }
                return v !== option.value;
            });
        }
        else {
            result = [...value, option.value];
        }
    }
    emit('update:modelValue', result);
    emit('change', option);
    handleChange(result);
}
const __VLS_exposed = {
    validate,
};
defineExpose({
    validate,
});
const __VLS_fnComponent = (await import('vue')).defineComponent({
    props: {
        modelValue: {
            type: [String, Number, Array, Object],
            default: '',
        },
        value: {
            type: [String, Number],
            default: undefined,
        },
        placeholder: {
            type: String,
            default: '',
        },
        emptyPlaceholder: {
            type: String,
            default: 'Nothing to show',
        },
        label: {
            type: String,
            default: '',
        },
        description: {
            type: String,
            default: '',
        },
        rounded: {
            type: String,
            default: 'xl',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        multiple: {
            type: Boolean,
            default: false,
        },
        loading: {
            type: Boolean,
            default: false,
        },
        name: {
            type: String,
            required: true,
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
        empty: {
            type: String,
            default: undefined,
        },
        options: {
            type: Array,
            default: () => [],
        },
        backgroundClass: {
            type: [String, Array, Object],
            default: 'bg-white',
        },
        disabledBackgroundClass: {
            type: [String, Array, Object],
            default: 'bg-gray-100',
        },
        borderClass: {
            type: [String, Array, Object],
            default: '',
        },
        showClearButton: {
            type: Boolean,
            default: true,
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ref: ("root"), ...{ class: ("relative") }, ...{ class: ((__VLS_ctx.hasError && 'has-error')) }, ...{ style: ({}) }, });
    // @ts-ignore
    (__VLS_ctx.root);
    __VLS_styleScopedClasses = (hasError && 'has-error');
    if (__VLS_ctx.label) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ ...{ class: ("block mb-1 text-md font-medium leading-5") }, ...{ class: ((__VLS_ctx.labelPadding)) }, });
        __VLS_styleScopedClasses = (labelPadding);
        (__VLS_ctx.label);
        (__VLS_ctx.required ? '*' : '');
        // @ts-ignore
        [hasError, root, label, label, labelPadding, required,];
    }
    if (__VLS_ctx.description) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("text-xs text-gray-500 mb-1 -mt-1") }, ...{ class: ((__VLS_ctx.labelPadding)) }, });
        __VLS_styleScopedClasses = (labelPadding);
        (__VLS_ctx.description);
        // @ts-ignore
        [labelPadding, description, description,];
    }
    var __VLS_0 = {};
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ((__VLS_ctx.proxyRounded)) }, });
    __VLS_directiveFunction(__VLS_ctx.vClickAway)((__VLS_ctx.close));
    __VLS_styleScopedClasses = (proxyRounded);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex truncate relative") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div)({ ...{ class: ("absolute inset-0 bg-clip-content") }, ...{ class: (([
                __VLS_ctx.disabled ? __VLS_ctx.disabledBackgroundClass : __VLS_ctx.backgroundClass,
                __VLS_ctx.proxyRounded,
            ])) }, });
    __VLS_styleScopedClasses = ([
        disabled ? disabledBackgroundClass : backgroundClass,
        proxyRounded,
    ]);
    // @ts-ignore
    [proxyRounded, proxyRounded, vClickAway, close, disabled, disabledBackgroundClass, backgroundClass,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ ...{ onFocus: (__VLS_ctx.open) }, ...{ onBlur: (__VLS_ctx.close) }, type: ("text"), ...{ class: ("absolute h-0 w-0 pointer-events-none opacity-0") }, "aria-label": (""), name: ((__VLS_ctx.name)), });
    // @ts-ignore
    [close, open, name,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.toggle) }, ...{ onKeydown: (__VLS_ctx.onKeydown) }, ref: ("input"), tabindex: ("-1"), ...{ class: ("relative shadow-sm flex items-center w-full h-10 bg-transparent focus:outline-none focus:shadow-outline-blue transition duration-150 ease-in-out sm:text-sm sm:leading-5 truncate") }, ...{ class: (([
                __VLS_ctx.borderClass || 'border focus:border-blue-300',
                !__VLS_ctx.borderClass && __VLS_ctx.errorMessage ? 'border-red-400' : 'border-gray-300',
                __VLS_ctx.disabled && 'cursor-not-allowed',
                __VLS_ctx.loading && 'pointer-events-none',
                __VLS_ctx.labelPadding,
                __VLS_ctx.proxyRounded,
            ])) }, type: ("button"), disabled: ((__VLS_ctx.disabled)), });
    // @ts-ignore
    (__VLS_ctx.input);
    __VLS_styleScopedClasses = ([
        borderClass || 'border focus:border-blue-300',
        !borderClass && errorMessage ? 'border-red-400' : 'border-gray-300',
        disabled && 'cursor-not-allowed',
        loading && 'pointer-events-none',
        labelPadding,
        proxyRounded,
    ]);
    if (__VLS_ctx.selectedLabels.length > 0 || __VLS_ctx.empty) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("flex-1 text-left truncate") }, });
        (__VLS_ctx.selectedLabels.join(', ') || __VLS_ctx.empty);
        // @ts-ignore
        [labelPadding, proxyRounded, disabled, disabled, toggle, onKeydown, borderClass, borderClass, errorMessage, loading, input, selectedLabels, selectedLabels, empty, empty,];
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("flex-1 w-0 text-left text-gray-400 truncate") }, });
        (__VLS_ctx.placeholder);
        // @ts-ignore
        [placeholder,];
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("flex-shrink-0 ml-3") }, });
    if (__VLS_ctx.loading) {
        // @ts-ignore
        const __VLS_1 = {}
            .BaseSpinner;
        ({}.BaseSpinner);
        __VLS_components.BaseSpinner;
        // @ts-ignore
        [BaseSpinner,];
        // @ts-ignore
        const __VLS_2 = __VLS_asFunctionalComponent(__VLS_1, new __VLS_1({ size: ("xs"), }));
        const __VLS_3 = __VLS_2({ size: ("xs"), }, ...__VLS_functionalComponentArgsRest(__VLS_2));
        ({}({ size: ("xs"), }));
        // @ts-ignore
        [loading,];
        const __VLS_6 = __VLS_pickFunctionalComponentCtx(__VLS_1, __VLS_3);
    }
    else {
        // @ts-ignore
        const __VLS_7 = {}
            .BaseIcon;
        ({}.BaseIcon);
        __VLS_components.BaseIcon;
        // @ts-ignore
        [BaseIcon,];
        // @ts-ignore
        const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({ name: ("outline_chevron_down"), ...{ class: ((__VLS_ctx.expanded && 'transform rotate-180')) }, size: ("xs"), }));
        const __VLS_9 = __VLS_8({ name: ("outline_chevron_down"), ...{ class: ((__VLS_ctx.expanded && 'transform rotate-180')) }, size: ("xs"), }, ...__VLS_functionalComponentArgsRest(__VLS_8));
        ({}({ name: ("outline_chevron_down"), ...{ class: ((__VLS_ctx.expanded && 'transform rotate-180')) }, size: ("xs"), }));
        __VLS_styleScopedClasses = (expanded && 'transform rotate-180');
        // @ts-ignore
        [expanded,];
        const __VLS_12 = __VLS_pickFunctionalComponentCtx(__VLS_7, __VLS_9);
    }
    if (__VLS_ctx.isShowClearButton) {
        // @ts-ignore
        const __VLS_13 = {}
            .BaseButton;
        ({}.BaseButton);
        ({}.BaseButton);
        __VLS_components.BaseButton;
        __VLS_components.BaseButton;
        // @ts-ignore
        [BaseButton, BaseButton,];
        // @ts-ignore
        const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({ ...{ 'onClick': {} }, theme: ("white"), ...{ class: ("relative w-10 !p-0 ml-3 flex-shrink-0") }, tabindex: ("-1"), }));
        const __VLS_15 = __VLS_14({ ...{ 'onClick': {} }, theme: ("white"), ...{ class: ("relative w-10 !p-0 ml-3 flex-shrink-0") }, tabindex: ("-1"), }, ...__VLS_functionalComponentArgsRest(__VLS_14));
        ({}({ ...{ 'onClick': {} }, theme: ("white"), ...{ class: ("relative w-10 !p-0 ml-3 flex-shrink-0") }, tabindex: ("-1"), }));
        let __VLS_19;
        const __VLS_20 = {
            onClick: (__VLS_ctx.clear)
        };
        // @ts-ignore
        const __VLS_21 = {}
            .BaseIcon;
        ({}.BaseIcon);
        __VLS_components.BaseIcon;
        // @ts-ignore
        [BaseIcon,];
        // @ts-ignore
        const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({ name: ("outline_trash"), }));
        const __VLS_23 = __VLS_22({ name: ("outline_trash"), }, ...__VLS_functionalComponentArgsRest(__VLS_22));
        ({}({ name: ("outline_trash"), }));
        // @ts-ignore
        [isShowClearButton, clear,];
        const __VLS_26 = __VLS_pickFunctionalComponentCtx(__VLS_21, __VLS_23);
        (__VLS_18.slots).default;
        const __VLS_18 = __VLS_pickFunctionalComponentCtx(__VLS_13, __VLS_15);
        let __VLS_16;
        let __VLS_17;
    }
    // @ts-ignore
    const __VLS_27 = {}
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
    const __VLS_28 = __VLS_asFunctionalComponent(__VLS_27, new __VLS_27({ enterActiveClass: ("transition-all duration-200"), enterFromClass: ("transform -translate-y-3 opacity-0"), enterToClass: ("transform translate-y-0 opacity-100"), leaveActiveClass: ("transition-all duration-200"), leaveFromClass: ("transform translate-y-0"), leaveToClass: ("transform -translate-y-3 opacity-0"), }));
    const __VLS_29 = __VLS_28({ enterActiveClass: ("transition-all duration-200"), enterFromClass: ("transform -translate-y-3 opacity-0"), enterToClass: ("transform translate-y-0 opacity-100"), leaveActiveClass: ("transition-all duration-200"), leaveFromClass: ("transform translate-y-0"), leaveToClass: ("transform -translate-y-3 opacity-0"), }, ...__VLS_functionalComponentArgsRest(__VLS_28));
    ({}({ enterActiveClass: ("transition-all duration-200"), enterFromClass: ("transform -translate-y-3 opacity-0"), enterToClass: ("transform translate-y-0 opacity-100"), leaveActiveClass: ("transition-all duration-200"), leaveFromClass: ("transform translate-y-0"), leaveToClass: ("transform -translate-y-3 opacity-0"), }));
    if (__VLS_ctx.expanded) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("absolute z-10 left-0 w-full origin-top-left rounded-md shadow-lg") }, ...{ class: ((!__VLS_ctx.canOpenBottom && 'bottom-full')) }, ...{ style: (({ marginTop: `${__VLS_ctx.listMargin}px` })) }, });
        __VLS_styleScopedClasses = (!canOpenBottom && 'bottom-full');
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("rounded-md whitespace-nowrap shadow-xs bg-white overflow-y-auto") }, ...{ style: (({ maxHeight: `${__VLS_ctx.listMaxHeight}px` })) }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("py-2") }, role: ("menu"), "aria-orientation": ("vertical"), });
        if (__VLS_ctx.proxyOptions.length === 0) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("truncate px-4 py-2 text-gray-500") }, });
            (__VLS_ctx.emptyPlaceholder);
            // @ts-ignore
            [expanded, canOpenBottom, listMargin, listMaxHeight, proxyOptions, emptyPlaceholder,];
        }
        for (const [option, idx] of __VLS_getVForSourceType((__VLS_ctx.proxyOptions))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ onClick: (...[$event]) => {
                        if (!((__VLS_ctx.expanded)))
                            return;
                        __VLS_ctx.onSelect(option);
                        // @ts-ignore
                        [proxyOptions, onSelect,];
                    } }, key: ((idx)), ...{ class: ("flex truncate items-center px-4 py-2 cursor-pointer text-gray-500 focus:outline-none") }, ...{ class: (([
                        __VLS_ctx.focusedOption &&
                            __VLS_ctx.focusedOption.value === option.value &&
                            'bg-gray-100 text-gray-800',
                        __VLS_ctx.selectedValues.includes(option.value)
                            ? 'text-primary-500 bg-primary-100'
                            : 'hover:bg-gray-100 hover:text-gray-800',
                    ])) }, role: ("menuitem"), });
            __VLS_styleScopedClasses = ([
                focusedOption &&
                    focusedOption.value === option.value &&
                    'bg-gray-100 text-gray-800',
                selectedValues.includes(option.value)
                    ? 'text-primary-500 bg-primary-100'
                    : 'hover:bg-gray-100 hover:text-gray-800',
            ]);
            if (__VLS_ctx.multiple) {
                // @ts-ignore
                const __VLS_33 = {}
                    .BaseButton;
                ({}.BaseButton);
                ({}.BaseButton);
                __VLS_components.BaseButton;
                __VLS_components.BaseButton;
                // @ts-ignore
                [BaseButton, BaseButton,];
                // @ts-ignore
                const __VLS_34 = __VLS_asFunctionalComponent(__VLS_33, new __VLS_33({ ...{ class: ("w-6 !p-0 mr-3 flex-shrink-0") }, size: ("xs"), tabindex: ("-1"), look: ((__VLS_ctx.selectedValues.includes(option.value) ? 'solid' : 'border')), theme: ((__VLS_ctx.selectedValues.includes(option.value) ? 'primary' : 'white')), }));
                const __VLS_35 = __VLS_34({ ...{ class: ("w-6 !p-0 mr-3 flex-shrink-0") }, size: ("xs"), tabindex: ("-1"), look: ((__VLS_ctx.selectedValues.includes(option.value) ? 'solid' : 'border')), theme: ((__VLS_ctx.selectedValues.includes(option.value) ? 'primary' : 'white')), }, ...__VLS_functionalComponentArgsRest(__VLS_34));
                ({}({ ...{ class: ("w-6 !p-0 mr-3 flex-shrink-0") }, size: ("xs"), tabindex: ("-1"), look: ((__VLS_ctx.selectedValues.includes(option.value) ? 'solid' : 'border')), theme: ((__VLS_ctx.selectedValues.includes(option.value) ? 'primary' : 'white')), }));
                if (__VLS_ctx.selectedValues.includes(option.value)) {
                    // @ts-ignore
                    const __VLS_39 = {}
                        .BaseIcon;
                    ({}.BaseIcon);
                    __VLS_components.BaseIcon;
                    // @ts-ignore
                    [BaseIcon,];
                    // @ts-ignore
                    const __VLS_40 = __VLS_asFunctionalComponent(__VLS_39, new __VLS_39({ name: ("outline_check"), }));
                    const __VLS_41 = __VLS_40({ name: ("outline_check"), }, ...__VLS_functionalComponentArgsRest(__VLS_40));
                    ({}({ name: ("outline_check"), }));
                    // @ts-ignore
                    [focusedOption, focusedOption, selectedValues, selectedValues, selectedValues, selectedValues, multiple,];
                    const __VLS_44 = __VLS_pickFunctionalComponentCtx(__VLS_39, __VLS_41);
                }
                (__VLS_38.slots).default;
                const __VLS_38 = __VLS_pickFunctionalComponentCtx(__VLS_33, __VLS_35);
            }
            var __VLS_45 = {
                option: ((option)),
            };
            __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("flex-1 truncate") }, title: ((option.label || option.value?.toString())), });
            (option.label || option.value);
            (__VLS_32.slots).default;
        }
    }
    (__VLS_32.slots).default;
    const __VLS_32 = __VLS_pickFunctionalComponentCtx(__VLS_27, __VLS_29);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex pt-px text-sm leading-4") }, });
    // @ts-ignore
    const __VLS_46 = {}
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
    const __VLS_47 = __VLS_asFunctionalComponent(__VLS_46, new __VLS_46({ enterActiveClass: ("transition-all duration-300"), enterFromClass: ("transform -translate-y-3 opacity-0"), enterToClass: ("transform translate-y-0 opacity-100"), leaveActiveClass: ("transition-all duration-300"), leaveFromClass: ("transform translate-y-0"), leaveToClass: ("transform -translate-y-3 opacity-0"), }));
    const __VLS_48 = __VLS_47({ enterActiveClass: ("transition-all duration-300"), enterFromClass: ("transform -translate-y-3 opacity-0"), enterToClass: ("transform translate-y-0 opacity-100"), leaveActiveClass: ("transition-all duration-300"), leaveFromClass: ("transform translate-y-0"), leaveToClass: ("transform -translate-y-3 opacity-0"), }, ...__VLS_functionalComponentArgsRest(__VLS_47));
    ({}({ enterActiveClass: ("transition-all duration-300"), enterFromClass: ("transform -translate-y-3 opacity-0"), enterToClass: ("transform translate-y-0 opacity-100"), leaveActiveClass: ("transition-all duration-300"), leaveFromClass: ("transform translate-y-0"), leaveToClass: ("transform -translate-y-3 opacity-0"), }));
    if (__VLS_ctx.hasError) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("text-red-600 mt-1") }, ...{ class: ((__VLS_ctx.labelPadding)) }, });
        __VLS_styleScopedClasses = (labelPadding);
        var __VLS_52 = {};
        // @ts-ignore
        [hasError, labelPadding,];
        (__VLS_ctx.errorMessage);
        // @ts-ignore
        [errorMessage,];
        (__VLS_51.slots).default;
    }
    (__VLS_51.slots).default;
    const __VLS_51 = __VLS_pickFunctionalComponentCtx(__VLS_46, __VLS_48);
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['relative'];
        __VLS_styleScopedClasses['block'];
        __VLS_styleScopedClasses['mb-1'];
        __VLS_styleScopedClasses['text-md'];
        __VLS_styleScopedClasses['font-medium'];
        __VLS_styleScopedClasses['leading-5'];
        __VLS_styleScopedClasses['text-xs'];
        __VLS_styleScopedClasses['text-gray-500'];
        __VLS_styleScopedClasses['mb-1'];
        __VLS_styleScopedClasses['-mt-1'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['truncate'];
        __VLS_styleScopedClasses['relative'];
        __VLS_styleScopedClasses['absolute'];
        __VLS_styleScopedClasses['inset-0'];
        __VLS_styleScopedClasses['bg-clip-content'];
        __VLS_styleScopedClasses['absolute'];
        __VLS_styleScopedClasses['h-0'];
        __VLS_styleScopedClasses['w-0'];
        __VLS_styleScopedClasses['pointer-events-none'];
        __VLS_styleScopedClasses['opacity-0'];
        __VLS_styleScopedClasses['relative'];
        __VLS_styleScopedClasses['shadow-sm'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['items-center'];
        __VLS_styleScopedClasses['w-full'];
        __VLS_styleScopedClasses['h-10'];
        __VLS_styleScopedClasses['bg-transparent'];
        __VLS_styleScopedClasses['focus:outline-none'];
        __VLS_styleScopedClasses['focus:shadow-outline-blue'];
        __VLS_styleScopedClasses['transition'];
        __VLS_styleScopedClasses['duration-150'];
        __VLS_styleScopedClasses['ease-in-out'];
        __VLS_styleScopedClasses['sm:text-sm'];
        __VLS_styleScopedClasses['sm:leading-5'];
        __VLS_styleScopedClasses['truncate'];
        __VLS_styleScopedClasses['flex-1'];
        __VLS_styleScopedClasses['text-left'];
        __VLS_styleScopedClasses['truncate'];
        __VLS_styleScopedClasses['flex-1'];
        __VLS_styleScopedClasses['w-0'];
        __VLS_styleScopedClasses['text-left'];
        __VLS_styleScopedClasses['text-gray-400'];
        __VLS_styleScopedClasses['truncate'];
        __VLS_styleScopedClasses['flex-shrink-0'];
        __VLS_styleScopedClasses['ml-3'];
        __VLS_styleScopedClasses['relative'];
        __VLS_styleScopedClasses['w-10'];
        __VLS_styleScopedClasses['!p-0'];
        __VLS_styleScopedClasses['ml-3'];
        __VLS_styleScopedClasses['flex-shrink-0'];
        __VLS_styleScopedClasses['absolute'];
        __VLS_styleScopedClasses['z-10'];
        __VLS_styleScopedClasses['left-0'];
        __VLS_styleScopedClasses['w-full'];
        __VLS_styleScopedClasses['origin-top-left'];
        __VLS_styleScopedClasses['rounded-md'];
        __VLS_styleScopedClasses['shadow-lg'];
        __VLS_styleScopedClasses['rounded-md'];
        __VLS_styleScopedClasses['whitespace-nowrap'];
        __VLS_styleScopedClasses['shadow-xs'];
        __VLS_styleScopedClasses['bg-white'];
        __VLS_styleScopedClasses['overflow-y-auto'];
        __VLS_styleScopedClasses['py-2'];
        __VLS_styleScopedClasses['truncate'];
        __VLS_styleScopedClasses['px-4'];
        __VLS_styleScopedClasses['py-2'];
        __VLS_styleScopedClasses['text-gray-500'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['truncate'];
        __VLS_styleScopedClasses['items-center'];
        __VLS_styleScopedClasses['px-4'];
        __VLS_styleScopedClasses['py-2'];
        __VLS_styleScopedClasses['cursor-pointer'];
        __VLS_styleScopedClasses['text-gray-500'];
        __VLS_styleScopedClasses['focus:outline-none'];
        __VLS_styleScopedClasses['w-6'];
        __VLS_styleScopedClasses['!p-0'];
        __VLS_styleScopedClasses['mr-3'];
        __VLS_styleScopedClasses['flex-shrink-0'];
        __VLS_styleScopedClasses['flex-1'];
        __VLS_styleScopedClasses['truncate'];
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
                listMargin: listMargin,
                listMaxHeight: listMaxHeight,
                errorMessage: errorMessage,
                hasError: hasError,
                expanded: expanded,
                canOpenBottom: canOpenBottom,
                proxyOptions: proxyOptions,
                selectedValues: selectedValues,
                selectedLabels: selectedLabels,
                focusedOption: focusedOption,
                proxyRounded: proxyRounded,
                isShowClearButton: isShowClearButton,
                labelPadding: labelPadding,
                root: root,
                open: open,
                close: close,
                toggle: toggle,
                clear: clear,
                onKeydown: onKeydown,
                onSelect: onSelect,
            };
        },
        props: {
            modelValue: {
                type: [String, Number, Array, Object],
                default: '',
            },
            value: {
                type: [String, Number],
                default: undefined,
            },
            placeholder: {
                type: String,
                default: '',
            },
            emptyPlaceholder: {
                type: String,
                default: 'Nothing to show',
            },
            label: {
                type: String,
                default: '',
            },
            description: {
                type: String,
                default: '',
            },
            rounded: {
                type: String,
                default: 'xl',
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            multiple: {
                type: Boolean,
                default: false,
            },
            loading: {
                type: Boolean,
                default: false,
            },
            name: {
                type: String,
                required: true,
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
            empty: {
                type: String,
                default: undefined,
            },
            options: {
                type: Array,
                default: () => [],
            },
            backgroundClass: {
                type: [String, Array, Object],
                default: 'bg-white',
            },
            disabledBackgroundClass: {
                type: [String, Array, Object],
                default: 'bg-gray-100',
            },
            borderClass: {
                type: [String, Array, Object],
                default: '',
            },
            showClearButton: {
                type: Boolean,
                default: true,
            },
        },
        emits: {},
    });
}
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
        return {
            ...__VLS_exposed,
        };
    },
    props: {
        modelValue: {
            type: [String, Number, Array, Object],
            default: '',
        },
        value: {
            type: [String, Number],
            default: undefined,
        },
        placeholder: {
            type: String,
            default: '',
        },
        emptyPlaceholder: {
            type: String,
            default: 'Nothing to show',
        },
        label: {
            type: String,
            default: '',
        },
        description: {
            type: String,
            default: '',
        },
        rounded: {
            type: String,
            default: 'xl',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        multiple: {
            type: Boolean,
            default: false,
        },
        loading: {
            type: Boolean,
            default: false,
        },
        name: {
            type: String,
            required: true,
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
        empty: {
            type: String,
            default: undefined,
        },
        options: {
            type: Array,
            default: () => [],
        },
        backgroundClass: {
            type: [String, Array, Object],
            default: 'bg-white',
        },
        disabledBackgroundClass: {
            type: [String, Array, Object],
            default: 'bg-gray-100',
        },
        borderClass: {
            type: [String, Array, Object],
            default: '',
        },
        showClearButton: {
            type: Boolean,
            default: true,
        },
    },
    emits: {},
});
export default {};
;

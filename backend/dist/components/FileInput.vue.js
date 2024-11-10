import { ref } from 'vue';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const emit = defineEmits(['uploaded']);
const selectedFile = ref(null);
const onFileChange = (event) => {
    const target = event.target;
    const file = target.files ? target.files[0] : null;
    if (file) {
        selectedFile.value = file;
        emit('uploaded', file); // Передаём файл, а не текст
    }
};
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
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("file-upload") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ ...{ onChange: (__VLS_ctx.onFileChange) }, type: ("file"), accept: (".docx,.pdf"), ...{ class: ("bg-primary-700 hover:bg-primary-600 transition p-2 rounded-xl text-white cursor-pointer") }, });
    // @ts-ignore
    [onFileChange,];
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['file-upload'];
        __VLS_styleScopedClasses['bg-primary-700'];
        __VLS_styleScopedClasses['hover:bg-primary-600'];
        __VLS_styleScopedClasses['transition'];
        __VLS_styleScopedClasses['p-2'];
        __VLS_styleScopedClasses['rounded-xl'];
        __VLS_styleScopedClasses['text-white'];
        __VLS_styleScopedClasses['cursor-pointer'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    let __VLS_name;
    let __VLS_defineComponent;
    const __VLS_internalComponent = __VLS_defineComponent({
        setup() {
            return {
                onFileChange: onFileChange,
            };
        },
        emits: {},
    });
}
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    emits: {},
});
;

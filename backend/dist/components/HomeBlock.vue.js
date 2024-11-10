import { ref } from 'vue';
import { useCheckStore } from '@/stores/check';
import BaseButton from '@/components/base/button/BaseButton.vue';
import MarkdownBlock from '@/components/MarkdownBlock.vue';
import FileInput from '@/components/FileInput.vue';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const ucFile = ref(null); // Файл для UC-number
const sstsFile = ref(null); // Файл для SSTS-number
const onFileUploadUC = (file) => {
    ucFile.value = file; // Сохраняем файл UC-number
};
const onFileUploadSSTS = (file) => {
    sstsFile.value = file; // Сохраняем файл SSTS-number
};
const isChecking = ref(false);
const checkingText = ref('');
const checkResult = ref('');
const docxUrl = ref('');
const pdfUrl = ref('');
const csvUrl = ref('');
// Фразы пайплайна для отображения
const phrases = [
    'Обработка контекста для удаления нерелевантной информации...',
    'Формирование вопросов...',
    'Проверка контекста на релевантность...',
    'Создание цепочки рассуждений с помощью LlaMA...',
    'Работа RoBERTa , специально обученной для задачи определения текстовых отношений NLI...',
    'Пошаговая обработка ответа...',
    'Проверка, является ли ответ обоснованным на контексте...',
    'Суммация заключения...'
];
let phraseIndex = 0;
let intervalId = null;
const startPhraseRotation = () => {
    intervalId = setInterval(() => {
        checkingText.value = phrases[phraseIndex];
        phraseIndex = (phraseIndex + 1) % phrases.length; // Зацикливаем индекс
    }, 2000); // Интервал 2 секунды (можно изменить)
};
const stopPhraseRotation = () => {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
};
const checkStore = useCheckStore();
const checkCase = async () => {
    if (!ucFile.value || !sstsFile.value)
        return; // Проверяем, что оба файла загружены
    isChecking.value = true;
    startPhraseRotation();
    const response = await checkStore.checkCase(ucFile.value, sstsFile.value);
    checkResult.value = response.full_text;
    docxUrl.value = checkStore.getDownloadLink(response.docx_url);
    pdfUrl.value = checkStore.getDownloadLink(response.pdf_url);
    if (response.csv_url) {
        csvUrl.value = checkStore.getDownloadLink(response.csv_url);
    }
    isChecking.value = false;
    stopPhraseRotation();
};
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("max-w-screen-xl w-full flex flex-col gap-20") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col sm:flex-row items-center gap-6 lg:gap-12 font-mont max-sm:text-center") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("text-2xl sm:text-2xl lg:text-3xl uppercase font-bold text-white") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col gap-12") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex gap-6 items-end flex-wrap") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("text-white mb-2") }, });
    // @ts-ignore
    [FileInput,];
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(FileInput, new FileInput({ ...{ 'onUploaded': {} }, }));
    const __VLS_1 = __VLS_0({ ...{ 'onUploaded': {} }, }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    ({}({ ...{ 'onUploaded': {} }, }));
    let __VLS_5;
    const __VLS_6 = {
        onUploaded: (__VLS_ctx.onFileUploadUC)
    };
    // @ts-ignore
    [onFileUploadUC,];
    const __VLS_4 = __VLS_pickFunctionalComponentCtx(FileInput, __VLS_1);
    let __VLS_2;
    let __VLS_3;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("text-white mb-2") }, });
    // @ts-ignore
    [FileInput,];
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(FileInput, new FileInput({ ...{ 'onUploaded': {} }, }));
    const __VLS_8 = __VLS_7({ ...{ 'onUploaded': {} }, }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    ({}({ ...{ 'onUploaded': {} }, }));
    let __VLS_12;
    const __VLS_13 = {
        onUploaded: (__VLS_ctx.onFileUploadSSTS)
    };
    // @ts-ignore
    [onFileUploadSSTS,];
    const __VLS_11 = __VLS_pickFunctionalComponentCtx(FileInput, __VLS_8);
    let __VLS_9;
    let __VLS_10;
    // @ts-ignore
    [BaseButton, BaseButton,];
    // @ts-ignore
    const __VLS_14 = __VLS_asFunctionalComponent(BaseButton, new BaseButton({ ...{ 'onClick': {} }, theme: ("secondary"), ...{ class: ("h-[46px]") }, disabled: ((!__VLS_ctx.ucFile || !__VLS_ctx.sstsFile)), }));
    const __VLS_15 = __VLS_14({ ...{ 'onClick': {} }, theme: ("secondary"), ...{ class: ("h-[46px]") }, disabled: ((!__VLS_ctx.ucFile || !__VLS_ctx.sstsFile)), }, ...__VLS_functionalComponentArgsRest(__VLS_14));
    ({}({ ...{ 'onClick': {} }, theme: ("secondary"), ...{ class: ("h-[46px]") }, disabled: ((!__VLS_ctx.ucFile || !__VLS_ctx.sstsFile)), }));
    let __VLS_19;
    const __VLS_20 = {
        onClick: (__VLS_ctx.checkCase)
    };
    // @ts-ignore
    [ucFile, sstsFile, checkCase,];
    (__VLS_18.slots).default;
    const __VLS_18 = __VLS_pickFunctionalComponentCtx(BaseButton, __VLS_15);
    let __VLS_16;
    let __VLS_17;
    if (__VLS_ctx.isChecking) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("text-white mb-2 opacity-45") }, });
        // @ts-ignore
        [isChecking,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("text-white font-bold") }, });
        (__VLS_ctx.checkingText);
        // @ts-ignore
        [checkingText,];
    }
    else if (__VLS_ctx.checkResult) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col gap-24") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("text-3xl font-bold text-accent-500 mb-6") }, });
        // @ts-ignore
        [checkResult,];
        // @ts-ignore
        [MarkdownBlock,];
        // @ts-ignore
        const __VLS_21 = __VLS_asFunctionalComponent(MarkdownBlock, new MarkdownBlock({ content: ((__VLS_ctx.checkResult)), }));
        const __VLS_22 = __VLS_21({ content: ((__VLS_ctx.checkResult)), }, ...__VLS_functionalComponentArgsRest(__VLS_21));
        ({}({ content: ((__VLS_ctx.checkResult)), }));
        // @ts-ignore
        [checkResult,];
        const __VLS_25 = __VLS_pickFunctionalComponentCtx(MarkdownBlock, __VLS_22);
        if (__VLS_ctx.docxUrl && __VLS_ctx.pdfUrl && !__VLS_ctx.isChecking) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("text-xl font-bold text-accent-500 mb-4") }, });
            // @ts-ignore
            [isChecking, docxUrl, pdfUrl,];
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex items-center gap-2") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({ href: ((__VLS_ctx.docxUrl)), target: ("_blank"), download: (true), });
            // @ts-ignore
            [BaseButton, BaseButton,];
            // @ts-ignore
            const __VLS_26 = __VLS_asFunctionalComponent(BaseButton, new BaseButton({ theme: ("primary"), }));
            const __VLS_27 = __VLS_26({ theme: ("primary"), }, ...__VLS_functionalComponentArgsRest(__VLS_26));
            ({}({ theme: ("primary"), }));
            // @ts-ignore
            [docxUrl,];
            (__VLS_30.slots).default;
            const __VLS_30 = __VLS_pickFunctionalComponentCtx(BaseButton, __VLS_27);
            __VLS_elementAsFunction(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({ href: ((__VLS_ctx.pdfUrl)), target: ("_blank"), download: (true), });
            // @ts-ignore
            [BaseButton, BaseButton,];
            // @ts-ignore
            const __VLS_31 = __VLS_asFunctionalComponent(BaseButton, new BaseButton({ theme: ("primary"), }));
            const __VLS_32 = __VLS_31({ theme: ("primary"), }, ...__VLS_functionalComponentArgsRest(__VLS_31));
            ({}({ theme: ("primary"), }));
            // @ts-ignore
            [pdfUrl,];
            (__VLS_35.slots).default;
            const __VLS_35 = __VLS_pickFunctionalComponentCtx(BaseButton, __VLS_32);
            if (__VLS_ctx.csvUrl) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({ href: ((__VLS_ctx.csvUrl)), target: ("_blank"), download: (true), });
                // @ts-ignore
                [BaseButton, BaseButton,];
                // @ts-ignore
                const __VLS_36 = __VLS_asFunctionalComponent(BaseButton, new BaseButton({ theme: ("secondary"), }));
                const __VLS_37 = __VLS_36({ theme: ("secondary"), }, ...__VLS_functionalComponentArgsRest(__VLS_36));
                ({}({ theme: ("secondary"), }));
                // @ts-ignore
                [csvUrl, csvUrl,];
                (__VLS_40.slots).default;
                const __VLS_40 = __VLS_pickFunctionalComponentCtx(BaseButton, __VLS_37);
            }
        }
    }
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['max-w-screen-xl'];
        __VLS_styleScopedClasses['w-full'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['flex-col'];
        __VLS_styleScopedClasses['gap-20'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['flex-col'];
        __VLS_styleScopedClasses['sm:flex-row'];
        __VLS_styleScopedClasses['items-center'];
        __VLS_styleScopedClasses['gap-6'];
        __VLS_styleScopedClasses['lg:gap-12'];
        __VLS_styleScopedClasses['font-mont'];
        __VLS_styleScopedClasses['max-sm:text-center'];
        __VLS_styleScopedClasses['text-2xl'];
        __VLS_styleScopedClasses['sm:text-2xl'];
        __VLS_styleScopedClasses['lg:text-3xl'];
        __VLS_styleScopedClasses['uppercase'];
        __VLS_styleScopedClasses['font-bold'];
        __VLS_styleScopedClasses['text-white'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['flex-col'];
        __VLS_styleScopedClasses['gap-12'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['gap-6'];
        __VLS_styleScopedClasses['items-end'];
        __VLS_styleScopedClasses['flex-wrap'];
        __VLS_styleScopedClasses['text-white'];
        __VLS_styleScopedClasses['mb-2'];
        __VLS_styleScopedClasses['text-white'];
        __VLS_styleScopedClasses['mb-2'];
        __VLS_styleScopedClasses['h-[46px]'];
        __VLS_styleScopedClasses['text-white'];
        __VLS_styleScopedClasses['mb-2'];
        __VLS_styleScopedClasses['opacity-45'];
        __VLS_styleScopedClasses['text-white'];
        __VLS_styleScopedClasses['font-bold'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['flex-col'];
        __VLS_styleScopedClasses['gap-24'];
        __VLS_styleScopedClasses['text-3xl'];
        __VLS_styleScopedClasses['font-bold'];
        __VLS_styleScopedClasses['text-accent-500'];
        __VLS_styleScopedClasses['mb-6'];
        __VLS_styleScopedClasses['text-xl'];
        __VLS_styleScopedClasses['font-bold'];
        __VLS_styleScopedClasses['text-accent-500'];
        __VLS_styleScopedClasses['mb-4'];
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['items-center'];
        __VLS_styleScopedClasses['gap-2'];
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
                MarkdownBlock: MarkdownBlock,
                FileInput: FileInput,
                ucFile: ucFile,
                sstsFile: sstsFile,
                onFileUploadUC: onFileUploadUC,
                onFileUploadSSTS: onFileUploadSSTS,
                isChecking: isChecking,
                checkingText: checkingText,
                checkResult: checkResult,
                docxUrl: docxUrl,
                pdfUrl: pdfUrl,
                csvUrl: csvUrl,
                checkCase: checkCase,
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

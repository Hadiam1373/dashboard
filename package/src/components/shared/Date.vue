<!--<script setup>-->
<!--import VueDatePicker from '@vuepic/vue-datepicker';-->
<!--import '@vuepic/vue-datepicker/dist/main.css'-->
<!--import {useTheme, useLocale} from 'vuetify'-->
<!--import {faIR} from 'date-fns/locale';-->
<!--import {computed, ref} from 'vue';-->
<!--const props = defineProps(['modelValue'])-->
<!--// const emit = defineEmits(['setDate'])-->

<!--const date = ref(Date.now());-->
<!--const theme = useTheme()-->
<!--const locale = useLocale()-->
<!--let days = ref()-->

<!--let computedTheme = computed(() => {-->
<!--    return theme.global.name.value !== 'light';-->
<!--})-->


<!--let computedLocal = computed(() => {-->
<!--    if (locale.current.value === 'fa') {-->
<!--        days.value = ['شنبه', '۱ شنبه', '۲ شنبه', '۳ شنبه', '۴ شنبه', '۵ شنبه', 'جمعه']-->
<!--    } else {-->
<!--        days.value = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']-->
<!--    }-->
<!--    return days.value-->
<!--})-->

<!--const format = (date) => {-->
<!--    const options = {-->
<!--        weekday: 'short',-->
<!--        year: 'numeric',-->
<!--        month: 'long',-->
<!--        day: 'numeric'-->
<!--    };-->

<!--    if (locale.current.value === 'fa') {-->
<!--        return new Intl.DateTimeFormat('fa-IR', options).format(date);-->
<!--    } else {-->
<!--        return new Intl.DateTimeFormat('en', options).format(date);-->
<!--    }-->

<!--};-->

<!--</script>-->


<!--<template>-->
<!--    <VueDatePicker  :format-locale="faIR" required-->
<!--                   :model-value="date"  @update:model-value="$emit('setDate' , date)"-->
<!--                   :locale="locale.current.value"-->
<!--                   :format="format"-->
<!--                   :dark="computedTheme" model-type='timestamp' input-class-name="v-field__input v-field&#45;&#45;variant-outlined"-->
<!--                   :cancel-text="$vuetify.locale.t(`$vuetify.close`)"-->
<!--                   :select-text="$vuetify.locale.t(`$vuetify.submit`)"-->
<!--                   :day-names="computedLocal" position="center">-->
<!--        <template #action-preview="{ value }">-->
<!--            <div class="d-block w-100 mb-5">-->
<!--                {{ format(value) }}-->
<!--            </div>-->
<!--        </template>-->
<!--    </VueDatePicker>-->
<!--    <div class="v-input__details"></div>-->
<!--</template>-->

<!--<style>-->
<!--.datepicker-container {-->
<!--    font-family: IRANSans, sans-serif !important;-->
<!--}-->

<!--.v-theme&#45;&#45;dark .dp__theme_dark {-->
<!--    &#45;&#45;dp-background-color: #2F3349;-->
<!--    &#45;&#45;dp-text-color: #ffffff;-->
<!--    &#45;&#45;dp-hover-color: #484848;-->
<!--    &#45;&#45;dp-hover-text-color: #ffffff;-->
<!--    &#45;&#45;dp-hover-icon-color: #959595;-->
<!--    &#45;&#45;dp-primary-color: #00D1BC;-->
<!--    &#45;&#45;dp-primary-text-color: #ffffff;-->
<!--    &#45;&#45;dp-secondary-color: #A8AAAE;-->
<!--    &#45;&#45;dp-border-color: rgba(208, 212, 241, 0.30);-->
<!--    &#45;&#45;dp-menu-border-color: rgba(208, 212, 241, 0.16);-->
<!--    &#45;&#45;dp-border-color-hover: #aaaeb7;-->
<!--    &#45;&#45;dp-disabled-color: #737373;-->
<!--    &#45;&#45;dp-scroll-bar-background: #212121;-->
<!--    &#45;&#45;dp-scroll-bar-color: #484848;-->
<!--    &#45;&#45;dp-success-color: #00701a;-->
<!--    &#45;&#45;dp-success-color-disabled: #428f59;-->
<!--    &#45;&#45;dp-icon-color: #959595;-->
<!--    &#45;&#45;dp-danger-color: #e53935;-->
<!--    &#45;&#45;dp-highlight-color: rgba(0, 92, 178, 0.2);-->
<!--}-->

<!--.v-theme&#45;&#45;light .dp__theme_light {-->
<!--    &#45;&#45;dp-background-color: #fff;-->
<!--    &#45;&#45;dp-text-color: #212121;-->
<!--    &#45;&#45;dp-hover-color: #f3f3f3;-->
<!--    &#45;&#45;dp-hover-text-color: #212121;-->
<!--    &#45;&#45;dp-hover-icon-color: #959595;-->
<!--    &#45;&#45;dp-primary-color: #00D1BC;-->
<!--    &#45;&#45;dp-primary-text-color: #f8f5f5;-->
<!--    &#45;&#45;dp-secondary-color: #c0c4cc;-->
<!--    &#45;&#45;dp-border-color: rgba(47, 43, 61, 0.16);-->
<!--    &#45;&#45;dp-menu-border-color: rgba(47, 43, 61, 0.16);-->
<!--    &#45;&#45;dp-border-color-hover: #aaaeb7;-->
<!--    &#45;&#45;dp-disabled-color: #f6f6f6;-->
<!--    &#45;&#45;dp-scroll-bar-background: #f3f3f3;-->
<!--    &#45;&#45;dp-scroll-bar-color: #959595;-->
<!--    &#45;&#45;dp-success-color: #76d275;-->
<!--    &#45;&#45;dp-success-color-disabled: #a3d9b1;-->
<!--    &#45;&#45;dp-icon-color: #959595;-->
<!--    &#45;&#45;dp-danger-color: #ff6f60;-->
<!--    &#45;&#45;dp-highlight-color: rgba(25, 118, 210, 0.1);-->
<!--}-->

<!--.dp__action_row {-->
<!--    flex-flow: column !important;-->
<!--}-->
<!--</style>-->
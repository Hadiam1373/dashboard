<script setup>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import {useTheme, useLocale} from 'vuetify'
import {faIR} from 'date-fns/locale';
import {computed, ref} from 'vue';
defineProps(['modelValue'])
const emit = defineEmits(['setDate'])

const date = ref(Date.now());
const theme = useTheme()
const locale = useLocale()
let days = ref()

let computedTheme = computed(() => {
    return theme.global.name.value !== 'light';
})

const handleDate = (modelData) => {
    date.value = modelData;
    emit('setDate' , modelData)
}

let computedLocal = computed(() => {
    if (locale.current.value === 'fa') {
        days.value = ['شنبه', '۱ شنبه', '۲ شنبه', '۳ شنبه', '۴ شنبه', '۵ شنبه', 'جمعه']
    } else {
        days.value = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    }
    return days.value
})

const format = (date) => {
    const options = {
        weekday: 'short',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    if (locale.current.value === 'fa') {
        return new Intl.DateTimeFormat('fa-IR', options).format(date);
    } else {
        return new Intl.DateTimeFormat('en', options).format(date);
    }

};

</script>


<template>
    <VueDatePicker :enable-time-picker="false" :format-locale="faIR" required
                   :model-value="date"  @update:model-value="handleDate"
                   :locale="locale.current.value"
                   :format="format"
                   :dark="computedTheme" model-type='timestamp' input-class-name="v-field__input v-field--variant-outlined"
                   :cancel-text="$vuetify.locale.t(`$vuetify.close`)"
                   :select-text="$vuetify.locale.t(`$vuetify.submit`)"
                   :day-names="computedLocal" position="center">
        <template #action-preview="{ value }">
            <div class="d-block w-100 mb-5">
                {{ format(value) }}
            </div>
        </template>
    </VueDatePicker>
    <div class="v-input__details"></div>
</template>

<style>
.datepicker-container {
    font-family: IRANSans, sans-serif !important;
}

.v-theme--dark .dp__theme_dark {
    --dp-background-color: #2F3349;
    --dp-text-color: #ffffff;
    --dp-hover-color: #484848;
    --dp-hover-text-color: #ffffff;
    --dp-hover-icon-color: #959595;
    --dp-primary-color: #00D1BC;
    --dp-primary-text-color: #ffffff;
    --dp-secondary-color: #A8AAAE;
    --dp-border-color: rgba(208, 212, 241, 0.30);
    --dp-menu-border-color: rgba(208, 212, 241, 0.16);
    --dp-border-color-hover: #aaaeb7;
    --dp-disabled-color: #737373;
    --dp-scroll-bar-background: #212121;
    --dp-scroll-bar-color: #484848;
    --dp-success-color: #00701a;
    --dp-success-color-disabled: #428f59;
    --dp-icon-color: #959595;
    --dp-danger-color: #e53935;
    --dp-highlight-color: rgba(0, 92, 178, 0.2);
}

.v-theme--light .dp__theme_light {
    --dp-background-color: #fff;
    --dp-text-color: #212121;
    --dp-hover-color: #f3f3f3;
    --dp-hover-text-color: #212121;
    --dp-hover-icon-color: #959595;
    --dp-primary-color: #00D1BC;
    --dp-primary-text-color: #f8f5f5;
    --dp-secondary-color: #c0c4cc;
    --dp-border-color: rgba(47, 43, 61, 0.16);
    --dp-menu-border-color: rgba(47, 43, 61, 0.16);
    --dp-border-color-hover: #aaaeb7;
    --dp-disabled-color: #f6f6f6;
    --dp-scroll-bar-background: #f3f3f3;
    --dp-scroll-bar-color: #959595;
    --dp-success-color: #76d275;
    --dp-success-color-disabled: #a3d9b1;
    --dp-icon-color: #959595;
    --dp-danger-color: #ff6f60;
    --dp-highlight-color: rgba(25, 118, 210, 0.1);
}

.dp__action_row {
    flex-flow: column !important;
}
</style>
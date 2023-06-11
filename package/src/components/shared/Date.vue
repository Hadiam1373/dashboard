<script setup>
import {ref} from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const date = ref();
</script>

<template>
    <VueDatePicker v-model="date" locale="fa"
                   :day-names="['شنبه', '۱ شنبه', '۲ شنبه', '۳ شنبه', '۴ شنبه', '۵ شنبه', 'جمعه']">
    </VueDatePicker>
</template>
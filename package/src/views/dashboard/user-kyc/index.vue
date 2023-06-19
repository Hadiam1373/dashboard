<template>
    <Steppy v-model:step="step" primaryColor1="#00D1BC" nextText="مرحله بعد" backText="مرحله قبل" :tabs="tabs" loading="true">
            <template #1>
                <step1 @stepOne="next"/>
            </template>
            <template #2>
                <step2/>
            </template>
            <template #3>
                <step3/>
            </template>
    </Steppy>
<!--    <div class="d-flex w-100 justify-space-between align-center">-->
<!--        <v-btn color="secondary" class="ml-auto" v-if="step > 1" @click="step&#45;&#45;">مرحله قبل</v-btn>-->
<!--        <v-btn color="primary" class="mr-auto" :disabled="active2" v-if="step === 1" @click="step++">مرحله بعد</v-btn>-->
<!--        <v-btn color="primary" class="mr-auto" :disabled="active1" v-if="step === 2" @click="step++">مرحله بعد</v-btn>-->
<!--        <v-btn color="primary" class="mr-auto" v-if="step === 3"  type="submit">اعتبار سنجی</v-btn>-->
<!--    </div>-->
</template>

<script setup>
import {Steppy} from 'vue3-steppy'
import {ref} from "vue";
import Step1 from "@/views/dashboard/user-kyc/step1.vue";
import Step2 from "@/views/dashboard/user-kyc/step2.vue";
import Step3 from "@/views/dashboard/user-kyc/step3.vue";

let step = ref(1)
let active1 = ref(false)
let active2 = ref(false)
let tabs = ref([
    {
        title: 'اطلاعات شخصی',
        isValid: true
    },
    {
        title: 'آدرس',
        isValid: true
    },
    {
        title: 'شناسایی',
        isValid: true
    }
])

function next(){
   step.value ++
}

function prev(val){
    step.value --
}
// const onSubmit = handleSubmit(values => {
//     // Submit to API
//     console.log(values); // { email: 'email@gmail.com' }
// });

</script>

<style>
.steppy-item-title {
    font-size: 16px !important;
    text-wrap: nowrap !important;
}

.steppy-pane {
    color: var(--dp-text-color) !important;
    background-color: var(--v-theme-on-background) !important;
    box-shadow: 0 2px 1px -1px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)), 0px 1px 1px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)), 0px 1px 3px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12)) !important;
}

.controls {
    display: none !important;
}

.v-main {
    margin-right: 0 !important;
    margin: 0 !important;
}


@media (max-width: 400px) {
    .steppy-item-title {
        display: none !important;
    }

}
</style>
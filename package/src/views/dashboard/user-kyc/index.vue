<template>
    <Steppy v-model:step="step" primaryColor1="#00D1BC" nextText="مرحله بعد" backText="مرحله قبل" :tabs="tabs" loading="true">
            <template #1>
                <step1 @stepOne="next"/>
            </template>
            <template #2>
                <step2 @stepTwo="next"/>
            </template>
            <template #3>
                <step3 @stepTree="next"/>
            </template>
    </Steppy>
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

.wrapper-steppy{
    padding: 18px !important;
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
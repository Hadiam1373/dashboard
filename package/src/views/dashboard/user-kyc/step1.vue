<template>
    <form @submit.prevent="submit">
        <v-row align="center" class="w-100">
            <v-col cols="12" sm="6" lg="4">
                <v-text-field variant="outlined" color="primary" v-model="name.value.value"
                              label="نام "
                              :error-messages="name.errorMessage.value">
                </v-text-field>
            </v-col>
            <v-col cols="12" sm="6" lg="4">
                <v-text-field variant="outlined" color="primary" v-model="lastName.value.value"
                              label="نام خانوادگی"
                              :error-messages="lastName.errorMessage.value">
                </v-text-field>
            </v-col>
            <v-col cols="12" sm="6" lg="4">
                <v-text-field variant="outlined" color="primary" class="custom-input"
                              :error-messages="date.errorMessage.value"
                              v-model="date.value.value" label="تاریخ تولد" prepend-inner-icon="mdi-calendar-range">
                </v-text-field>
                <date-picker v-model="date.value.value" :color="theme.themes.light.colors.primary"
                             display-format="dddd jDD jMMMM jYYYY"
                             :locale="locale.current.value" custom-input=".custom-input" use-router/>
            </v-col>

            <div class="d-flex w-100 justify-space-between align-center mt-5">
                <v-btn color="primary" class="mr-auto" type="submit">مرحله بعد</v-btn>
            </div>
        </v-row>
    </form>
    <v-list class="mt-10" lines="lines" nav>
        <v-list-item-title>توجه :</v-list-item-title>
        <v-divider class="mt-5 mb-5"></v-divider>
        <v-list-item>
            حتما خودتان این اطلاعات را وارد کنید و مراقب روش های کلاهبرداری و فیشینگ باشید.
        </v-list-item>
        <v-list-item>
            لطفا نام و نام خانوادگی خود را دقیقا مطابق با اطلاعات ثبت شده در کارت ملیتان وارد کنید .
        </v-list-item>
    </v-list>
</template>

<script setup>
import {useField, useForm} from "vee-validate";
import DatePicker from 'vue3-persian-datetime-picker'
import theme from "@/plugins/theme";
import {useLocale} from "vuetify";

const emit = defineEmits(['stepOne'])
const locale = useLocale()

const {handleSubmit, handleReset} = useForm({
    validationSchema: {
        name(value) {
            if (value) return true
            return 'لطفا نام  را وراد نمایید'
        },
        lastName(value) {
            if (value) return true
            return 'لطفا نام خانوادگی  را وراد نمایید'
        },
        date(value) {
            if (value) return true
            return 'لطفا تاریخ تولد  را وراد نمایید'
        }
    }
})

let name = useField('name')
let lastName = useField('lastName')
let date = useField('date')

const submit = handleSubmit(values => {
    nextStep()
})

function nextStep() {
    emit('stepOne')
}

function setTime(val) {
    date.value.value = val
}

</script>

<style>
.vpd-content {
    background-color: #f9f9f9 !important;
}
</style>
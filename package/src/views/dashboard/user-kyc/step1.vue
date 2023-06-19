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
                <Date @setDate=" (n) => setTime(n)"/>
            </v-col>

            <div class="d-flex w-100 justify-space-between align-center">
                <v-btn color="primary" class="mr-auto" type="submit">مرحله بعد</v-btn>
            </div>
        </v-row>
    </form>
</template>

<script setup>
import Date from "@/components/shared/Date.vue";
import {useField, useForm} from "vee-validate";

const emit = defineEmits(['stepOne'])

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

<style scoped>

</style>
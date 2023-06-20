<template>
    <form @submit.prevent="submit">
        <v-row align="center" class="w-100">
            <v-col cols="12" sm="6">
                <v-text-field variant="outlined" color="primary" v-model="phone.value.value"
                              label="شماره تماس"
                              :error-messages="phone.errorMessage.value">
                </v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
                <v-text-field variant="outlined" color="primary" v-model="zip.value.value"
                              label="کد پستی"
                              :error-messages="zip.errorMessage.value">
                </v-text-field>
            </v-col>
            <v-col cols="12" sm="12">
                <v-text-field variant="outlined" color="primary" v-model="address.value.value"
                              label="آدرس"
                              :error-messages="address.errorMessage.value">
                </v-text-field>
            </v-col>

            <div class="d-flex w-100 justify-space-between align-center mt-5">
                <v-btn color="primary" class="mr-auto" type="submit">مرحله بعد</v-btn>
            </div>
        </v-row>
    </form>
</template>

<script setup>
import {useField, useForm} from "vee-validate";
import {useLocale} from "vuetify";

const emit = defineEmits(['stepOne'])
const locale = useLocale()

const {handleSubmit, handleReset} = useForm({
    validationSchema: {
        address_type(value) {
            if (value) return true
            return 'لطفا نوع آدرس  را وراد نمایید'
        },
        country_code(value) {
            if (/^[-+]?[0-9]*\.?[0-9]*$/.test(value)) return true
            else {return 'لطفا فقط عدد وارد نمایید'}
            if (value) return true
            else{
                return 'لطفا پیش شماره کشور خود  را وراد نمایید'
            }
        },
        phone(value) {
            if (/^[-+]?[0-9]*\.?[0-9]*$/.test(value)) return true
            else {return 'لطفا فقط عدد وارد نمایید'}
            if (value) return true
            else{
                return 'لطفا شماره تلفن خود را وراد نمایید'
            }
        },
        zip(value) {
            if (/^[-+]?[0-9]*\.?[0-9]*$/.test(value)) return true
            else {return 'لطفا فقط عدد وارد نمایید'}
            if (value) return true
            else{
                return 'لطفا کد پستی محل سکونت  را وراد نمایید'
            }
        },
        address(value) {
            if (value) return true
            return 'لطفا آدرس خود  را وراد نمایید'
        }
    }
})

let address_type = useField('address_type')
let country_code = useField('country_code')
let phone = useField('phone')
let zip = useField('zip')
let address = useField('address')

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
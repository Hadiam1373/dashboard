<script setup>
import {ref} from "vue";
import {useField, useForm} from "vee-validate";
import Authentication from "@/api/apis/Authentication";
import {successMessage} from "@/api/fetch/showErrorMessage";

let show1 = ref(false)
let show2 = ref(false)
let show3 = ref(false)

const {handleSubmit, handleReset} = useForm({
    validationSchema: {
        currentPassword(value) {
            if (value) return true
            return 'رمز عبور فعلی را وارد نمایید'
        },

        newPassword(value) {
            if (value) return true
            return 'رمز عبور جدید را وارد نمایید'
        },

        confirmNewPassword(value) {
            if (value) return true
            return 'تکرار رمز عبور جدید را وارد نمایید'
        },
    }
})

const submit = handleSubmit(values => {
    Authentication.updatePassword(currentPassword.value.value, newPassword.value.value, confirmNewPassword.value.value).then(
        (r) => {
            if (r.data.status === 'success') {
                successMessage('رمز عبور شما با موفقیت ویرایش شد')
            }
        }
    )
})

let currentPassword = useField('currentPassword')
let newPassword = useField('newPassword')
let confirmNewPassword = useField('confirmNewPassword')
</script>

<template>
        <v-card class="pa-5">
            <form @submit.prevent="submit">
                <v-card-title>تغییر رمز عبور</v-card-title>
                <v-divider class="mt-5 mb-5"></v-divider>
                <v-card-text>
                    <v-row align="center" justify="center">
                        <v-col cols="12" lg="6">
                            <v-text-field variant="outlined" color="primary" v-model="currentPassword.value.value"
                                          label="رمز عبور فعلی"
                                          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                          :type="show1 ? 'text' : 'password'"
                                          @click:append="show1 = !show1"
                                          :error-messages="currentPassword.errorMessage.value">
                            </v-text-field>
                        </v-col>

                        <v-col cols="12" lg="6">
                            <v-text-field variant="outlined" color="primary" v-model="newPassword.value.value"
                                          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                                          :type="show2 ? 'text' : 'password'"
                                          label="رمز عبور جدید"
                                          @click:append="show2 = !show2"
                                          :error-messages="newPassword.errorMessage.value">
                            </v-text-field>
                        </v-col>

                        <v-col cols="12" lg="6">
                            <v-text-field variant="outlined" color="primary" v-model="confirmNewPassword.value.value"
                                          :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                                          :type="show3 ? 'text' : 'password'"
                                          @click:append="show3 = !show3"
                                          label="تکرار رمز عبور جدید"
                                          :error-messages="confirmNewPassword.errorMessage.value">
                            </v-text-field>
                        </v-col>

                        <v-col cols="12" lg="6">
                            <v-btn type="submit" height="48" color="primary" block>تغییر رمز عبور</v-btn>
                            <div class="v-input__details"></div>
                        </v-col>
                    </v-row>
                </v-card-text>
            </form>
        </v-card>
</template>


<style scoped>

</style>
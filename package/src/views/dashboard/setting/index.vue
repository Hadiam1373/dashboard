<script setup>
import Windows from "@/components/shared/Windows.vue";
import Setting from "@/api/apis/Setting";
import {onMounted, ref} from "vue";
import {useField, useForm} from "vee-validate";

const {handleSubmit, handleReset} = useForm({
    validationSchema: {
        mobile(value) {
            if (!value) {
                return 'لطفا شماره تماس خود را وارد نمایید'
            }
            return true
        },
        callback(value) {
            if (!value) {
                return 'لطفا آدرس callback خود را وارد نمایید'
            }
            return true
        },
    }
})

let userSetting = ref()
let loading = ref(false)
// form data
let mobile = useField('mobile')
let email = useField('email')
let token = useField('token')
let callback = useField('callback')
let fee = useField('fee')
let formData = new FormData()
let redirect = ref()
const items = ref([
    {title: 'فعال', value: true},
    {title: 'غیر فعال', value: false}
])

function getSetting() {
    Setting.getDataSetting().then(
        (r) => {
            mobile.value.value = r.data.data.mobile
            email.value.value = r.data.data.email
            token.value.value = r.data.data.token
            callback.value.value = r.data.data.callback
            fee.value.value = r.data.data.fee
            redirect.value = r.data.data.auto_redirect
            // if (r.data.data.auto_redirect === true) {
            //     redirect.value.value = 'فعال'
            // } else {
            //     redirect.value.value = 'غیر فعال'
            // }
        }
    )
}

function updateSetting() {
    formData.append('callback', callback.value.value)
    formData.append('mobile', mobile.value.value)
    formData.append('auto_redirect', redirect.value.value)
    // if (redirect.value.value === 'فعال') {
    //     formData.append('auto_redirect', true)
    // }else {
    //     formData.append('auto_redirect', false)
    // }

    Setting.updateSetting(formData).then(
        () => {
            loading.value = false
        },
        (error) => {
            loading.value = false
        }
    )
}

const submit = handleSubmit(values => {
    alert(values)
    updateSetting()
    loading.value = false
})

onMounted(() => {
    getSetting()
})
</script>
<template>
    <v-row>
        <v-col cols="12">
            <v-card class="pa-5">
                <v-card-title>تنظیمات امنیتی</v-card-title>
                <v-divider class="mt5 mb-5"></v-divider>
                <v-card-text>
                    <Windows/>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col cols="12">
            <form @submit.prevent="submit">
                <v-card class="pa-5">
                    <v-card-title>تنظیمات</v-card-title>
                    <v-divider class="mt5 mb-5"></v-divider>
                    <v-card-text>
                        <v-row align="center">
                            <v-col cols="12" lg="6" sm="6">
                                <v-text-field variant="outlined" color="primary"
                                              label="موبایل" v-model="mobile.value.value"
                                              :error-messages="mobile.errorMessage.value">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" lg="6" sm="6">
                                <v-text-field variant="outlined" color="primary" disabled
                                              label="ایمیل" v-model="email.value.value"
                                              :error-messages="email.errorMessage.value">
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row align="center">
                            <v-col cols="12" lg="6" sm="6">
                                <v-text-field variant="outlined" color="primary" disabled
                                              label="توکن" v-model="token.value.value"
                                              :error-messages="token.errorMessage.value">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" lg="6" sm="6">
                                <v-text-field variant="outlined" color="primary"
                                              label="آدرس callback" v-model="callback.value.value"
                                              :error-messages="callback.errorMessage.value">
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row align="center">
                            <v-col cols="12" lg="6" sm="6">
                                <v-text-field variant="outlined" color="primary" disabled
                                              label="کارمزد تراکنش" v-model="fee.value.value"
                                              :error-messages="fee.errorMessage.value">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" lg="6" sm="6">
                                <v-select variant="outlined" color="primary"
                                          label="ریدایرکت خودکار به پنل"
                                          :items="items"
                                          item-title="title"
                                          item-value="value"
                                          v-model="redirect"
                                          return-object
                                          messages = 'با فعال بودن این گزینه ، چنانچه قبلا در پنل وارد شده باشید دیگر صفحه نخست سایت را مشاهده نخواهید کرد.'
                                >
                                </v-select>
                            </v-col>
                        </v-row>
                    </v-card-text>

                    <v-card-actions class="px-6">
                        <v-spacer></v-spacer>
                        <v-btn
                                color="primary"
                                variant="flat"
                                type="submit"
                                :loading="loading"
                        >
                            ذخیره تنظیمات
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </form>
        </v-col>
    </v-row>
</template>
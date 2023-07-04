<script setup>
import Windows from "@/components/shared/Windows.vue";
import Setting from "@/api/apis/Setting";
import {onMounted, ref} from "vue";
import {useField, useForm} from "vee-validate";
import vuetify from "@/plugins/vuetify";
import Authentication from "@/api/apis/Authentication";
import {router} from "@/router";

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
        password(value) {
            if (!value || value.length < 8) {
                return vuetify.locale.t('$vuetify.error.password')
            }
            return true;
        }
    }
})

let userSetting = ref()
let loading = ref(false)
// active or notActive 2fa data
let google_2fa_status = useField('google_2fa_status')
let login_2fa = useField('login_2fa')
let password = useField('password')
// form data
let mobile = useField('mobile')
let email = useField('email')
let token = useField('token')
let callback = useField('callback')
let fee = useField('fee')
let formData = new FormData()
let redirect = ref()
let show = ref(false)
const items = ref([
    {title: 'فعال', value: 'enable'},
    {title: 'غیر فعال', value: 'disable'}
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
            google_2fa_status.value.value = r.data.data.google_2fa_status
            login_2fa.value.value = r.data.data.login_2fa
            if (google_2fa_status.value.value.value === 'disable') {
                show.value = true
            }
        }
    )
}

function updateSetting() {
    formData.append('callback', callback.value.value)
    formData.append('mobile', mobile.value.value)
    formData.append('auto_redirect', redirect.value.value)
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
    updateSetting()
    loading.value = false
})

const submit2 = handleSubmit(values => {
    Authentication.confirmPasswordForChange(password.value.value, google_2fa_status.value.value.value || google_2fa_status.value.value , login_2fa.value.value.value || login_2fa.value.value).then(
        (r) => {
            if (r.data.status === 'success') {
                router.go(0)
            }
        }
    )
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
                <v-card-text v-if="show === true">
                    <Windows/>
                </v-card-text>
                <v-card-text v-if="show === false">
                    <form @submit.prevent="submit2">
                        <v-row align="start">
                            <v-col cols="12" sm="3">
                                <v-select v-model="google_2fa_status.value.value" :items="items" variant="outlined"
                                          density="compact" color="primary"
                                          label="وضعیت کد دو مرحله ای"
                                          item-value="value" item-title="title"
                                          :error-messages="google_2fa_status.errorMessage.value"
                                          messages='با غیرفعال کردن این گزینه ، باید مجددا جهت فعالسازی با بارکد یا کد امنیتی اقدام کنید (امکان درخواست برداشت هم غیرفعال خواهد شد).'
                                >
                                </v-select>
                            </v-col>
                            <v-col cols="12" sm="3">
                                <v-select v-model="login_2fa.value.value" :items="items" variant="outlined"
                                          density="compact"  item-value="value" item-title="title"
                                          label="وضعیت ورود 2 مرحله ای" color="primary"
                                          :error-messages="login_2fa.errorMessage.value"
                                          messages='با فعال کردن این گزینه ، جهت ورود به سایت باید کد 2 مرحله ای را از اپ Google Authenticator ارائه دهید. (توصیه شده، بصورت پیش فرض فعال است)'
                                >
                                </v-select>
                            </v-col>
                            <v-col cols="12" sm="4">
                                <v-text-field variant="outlined" color="primary"
                                              :error-messages="password.errorMessage.value"
                                              hide-details
                                              label="رمز عبور" v-model="password.value.value"
                                >
                                </v-text-field>
                            </v-col>
                        </v-row>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn type="submit" variant="flat" color="primary">ثبت</v-btn>
                        </v-card-actions>
                    </form>
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
                                          messages='با فعال بودن این گزینه ، چنانچه قبلا در پنل وارد شده باشید دیگر صفحه نخست سایت را مشاهده نخواهید کرد.'
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

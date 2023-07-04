<script setup>
import CodeInput from "@/components/shared/CodeInput.vue";
import {computed, onMounted, ref} from "vue";
import {useField, useForm} from "vee-validate";
import vuetify from "@/plugins/vuetify";
import Authentication from "@/api/apis/Authentication";
import Setting from "@/api/apis/Setting";
import {useRoute, useRouter} from "vue-router";

const router = useRouter()
const route = useRoute()

const {handleSubmit, handleReset} = useForm({
    validationSchema: {
        password(value) {
            if (!value || value.length < 8) {
                return vuetify.locale.t('$vuetify.error.password')
            }
            return true;
        },
    }
})

let step = ref(1)
let otp = ref(null)
const password = useField('password')
let loading = ref(false)
let QR = ref()


function setOtp(val) {
    otp.value = val
    Setting.confirmGoogleCode(val).then(
        (r) => {
            if (r.data.status === 'success')
            step.value++
        }
    )
}

function getQRCode() {
    loading.value = true
    Authentication.getQRCODE(password.value.value).then(
        (r) => {
            QR.value = `data:image/svg+xml;base64,${r.data.data.qrCodeImage_base64}`
            if (r) {
                step.value++
                loading.value = false
            }
        },
        (error) => {
            loading.value = false
        }
    )
}


const submit = handleSubmit(values => {
    loading.value = false
    getQRCode()
})

const currentTitle = computed(() => {
        switch (step.value) {
            case 1:
                return 'فعال کردن ورود دو مرحله ایی'
            case 2:
                return 'وارد کردن کد دریافتی'
            default:
                return 'Account created'
        }
    },
)
const currentSubTitle = computed(() => {
    switch (step.value) {
        case 1:
            return 'ورود دو مرحله ای یک لایه امنیتی بیشتر به اکانت شما اضافه میکند ، همچنین برای ایجاد درخواست برداشت باید این امکان فعال شود'
        case 2:
            return 'لطفا QRCode را با استفاده از نرم افزارهایی مانند Google Authenticator اسکن کنید.\n' +
                'سپس کد دریافت شده از نرم افزار را در فیلد زیر وارد کنید و به مرحله بعد بروید.'
        default:
            return 'Account created'
    }
})

</script>
<template>
    <form @submit.prevent="submit">
        <v-card
                class="mx-auto"
                width="100%"
                elevation="0"
        >
            <v-card-title v-if="step !== 3" class="text-h6 font-weight-regular justify-space-between">
                <span>{{ currentTitle }}</span>
            </v-card-title>

            <v-card-subtitle v-if="step !== 3">
                <span>{{ currentSubTitle }}</span>
            </v-card-subtitle>

            <v-window v-model="step">
                <v-window-item :value="1">
                    <v-card-text>
                        <v-text-field
                                label="رمز عبور خود را وارد نمایید"
                                type="password"
                                color="primary"
                                variant="outlined"
                                v-model="password.value.value"
                                :error-messages="password.errorMessage.value"
                        ></v-text-field>
                    </v-card-text>
                </v-window-item>

                <v-window-item :value="2">
                    <v-row align="center" justify="center">
                        <v-col cols="12" class="mb-5 text-center mt-5">
                            <img
                                    v-bind:src="QR"
                                    alt="qrcode"/>
                        </v-col>
                    </v-row>

                    <v-row align="center" justify="center" class="mb-5">
                        <code-input @getOtp="(n) => setOtp(n)"/>
                    </v-row>

                </v-window-item>

                <v-window-item :value="3">
                    <div class="pa-4 text-center">
                        <v-icon style="font-size: 50px" class="mb-5" color="success">mdi-check-circle</v-icon>
                        <h3 class="text-h6 font-weight-light mb-2">
                           ورود دو مرحله ایی شما با موفقیت انجام شد
                        </h3>
                        <v-btn @click="router.go(0)" variant="flat" color="primary" width="300">ادامه</v-btn>
                    </div>
                </v-window-item>
            </v-window>

            <v-card-actions>
                <v-btn
                        v-if="step === 2"
                        variant="flat"
                        color="secondary"
                        @click="step--"
                >
                    مرحله قبل
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                        v-if="step === 2"
                        color="primary"
                        variant="flat"
                        type="submit"
                >
                    تایید کد دریافتی
                </v-btn>
                <v-btn
                        v-if="step === 1"
                        color="primary"
                        variant="flat"
                        type="submit"
                        :loading="loading"
                >
                    تایید رمز عبور
                </v-btn>
            </v-card-actions>
        </v-card>
    </form>
</template>

<style scoped>

</style>
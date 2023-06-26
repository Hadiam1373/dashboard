<template>
    <form @submit.prevent="submit">
        <v-card v-if="google_2factor_status === 'enable'" class="pa-5">
            <v-card-title>
                ایجاد درخواست برداشت
            </v-card-title>
            <v-divider class="mt-5 mb-5"></v-divider>
            <v-window
                    v-model="step"
            >
                <v-window-item :value="1">
                    <v-row align="center" justify="space-between">
                        <v-col cols="12" sm="7" class="ma-2">
                            <v-text-field variant="outlined" color="primary"
                                          :error-messages="wallet.errorMessage.value"
                                          label="آدرس کیف پول" v-model="wallet.value.value">
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4" class="ma-2">
                            <v-text-field variant="outlined" color="primary"
                                          :error-messages="amount.errorMessage.value"
                                          :placeholder="` موجودی شما :`+amountPlaceHolder"
                                          label="مقدار" v-model="amount.value.value">
                            </v-text-field>
                        </v-col>
                    </v-row>
                </v-window-item>

                <v-window-item :value="2">
                    <v-row align="center" justify="center" class="mb-5">
                        <span class="mt-5 mb-5">کد ورود دو مرحله ایی را وراد نمایید</span>
                        <v-col cols="12">
                            <code-input class="justify-center" @changeOtp="disable = true"  @getOtp="(n) => setOtp(n)"/>
                        </v-col>
                    </v-row>
                </v-window-item>
            </v-window>
            <v-card-actions>
                <v-btn
                        v-if="step === 2"
                        variant="flat"
                        color="secondary"
                        @click="step--"
                        size="large"
                >
                    مرحله قبل
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                        :disabled="disable"
                        v-if="step === 2"
                        color="primary"
                        variant="flat"
                        @click="createWithdrawRequest"
                        size="large"
                >
                    تایید کد دریافتی
                </v-btn>
                <v-btn
                        v-if="step === 1"
                        color="primary"
                        variant="flat"
                        size="large"
                        type="submit"
                        :loading="loading"
                >
                    ادامه
                </v-btn>
            </v-card-actions>
        </v-card>
        <NotVerify2FA v-else/>
    </form>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useField, useForm} from "vee-validate";
import CodeInput from "@/components/shared/CodeInput.vue";
import WithdrawRequest from "@/api/apis/Withdraw";
import NotVerify2FA from "@/components/shared/NotVerify2FA.vue";

const {handleSubmit, handleReset} = useForm({
    validationSchema: {
        wallet(value) {
            if (value) return true
            return 'لطفا شناسه کیف پول را وراد نمایید'
        },
        amount(value) {
            if (value) return true
            return 'لطفا مقدار را وراد نمایید'
        }
    }
})

let wallet = useField('wallet')
let amount = useField('amount')
let amountPlaceHolder = ref()
let google_2factor_status = ref()
let step = ref(1)
let loading = ref(false)
let otp = ref()
let disable = ref(true)

function getUserData() {
    WithdrawRequest.getUserData().then(
        (r) => {
            amountPlaceHolder.value = r.data.data.amount
            google_2factor_status.value = r.data.data.google_2factor_status
        }
    )
}

function setOtp(value) {
    otp.value = value
    disable.value = false
}

function createWithdrawRequest() {
    WithdrawRequest.createWithdrawRequest(wallet.value.value, amount.value.value).then(
        (r) => {
            console.log(r)
        }
    )
}

const submit = handleSubmit(values => {
    step.value++
})

onMounted(() => {
    getUserData()
})
</script>

<style scoped>

</style>

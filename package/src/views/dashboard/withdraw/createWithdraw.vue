<template>
    <form @submit.prevent="submit">
        <v-card class="pa-5">
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
                                              label="مقدار" v-model="amount.value.value">
                                </v-text-field>
                            </v-col>
                        </v-row>
                    </v-window-item>

                    <v-window-item :value="2">
                        <v-row align="center" justify="center" class="mb-5">
                            <v-col cols="12">
                               <code-input class="justify-center"  @getOtp="(n) => setOtp(n)"/>
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
                        v-if="step === 2"
                        color="primary"
                        variant="flat"
                        @click="step++"
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
    </form>
</template>

<script setup>
import {ref} from "vue";
import {useField, useForm} from "vee-validate";
import CodeInput from "@/components/shared/CodeInput.vue";

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
let step = ref(1)
let loading = ref(false)

const submit = handleSubmit(values => {
    step.value++
})
</script>

<style scoped>

</style>

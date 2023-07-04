<template>
    <v-row>
        <v-col cols="12">
            <v-card class="pa-5 mb-5">
                <v-card-title>فعالسازی پکیج جدید</v-card-title>
                <v-divider class="mt-5 mb-5"></v-divider>
                <v-card-text>
                    <NotVerify2FA v-if="google_2factor_status === 'disable'"/>
                    <v-window v-else class="mt-5" v-model="step">
                        <v-window-item :value="1">
                            <v-row class="mt-5"></v-row>
                            <v-col cols="12" lg="6">
                                <v-text-field variant="outlined" color="primary" v-model="packageCode"
                                              label="کد پکیج"
                                >
                                </v-text-field>
                            </v-col>
                        </v-window-item>
                        <v-window-item :value="2">
                            <v-row class="mt-5"></v-row>
                            <v-row align="center" justify="center" class="mb-5">
                                <code-input @getOtp="(n) => setOtp(n)"/>
                            </v-row>
                        </v-window-item>

                    </v-window>
                </v-card-text>
                <v-card-actions v-if="google_2factor_status === 'enable'">
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
                            @click="createPackage"
                    >
                        ثبت
                    </v-btn>
                    <v-btn
                            v-if="step === 1"
                            color="primary"
                            variant="flat"
                            type="submit"
                            @click="step++"
                    >
                        ادامه
                    </v-btn>
                </v-card-actions>
            </v-card>

            <v-card class="pa-5">
                <v-card-title>اطلاعات پکیج فعلی</v-card-title>
                <v-divider class="mt-5 mb-5"></v-divider>
                <v-list v-if="currentPackage">
                    <v-list-item-title class="font-weight-bold">اطلاعات پکیج فعلی</v-list-item-title>
                    <v-list-item>
                        شناسه :{{ currentPackage.id }}
                    </v-list-item>
                    <v-list-item>
                        نام :{{ currentPackage.name }}
                    </v-list-item>
                    <v-list-item>
                        کارمزد تراکنش :{{ currentPackage.transaction_fee }}
                    </v-list-item>
                    <v-list-item>
                        کارمزد تراکنش دوستان :{{ currentPackage.referrals_transactions_fee }}
                    </v-list-item>
                    <v-list-item>
                        سود به ازای هر تراکنش دوستان :{{ currentPackage.profit_per_referral_transaction }}
                    </v-list-item>
                    <v-list-item>
                        فعال شده در :{{ currentPackage.activated_at }}
                    </v-list-item>
                    <v-list-item>
                        وضعیت :{{ currentPackage.status_label }}
                    </v-list-item>
                </v-list>
            </v-card>
        </v-col>
    </v-row>
</template>

<script setup>
import {onMounted, ref} from "vue";
import CodeInput from "@/components/shared/CodeInput.vue";
import Package from "@/api/apis/Packages"
import {successMessage} from "@/api/fetch/showErrorMessage";
import NotVerify2FA from "@/components/shared/NotVerify2FA.vue";

let packageCode = ref()
let googleCode = ref()
let step = ref(1)
const currentPackage = ref()
let google_2factor_status = ref()

function getCurrentPackage() {
    Package.getUpgradePackage().then(
        (r) => {
            currentPackage.value = r.data.data.package
            google_2factor_status.value = r.data.data.google_2factor_status
        }
    )
}

function setOtp(val) {
    googleCode.value = val
}

function createPackage() {
    Package.changePackage(packageCode.value, googleCode.value).then(
        (r) => {
            if (r.data.status === 'success')
                successMessage('پکیج مورد نظر با موفقیت ایجادشد')
        }
    )
}

onMounted(() => {
    getCurrentPackage()
})
</script>

<style scoped>

</style>
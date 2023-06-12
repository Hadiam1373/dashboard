<script setup>
import {useRoute, useRouter} from "vue-router";
import Invoice from "@/api/apis/Invoice";
import {onMounted, ref} from "vue";
import Date from "@/components/shared/Date.vue";
import {useField, useForm} from "vee-validate";

const route = useRoute()
const router = useRouter()
const gates = ref()
let formData = new FormData()

const {handleSubmit, handleReset} = useForm({
    validationSchema: {
        title(value) {
            if (value) return true
            return 'لطفا صورت حساب را وراد نمایید'
        },
        amount(value) {
            if (value) return true
            return 'لطفا هزینه را وراد نمایید'
        },
        gateway(value) {
            if (value) return true
            return 'لطفا درگاه را وراد انتخاب نمایید'
        },
        mobile(value) {
            if (value) return true
            return 'لطفا شماره تماس را وراد نمایید'
        },
        description(value) {
            if (value) return true
            return 'لطفا توضیحات را وراد نمایید'
        }
    }
})
// form
let title = useField('title')
let amount = useField('amount')
let gateway = useField('gateway')
let expiration = useField('expiration')
let description = useField('description')
let mobile = useField('mobile')

const submit = handleSubmit(values => {
    storeInvoice()
})

function getGateways() {
    Invoice.createInvoice().then(
        (r) => {
            gates.value = r.data.data.gateways
        }
    )
}

function storeInvoice() {
    formData.append('title', title.value.value)
    formData.append('amount', amount.value.value)
    formData.append('gateway_id', gateway.value.value)
    formData.append('expiration', expiration.value.value)
    formData.append('description', description.value.value)
    formData.append('mobile', mobile.value.value)
    Invoice.StoreInvoice(formData).then(
        (r) => {
            if (r.data.data.status !== 'error')
                router.push('/invoices')
        }
    )
}

onMounted(() => {
    getGateways()
})
</script>

<template>
    <form @submit.prevent="submit">
        <v-card class="pa-5" min-height="300">
            <v-card-title>
                <div class="d-flex justify-space-between align-center">
                    <div>
                        <template v-if="route.params.id"> {{ 'تنظیمات درگاه ' + name.value.value }}</template>
                        <template v-else>
                            {{ $vuetify.locale.t(`$vuetify.dashboard.invoice.create`) }}
                        </template>
                    </div>
                    <div>
                        <v-icon color="primary" @click="router.push('/gateways/gatewaysList')"
                                class="cursor-pointer"
                                size="large">mdi-keyboard-backspace
                        </v-icon>
                    </div>
                </div>
            </v-card-title>
            <v-divider class="mt-5 mb-5"></v-divider>
            <v-row align="center">
                <v-col cols="12" lg="4" sm="6">
                    <v-text-field variant="outlined" color="primary"
                                  label="عنوان صورت حساب" v-model="title.value.value"
                                  :error-messages="title.errorMessage.value">
                    </v-text-field>
                </v-col>
                <v-col cols="12" lg="4" sm="6">
                    <v-select variant="outlined" color="primary"
                              label="درگاه"
                              :error-messages="gateway.errorMessage.value"
                              :items="gates"
                              item-title="name"
                              item-value="id"
                              v-model="gateway.value.value"
                    >
                    </v-select>
                </v-col>
                <v-col cols="12" lg="4" sm="6">
                    <v-text-field variant="outlined" color="primary"
                                  label="هزینه صورت حساب" v-model="amount.value.value"
                                  :error-messages="amount.errorMessage.value">
                    </v-text-field>
                </v-col>
                <v-col cols="12" lg="4" sm="6">
                    <v-text-field variant="outlined" color="primary"
                                  label="شماره موبایل مشتری" v-model="mobile.value.value"
                                  :error-messages="mobile.errorMessage.value">
                    </v-text-field>
                </v-col>
                <v-col cols="12" lg="4" sm="6">
                    <Date @setDate="(value) => expiration.value.value = value"/>
                </v-col>
                <v-col cols="12" lg="12" sm="12">
                    <v-textarea v-model="description.value.value" variant="outlined" label="توضیحات" rows="3" no-resize
                                :error-messages="description.errorMessage.value"></v-textarea>
                </v-col>
                <v-col cols="12" lg="2" sm="12" class="text-end">
                    <v-btn v-if="route.params.id" type="submit" height="48" color="primary" block>
                        ویرایش صورت حساب
                    </v-btn>
                    <v-btn v-else type="submit" height="48" color="primary" block>ثبت صورت حساب</v-btn>
                </v-col>
            </v-row>
        </v-card>
    </form>
</template>


<style scoped>

</style>
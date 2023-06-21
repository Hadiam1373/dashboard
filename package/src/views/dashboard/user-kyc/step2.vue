<template>
    <form @submit.prevent="submit">
        <v-row align="center" class="w-100 mb-5">
            <span>نوع آدرس خود را انتخاب نمایید:</span>
            <v-radio-group
                    v-model="address_type.value.value"
                    inline
                    hide-details
            >
                <div class="d-flex align-center mx-5">
                    <v-icon>mdi-home</v-icon>
                    <v-radio
                            label="خانه"
                            value="home"
                    >
                    </v-radio>
                </div>
                <div class="d-flex align-center mx-5">
                    <v-icon>mdi-office-building-outline</v-icon>
                    <v-radio
                            label="محل کار"
                            value="office"
                    ></v-radio>
                </div>
            </v-radio-group>
        </v-row>
        <v-row align="center" class="w-100">
            <v-col cols="12" sm="6">
                <v-text-field
                        variant="outlined"
                        color="primary"
                        dense
                        v-model="phone.value.value"
                        label="شماره تماس"
                        :error-messages="phone.errorMessage.value"
                        class="custom"
                >
                    <template v-slot:append-inner>
                        <div class="custom-select cursor-pointer">
                            <v-menu>
                                <template v-slot:activator="{ props: menu }">
                                    <div class="area-code" v-bind="menu">
                                        <v-icon class="mx-1">mdi-chevron-down</v-icon>
                                        <span style="font-size: 15px" class="mx-2">{{ displayCode }}</span>
                                        <country-flag rounded :country="displayFlag" class="mb-1" size="normal"/>
                                    </div>
                                </template>
                                <v-list>
                                    <v-list-item  v-for="(item , index) in countries" :key="index" class="pa-1" @click="setCode(item)">
                                        <div class="d-flex w-100 justify-end align-end">
                                            <span style="font-size: 15px" class="mx-2">{{ item.numberCode }}</span>
                                            <country-flag rounded :country="item.alpha3" size="normal"/>
                                        </div>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </div>
                    </template>
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
import CountryFlag from 'vue-country-flag-next'
import {ref} from "vue";
import KYC from "@/api/apis/KYC";

const {handleSubmit, handleReset} = useForm({
    validationSchema: {
        address_type(value) {
            if (value) return true
            return 'لطفا نوع آدرس  را وراد نمایید'
        },
        country_code(value) {
            if (/^[-+]?[0-9]*\.?[0-9]*$/.test(value)) return true
            else {
                return 'لطفا فقط عدد وارد نمایید'
            }
            if (value) return true
            else {
                return 'لطفا پیش شماره کشور خود  را وراد نمایید'
            }
        },
        phone(value) {
            if (/^[-+]?[0-9]*\.?[0-9]*$/.test(value)) return true
            else {
                return 'لطفا فقط عدد وارد نمایید'
            }
            if (value) return true
            else {
                return 'لطفا شماره تلفن خود را وراد نمایید'
            }
        },
        zip(value) {
            if (/^[-+]?[0-9]*\.?[0-9]*$/.test(value)) return true
            else {
                return 'لطفا فقط عدد وارد نمایید'
            }
            if (value) return true
            else {
                return 'لطفا کد پستی محل سکونت  را وراد نمایید'
            }
        },
        address(value) {
            if (value) return true
            return 'لطفا آدرس خود  را وراد نمایید'
        }
    }
})
const emit = defineEmits(['stepTwo'])
const locale = useLocale()
const countries = ref([
    {
        name: "Iran (Islamic Republic of)",
        alpha3: "irn",
        numberCode: "98",
    },

    {
        name: "Russian Federation",
        alpha3: "rus",
        numberCode: "7",
    },

    {
        name: "China",
        alpha3: "chn",
        numberCode: "86",
    },

    {
        name: "United Arab Emirates",
        alpha3: "are",
        numberCode: "971",
    },

    {
        name: "Qatar",
        alpha3: "qat",
        numberCode: "974",
    },
])
let address_type = useField('address_type')
let country_code = useField('country_code')
let phone = useField('phone')
let zip = useField('zip')
let address = useField('address')
let displayFlag = ref('irn')
let displayCode = ref('98')

const submit = handleSubmit(values => {
    KYC.stepTwo(address_type.value.value, country_code.value.value, phone.value.value, zip.value.value, address.value.value).then(
        (r) => {
            if (r.data.status === 'success') {
                nextStep()
            }
        },
    )
})

function nextStep() {
    emit('stepTwo')
}

function setCode(value){
    country_code.value.value = value.numberCode
    displayFlag.value = value.alpha3
    displayCode.value = value.numberCode
}

</script>

<style>
.area-code {
    min-width: 80px;
    display: flex;
    align-items: center;
    margin: 5px 0;
}

.custom .v-field__append-inner {
    padding-top: 0 !important;
    align-items: center !important;
}
</style>
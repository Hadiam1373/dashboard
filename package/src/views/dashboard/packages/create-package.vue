<script setup>
import Gateways from "@/api/apis/Gateways";
import {computed, onMounted, ref} from "vue";
import {useField, useForm} from "vee-validate";
import {useRoute, useRouter} from "vue-router";
import Package from '@/api/apis/Packages'
import {successMessage} from "@/api/fetch/showErrorMessage";

const route = useRoute()
const router = useRouter()

const {handleSubmit, handleReset} = useForm({
    validationSchema: {
        name(value) {
            if (value) return true
            return 'لطفا نام پکیج را وراد نمایید'
        },
        package_code(value) {
            if (value) return true
            return 'لطفا کد پکیج را وراد نمایید'
        },
        status(value) {
            if (value) return true
            return 'لطفا وضعیت پکیج را وراد نمایید'
        },
        type(value) {
            if (value) return true
            return 'لطفا نوع پکیج را وراد نمایید'
        },
        tron_tax(value) {
            if (value) return true
            return 'لطفا tron مالیات پکیج را وراد نمایید'
        },
        bsc_tax(value) {
            if (value) return true
            return 'لطفا bsc مالیات پکیج را وراد نمایید'
        },
    }
})

let formData = new FormData()
let name = useField('name')
let package_code = useField('package_code')
let status = useField('status')
let type = useField('type')
let tron_tax = useField('tron_tax')
let bsc_tax = useField('bsc_tax')
let itemStatus = ref()
let itemType = ref()

let packagesData = ref()


const submit = handleSubmit(values => {
    if (route.params.id) {
        updatePackages()
    } else {
        createPackages()
    }
})

function updatePackages() {
    const id = route.params.id
    formData.append('name', name.value.value)
    formData.append('fee', 0)
    formData.append('type', type.value.value)
    formData.append('tron_fee', tron_tax.value.value)
    formData.append('bsc_fee', bsc_tax.value.value)
    formData.append('code', package_code.value.value)
    formData.append('status', status.value.value)
    Package.editedPackage(id, formData).then(
        (r) => {
            if (r.data.status === 'success') {
                router.push('/packages')
            }
        }
    )
}

function createPackages() {
    Package.getCreateDataPackage().then(
        (r) => {
            itemStatus.value = r.data.data.status
            itemType.value = r.data.data.type
        }
    )
}

function storePackage() {
    formData.append('name', name.value.value)
    formData.append('fee', 0)
    formData.append('type', type.value.value)
    formData.append('tron_fee', tron_tax.value.value)
    formData.append('bsc_fee', bsc_tax.value.value)
    formData.append('code', package_code.value.value)
    formData.append('status', status.value.value)
    Package.storePackage(formData).then(
        (r) => {
            if (r.data.status === 'success') {
                successMessage(r.data.message)
            }
        }
    )
}

function editPackages() {
    const id = route.params.id
    Package.getEditedPackage(id).then(
        (r) => {
            name.value.value = r.data.data.packages.name
            package_code.value.value = r.data.data.packages.code
            status.value.value = r.data.data.packages.status
            type.value.value = r.data.data.packages.type
            tron_tax.value.value = r.data.data.packages.tron_tax
            bsc_tax.value.value = r.data.data.packages.bsc_tax
            itemStatus.value = r.data.data.status
            itemType.value = r.data.data.type
        }
    )
}


onMounted(() => {
    if (route.params.id) {
        editPackages()
    } else {
        createPackages()
    }
})
</script>
<template>
    <form @submit.prevent="submit">
        <v-card class="pa-5" min-height="300">
            <v-card-title>
                <div class="d-flex justify-space-between align-center">
                    <div>
                        <template v-if="route.params.id"> {{ 'ویرایش پکیج ' + name.value.value }}</template>
                        <template v-else>
                            ایجاد پکیج جدید
                        </template>
                    </div>
                    <div>
                        <v-icon color="primary" @click="$router.push('/packages/packages-list')"
                                class="cursor-pointer"
                                size="large">mdi-keyboard-backspace
                        </v-icon>
                    </div>
                </div>
            </v-card-title>
            <v-divider class="mt-5 mb-5"></v-divider>
            <v-row class="mt-5">
                <v-col cols="12">
                    <v-row align="center">
                        <v-col cols="12" lg="4" sm="6">
                            <v-text-field variant="outlined" color="primary" v-model="name.value.value"
                                          label="نام پکیج"
                                          :error-messages="name.errorMessage.value"></v-text-field>
                        </v-col>
                        <v-col cols="12" lg="4" sm="6">
                            <v-text-field variant="outlined" color="primary" v-model="package_code.value.value"
                                          label="کد پکیج"
                                          :error-messages="package_code.errorMessage.value"></v-text-field>
                        </v-col>
                        <v-col cols="12" lg="4" sm="12">
                            <v-select label="وضعیت" color="primary" variant="outlined"
                                      :error-messages="status.errorMessage.value"
                                      :items="itemStatus"
                                      v-model="status.value.value"></v-select>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col>
                    <v-row>
                        <v-col cols="12" lg="4">
                            <v-select label="نوع" color="primary" variant="outlined" v-model="type.value.value"
                                      :error-messages="type.errorMessage.value" :items="itemType">

                            </v-select>
                        </v-col>
                        <v-col cols="12" lg="4">
                            <v-text-field variant="outlined" color="primary"
                                          :error-messages="tron_tax.errorMessage.value"
                                          label="tron مالیات" v-model="tron_tax.value.value"></v-text-field>
                        </v-col>
                        <v-col cols="12" lg="4">
                            <v-text-field variant="outlined" color="primary"
                                          :error-messages="bsc_tax.errorMessage.value"
                                          label="bsc مالیات" v-model="bsc_tax.value.value"></v-text-field>
                        </v-col>
                        <v-col cols="12" class="text-end">
                            <v-btn v-if="route.params.id" type="submit" height="48" color="primary">
                                ویرایش پکیج
                            </v-btn>
                            <v-btn v-else type="submit" height="48" color="primary" @click="storePackage">ثبت پکیج
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-card>
    </form>
</template>
<style scoped>

</style>

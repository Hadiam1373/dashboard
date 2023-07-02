<script setup>
import {useField, useForm} from "vee-validate";
import vuetify from "@/plugins/vuetify";
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import Users from "@/api/apis/users";
import {successMessage} from "@/api/fetch/showErrorMessage";

const route = useRoute()

const {handleSubmit, handleReset} = useForm({
    validationSchema: {
        email(value) {
            if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true
            return vuetify.locale.t('$vuetify.error.email')
        },

        mobile(value) {
            if (value) return true
            return 'لطفا موبایل را وراد نمایید'
        },
        name(value) {
            if (value) return true
            return 'لطفا نام نام خانوادگی را وراد نمایید'
        },
        status(value) {
            if (value) return true
            return 'لطفا وضعیت کاربر را انتخاب نمایید'
        },
        wallet(value) {
            if (value) return true
            return 'لطفا مقدار شارژ کیف پول را وارد نمایید'
        },
        userPackage(value) {
            if (value) return true
            return 'لطفا پکیج را انتخاب نمایید'
        },
    }
})

let formData = new FormData()
let email = useField('email')
let mobile = useField('mobile')
let name = useField('name')
let status = useField('status')
let wallet = useField('wallet')
let userPackage = useField('userPackage')
let thisPackage = ref([])
let id = ref()
let token = ref()
let callBack = ref()
let loading = ref(false)
let redirect = ref()
let userStatus = ref([])
const items = ref([
    {title: 'فعال', cost: 'true'},
    {title: 'غیر فعال', cost: 'false'}
])

function updateData() {
    loading.value = true
    formData.append('email', email.value.value)
    formData.append('mobile', mobile.value.value)
    formData.append('name', name.value.value)
    formData.append('status', status.value.value)
    formData.append('amount', wallet.value.value)
    formData.append('active_package_id', userPackage.value.value)
    formData.append('token', token.value)
    formData.append('callback', callBack.value)
    formData.append('auto_redirect', redirect.value.cost)
    formData.append('id', route.params.id)
    formData.append('_method', 'PATCH')
    Users.updateUser(formData, route.params.id).then(
        (r) => {
            loading.value = false
            if(r.data.status === 'success') successMessage('تغییرات مورد نظر با موفقیت اعمال شد')
        },
        (error) => {
            loading.value = false
        }
    )
}

const submit = handleSubmit(values => {
    updateData()
})

function getData() {
    const id = route.params.id
    Users.getEditedData(id).then(
        (r) => {
            email.value.value = r.data.data.email
            mobile.value.value = r.data.data.mobile
            name.value.value = r.data.data.name
            status.value.value = r.data.data.status
            userStatus.value.push(r.data.data.status)
            wallet.value.value = r.data.data.purse_amount
            r.data.data.packages.forEach((pack) => {
                if (pack.id === r.data.data.active_package_id) {
                    userPackage.value.value = pack.id
                }
            })
            thisPackage.value = r.data.data.packages
            callBack.value = r.data.data.settings_callback
            items.value.forEach((item) => {
                if (r.data.data.$settings_auto_redirect === item.cost) {
                    redirect.value = item
                }
            })
            token.value = r.data.data.token
        }
    )
}

onMounted(() => {
    getData()
})
</script>

<template>
    <form @submit.prevent="submit">
        <v-card class="pa-5" min-height="300">
            <v-card-title>
                <div class="d-flex justify-space-between align-center">
                    <div>ویرایش اطلاعات کاربر</div>
                    <div>
                        <v-icon color="primary" @click="$router.push('/users/users-list/show-user-list')"
                                class="cursor-pointer"
                                size="large">mdi-keyboard-backspace
                        </v-icon>
                    </div>
                </div>
            </v-card-title>
            <v-divider class="mt-5 mb-5"></v-divider>
            <v-card-text>
                <v-row align="center">
                    <v-col cols="12" sm="6" lg="4">
                        <v-text-field variant="outlined" color="primary" v-model="email.value.value"
                                      label="ایمیل"
                                      :error-messages="email.errorMessage.value">
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" lg="4">
                        <v-text-field variant="outlined" type="phone" color="primary" v-model="mobile.value.value"
                                      label="موبایل"
                                      :error-messages="mobile.errorMessage.value">
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" lg="4">
                        <v-text-field variant="outlined" type="phone" color="primary" v-model="name.value.value"
                                      label="نام و نام خانوادگی"
                                      :error-messages="name.errorMessage.value">
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row align="center">
                    <v-col cols="12" sm="6" lg="4">
                        <v-select variant="outlined" color="primary"
                                  label="وضعیت"
                                  :items="userStatus"
                                  :error-messages="status.errorMessage.value"
                                  v-model="status.value.value"
                        >
                        </v-select>
                    </v-col>
                    <v-col cols="12" sm="6" lg="4">
                        <v-text-field variant="outlined" type="phone" color="primary" v-model="wallet.value.value"
                                      label="شارژ کیف پول"
                                      :error-messages="wallet.errorMessage.value">
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" lg="4">
                        <v-text-field variant="outlined" type="phone" color="primary" v-model="token"
                                      label="توکن"
                        >
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row align="center">
                    <v-col cols="12" sm="6" lg="4">
                        <v-select variant="outlined" color="primary"
                                  label="پکیج فعال"
                                  :items="thisPackage"
                                  item-title="name"
                                  item-value="id"
                                  v-model="userPackage.value.value"
                                  :error-messages="userPackage.errorMessage.value">
                            >
                        </v-select>
                    </v-col>
                    <v-col cols="12" sm="6" lg="4">
                        <v-text-field variant="outlined" type="phone" color="primary" v-model="callBack"
                                      label="آدرس CallBack">
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" lg="4">
                        <v-select variant="outlined" color="primary"
                                  label="ریدایرکت خودکار به پنل"
                                  :items="items"
                                  item-title="title"
                                  item-value="cost"
                                  v-model="redirect"
                                  return-object
                                  messages='با فعال بودن این گزینه ، چنانچه قبلا در پنل وارد شده باشید دیگر صفحه نخست سایت را مشاهده نخواهید کرد.'
                        >
                        </v-select>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <div class="d-flex justify-end w-100 mt-5">
                    <v-btn type="submit" :loading="loading" size="large" variant="flat" color="primary">ویرایش اطلاعات
                    </v-btn>
                </div>
            </v-card-actions>
        </v-card>
    </form>
</template>


<style scoped>

</style>

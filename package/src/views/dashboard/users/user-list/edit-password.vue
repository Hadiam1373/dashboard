<script setup>
import {useField, useForm} from "vee-validate";
import {onMounted, ref} from "vue";
import vuetify from "@/plugins/vuetify";
import {useRoute, useRouter} from "vue-router";
import Users from "@/api/apis/users";
import {clearItem, removeItem} from "@/storage";
import Authentication from "@/api/apis/Authentication";

const route = useRoute()
const router = useRouter()

const {handleSubmit, handleReset} = useForm({
    validationSchema: {
        password(value) {
            if (!value || value.length < 8) {
                return vuetify.locale.t('$vuetify.error.password')
            }
            return true;
        },

        rePassword(value) {
            if (value !== password.value.value) {
                return vuetify.locale.t('$vuetify.error.rePassword')
            }
            return true;
        },
    }
})

let password = useField('password')
let rePassword = useField('rePassword')
let email = ref()
let name = ref()
let loading = ref(false)
let formData = new FormData()

function getEditedPassword() {
    let id = route.params.id
    Users.getEditedPassword(id).then(
        (r) => {
            email.value = r.data.data.email
            name.value = r.data.data.name
        }
    )
}

function updatePassword() {
    loading.value = true
    let id = route.params.id
    formData.append('password', password.value.value)
    formData.append('password_confirmation', rePassword.value.value)
    Users.updatePassword(formData, id).then(
        () => {
            loading.value = false
            Authentication.logout().then(
                (r) => {
                    if(r.data.status === 'success'){
                        removeItem('userData');
                        removeItem('accessToken');
                        removeItem('userRole');
                        window.location.href = "/auth/login";
                    }
                },
            )
        },
        (error) => {
            loading.value = false
        }
    )
}

const submit = handleSubmit(values => {
    updatePassword()
})

onMounted(() => {
    getEditedPassword()
})
</script>

<template>
    <form @submit.prevent="submit">
        <v-card class="pa-5" min-height="300">
            <v-card-title>
                <div class="d-flex justify-space-between align-center">
                    <div>تغییر رمز عبور</div>
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
                    <v-col cols="12" sm="6">
                        <v-text-field variant="outlined" color="primary" disabled v-model="email"
                                      label="ایمیل"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field variant="outlined" color="primary" disabled
                                      v-model="name"
                                      label="نام و نام خانوادگی"
                        >
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row align="center">
                    <v-col cols="12" sm="6">
                        <v-text-field variant="outlined" type="password" color="primary" v-model="password.value.value"
                                      label="رمز عبور جدید"
                                      :error-messages="password.errorMessage.value">
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field variant="outlined" type="password" color="primary"
                                      v-model="rePassword.value.value"
                                      label="تکرار رمز عبور"
                                      :error-messages="rePassword.errorMessage.value">
                        </v-text-field>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <div class="d-flex justify-end w-100 mt-5">
                    <v-btn type="submit" :loading="loading" size="large" variant="flat" color="primary">
                        تغییر رمز عبور
                    </v-btn>
                </div>
            </v-card-actions>
        </v-card>
    </form>
</template>

<style scoped>

</style>

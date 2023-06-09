<script setup>
import {useField, useForm} from 'vee-validate'
import vuetify from "@/plugins/vuetify";
import {ref} from "vue";
import Authentication from "@/api/apis/Authentication";
import {getItem, setItem} from "@/storage";
import ForgetPassword from "@/views/auth/ForgetPassword.vue";
import {useRouter} from "vue-router";

const router = useRouter()

const {handleSubmit, handleReset} = useForm({
    validationSchema: {
        email(value) {
            if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)) return true
            return vuetify.locale.t('$vuetify.error.email')
        },

        password(value) {
            if (!value || value.length < 8) {
                return vuetify.locale.t('$vuetify.error.password')
            }
            return true;
        },
    }
})

const checkbox = useField('checkbox')
const email = useField('email');
const password = useField('password');
let loading = ref(false);

function setToken(data, token) {
    console.log(data.roles.length)
    if (data.roles.length > 0) {
        data.roles.find(item => {
            console.log(item)
            if (item && item === 'admin') {
                setItem('userRole', 'admin', '36000000')
            }
        })
    }
    else if(data.roles.length === 0) {
        setItem('userRole', 'user', '36000000')
    }
    setItem('userData', JSON.stringify(data), '36000000');
    setItem('accessToken', token, '36000000');
}

async function Login() {
    try {
        const r = await Authentication.login(email.value.value, password.value.value);
        const {token, ...data} = r.data.data;
        setToken(data, token)
        loading.value = false;
        if (data.tow_factor_status === 'passed' && r.data.status === 'success') {
            window.location.href = "/gateways";
        } else if (data.tow_factor_status === 'not_passed' && r.data.status === 'success') {
            window.location.href = '/auth/2FA'
        }
    } catch (error) {
        loading.value = false;
    }
}

const submit = handleSubmit(values => {
    loading.value = true
    Login()
})
</script>

<template>
    <form @submit.prevent="submit">
        <v-row class="d-flex mb-3">
            <v-col cols="12">
                <v-label class="font-weight-bold mb-1"> {{ $vuetify.locale.t('$vuetify.login.email') }}</v-label>
                <v-text-field v-model="email.value.value"
                              :error-messages="email.errorMessage.value" variant="outlined"
                              color="primary">

                </v-text-field>
            </v-col>
            <v-col cols="12">
                <v-label class="font-weight-bold mb-1">{{ $vuetify.locale.t('$vuetify.login.password') }}</v-label>
                <v-text-field v-model="password.value.value"
                              :error-messages="password.errorMessage.value" variant="outlined" type="password"
                              color="primary">

                </v-text-field>
            </v-col>
            <v-col cols="12" class="pt-0">
                <div class="d-flex flex-wrap align-center ml-n2">
                    <v-checkbox
                            v-model="checkbox.value.value"
                            :error-messages="checkbox.errorMessage.value"
                            value="1"
                            hide-details
                            :label="$vuetify.locale.t('$vuetify.login.remmember')"
                            type="checkbox"
                    ></v-checkbox>
                    <div class="ml-sm-auto">
                        <forget-password/>
                    </div>
                </div>
            </v-col>
            <v-col cols="12" class="pt-0">
                <v-btn type="submit" :loading="loading" color="primary" size="large" block flat>
                    {{ $vuetify.locale.t('$vuetify.login.enter') }}
                </v-btn>
            </v-col>
        </v-row>
    </form>
</template>

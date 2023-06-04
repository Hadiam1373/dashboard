<script setup>
import {useField, useForm} from 'vee-validate'
import vuetify from "@/plugins/vuetify";
import {ref} from "vue";
import Authentication from "@/api/apis/Authentication";
import {setItem, clearItem} from "@/storage";
import {router} from "@/router";


const {handleSubmit, handleReset} = useForm({
    validationSchema: {
        email(value) {
            if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true
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

const submit = handleSubmit(values => {
    loading.value = true
    clearItem()
    Authentication.login(email.value.value, password.value.value).then(r => {
        try {
            const {token, ...data} = r.data.data
            setItem('userData', JSON.stringify(data))
            setItem('accessToken', token)
            router.push('/')
        } catch (e) {
            loading.value = false
        }
    })
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
                        <RouterLink to="/"
                                    class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium">
                            {{ $vuetify.locale.t('$vuetify.login.forget') }}
                        </RouterLink>
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

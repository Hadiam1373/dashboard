<script setup>
import {ref} from 'vue';
import {useField, useForm} from "vee-validate";
import vuetify from "@/plugins/vuetify";
import Authentication from "@/api/apis/Authentication";
import {router} from "@/router";
import {setItem} from "@/storage";

const {handleSubmit, handleReset} = useForm({
    validationSchema: {
        name(value) {
            if (value) return true
            return vuetify.locale.t('$vuetify.error.name')
        },

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

        'password_confirmation'(value) {
            if (value !== password.value.value) {
                return vuetify.locale.t('$vuetify.error.rePassword')
            }
            return true;
        },

        'agree_with_rules'(value) {
            if (value !== 'on' || !value) return vuetify.locale.t('$vuetify.error.rules')
            return true
        }
    }
})

const email = useField('email');
const password = useField('password');
const password_confirmation = useField('password_confirmation');
const name = useField('name');
const agree_with_rules = useField('agree_with_rules');
const loading = ref(false);

const submit = handleSubmit(values => {
    loading.value = true
    const data = JSON.stringify(values)
    Authentication.singUp(data).then(
        () => {
            setItem(data)
            loading.value = false
            router.push('/')
        },
        (error) => {
            loading.value = false
        }
    )
})
</script>

<template>
    <form @submit.prevent="submit">
        <v-row class="d-flex mb-3">
            <v-col cols="12">
                <v-label class="font-weight-bold mb-1">
                    {{ $vuetify.locale.t('$vuetify.signup.name') }}
                </v-label>
                <v-text-field :error-messages="name.errorMessage.value" variant="outlined" v-model="name.value.value"
                              color="primary">
                </v-text-field>
            </v-col>
            <v-col cols="12">
                <v-label class="font-weight-bold mb-1">
                    {{ $vuetify.locale.t('$vuetify.signup.email') }}
                </v-label>
                <v-text-field variant="outlined" v-model="email.value.value" type="email"
                              color="primary" :error-messages="email.errorMessage.value"></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-label class="font-weight-bold mb-1">
                    {{ $vuetify.locale.t('$vuetify.signup.password') }}
                </v-label>
                <v-text-field variant="outlined" type="password" v-model="password.value.value"
                              color="primary" :error-messages="password.errorMessage.value"></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-label class="font-weight-bold mb-1">
                    {{ $vuetify.locale.t('$vuetify.signup.rePassword') }}
                </v-label>
                <v-text-field variant="outlined" type="password" v-model="password_confirmation.value.value"
                              color="primary" :error-messages="password_confirmation.errorMessage.value"></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-checkbox
                        v-model="agree_with_rules.value.value"
                        value="on"
                        :label="$vuetify.locale.t('$vuetify.signup.rules')"
                        type="checkbox"
                        :error-messages="agree_with_rules.errorMessage.value"
                ></v-checkbox>
                <v-btn type="submit" :loading="loading" color="primary" class="mt-5" size="large" block flat>
                    {{ $vuetify.locale.t('$vuetify.signup.createAccount') }}
                </v-btn>
            </v-col>
        </v-row>
    </form>
</template>

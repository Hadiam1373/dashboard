<script setup>
import {ref} from "vue";
import {useField, useForm} from "vee-validate";
import vuetify from "@/plugins/vuetify";

let isOpen = ref(false)
let loading = ref(false)
const email = useField('email');

const {handleSubmit, handleReset} = useForm({
    validationSchema: {
        email(value) {
            if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true
            return vuetify.locale.t('$vuetify.error.email')
        },
    }
})

const submit = handleSubmit(values => {
    loading.value = true
})
</script>
<template>
    <form @submit.prevent="submit">
        <div class="text-center">
            <v-dialog
                    v-model="isOpen"
                    width="auto"
            >
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" variant="plain">
                        {{ $vuetify.locale.t('$vuetify.login.forget') }}
                    </v-btn>
                </template>

                <v-card class="pa-3" min-width="350" max-width="450">
                    <v-card-text>
                        {{ $vuetify.locale.t('$vuetify.forgetPassword.title') }}
                    </v-card-text>
                    <div class="text-center">
                        <v-col cols="12" class="text-start">
                            <v-label class="font-weight-bold mb-2"> {{
                                $vuetify.locale.t('$vuetify.forgetPassword.email')
                                }}
                            </v-label>
                            <v-text-field v-model="email.value.value"
                                          :error-messages="email.errorMessage.value" variant="outlined"
                                          color="primary">
                            </v-text-field>
                            <span class="text-body-1 mt-5 text-muted font-weight-medium d-flex justify-center align-center mt-3">
                                {{ $vuetify.locale.t('$vuetify.login.qustion') }}
                                <RouterLink to="/auth/register"
                                            class="text-primary mx-2 text-decoration-none text-body-1 opacity-1 font-weight-medium pl-2">
                                    {{ $vuetify.locale.t('$vuetify.login.signup') }}
                                </RouterLink>
                            </span>
                        </v-col>
                        <v-btn :loading="loading" type="submit" color="primary" class="mt-4" size="large" block>
                            {{ $vuetify.locale.t('$vuetify.forgetPassword.reset') }}
                        </v-btn>
                    </div>
                </v-card>
            </v-dialog>
        </div>
    </form>
</template>

<style scoped>

</style>

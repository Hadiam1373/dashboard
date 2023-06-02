<script setup lang="ts">
import {ref} from 'vue';

const checkbox = ref(true);
</script>

<template>
    <v-row class="d-flex mb-3">
        <v-col cols="12">
            <v-label class="font-weight-bold mb-1"> {{ $vuetify.locale.t('$vuetify.login.email') }}</v-label>
            <v-text-field variant="outlined" hide-details color="primary"></v-text-field>
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-bold mb-1">{{ $vuetify.locale.t('$vuetify.login.password') }}</v-label>
            <v-text-field variant="outlined" type="password" hide-details color="primary"></v-text-field>
        </v-col>
        <v-col cols="12" class="pt-0">
            <div class="d-flex flex-wrap align-center ml-n2">
                <v-checkbox v-model="checkbox" color="primary" hide-details>
                    <template v-slot:label class="text-body-1">
                        {{ $vuetify.locale.t('$vuetify.login.remmember') }}
                    </template>
                </v-checkbox>
                <div class="ml-sm-auto">
                    <RouterLink to="/"
                                class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium">
                        {{ $vuetify.locale.t('$vuetify.login.forget') }}
                    </RouterLink>
                </div>
            </div>
        </v-col>
        <v-col cols="12" class="pt-0">
            <v-btn to="/" color="primary" size="large" block flat>
                {{ $vuetify.locale.t('$vuetify.login.enter') }}
            </v-btn>
        </v-col>
    </v-row>
</template>

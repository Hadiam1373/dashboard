<script setup lang="ts">
import { ref } from 'vue';
const checkbox = ref(true);
</script>

<template>
    <v-row class="d-flex mb-3">
        <v-col cols="12">
            <v-label class="font-weight-bold mb-1">
                {{ $vuetify.locale.t('$vuetify.signup.name') }}
            </v-label>
            <v-text-field variant="outlined" hide-details color="primary"></v-text-field>
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-bold mb-1">
                {{ $vuetify.locale.t('$vuetify.signup.email') }}
            </v-label>
            <v-text-field variant="outlined" type="email" hide-details color="primary"></v-text-field>
        </v-col>
<!--        <v-col cols="12">-->
<!--            <v-label class="font-weight-bold mb-1">-->
<!--                {{ $vuetify.locale.t('$vuetify.signup.code') }}-->
<!--            </v-label>-->
<!--            <v-text-field variant="outlined" hide-details color="primary"></v-text-field>-->
<!--        </v-col>-->
        <v-col cols="12">
            <v-label class="font-weight-bold mb-1">
                {{ $vuetify.locale.t('$vuetify.signup.password') }}
            </v-label>
            <v-text-field variant="outlined" type="password" hide-details color="primary"></v-text-field>
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-bold mb-1">
                {{ $vuetify.locale.t('$vuetify.signup.rePassword') }}
            </v-label>
            <v-text-field variant="outlined" type="password" hide-details color="primary"></v-text-field>
        </v-col>
        <v-col cols="12" >
            <v-btn to="/" color="primary" size="large" block   flat>
                {{ $vuetify.locale.t('$vuetify.signup.createAccount') }}
            </v-btn>
        </v-col>
    </v-row>
</template>

<script setup>
import {useLocale} from 'vuetify'
import {ref} from "vue";

const {current} = useLocale()

const i18nCompLanguages = ref([
    {
        label: 'English',
        i18nLang: 'en'
    },
    {
        label: 'persian',
        i18nLang: 'fa'
    }
])

function changeLocale(locale) {
    current.value = locale
}
</script>
<template>
    <v-menu min-height="150" offset="10">
        <template v-slot:activator="{ props }">
            <v-btn color="primary" variant="outlined" v-bind="props">
                <v-icon>mdi-translate</v-icon>
            </v-btn>
        </template>
        <v-list>
            <v-list-item
                    v-for="(item, index) in i18nCompLanguages"
                    :key="index"
                    @click="changeLocale(item.i18nLang)"
            >
                <v-list-item-title>{{ item.label }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

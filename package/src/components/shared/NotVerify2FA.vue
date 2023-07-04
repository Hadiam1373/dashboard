<template>
    <v-alert
        type="error"
        title="ورود دو مرحله ایی فعال نیست"
        text=" به دلایل امنیتی، برای انجام این عملیات، باید این ویژگی را در تنظیمات فعال کنید"
    >
        <template v-slot="defualt">
               <v-btn color="blue" variant="text" role="link" tag="link" @click="router.push('/setting')">برو به تنظیمات</v-btn>
        </template>
    </v-alert>
</template>

<script setup>
import {useRouter} from "vue-router";

const router = useRouter()
</script>

<style scoped>

</style>
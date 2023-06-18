<script setup>
import Logo from "@/layouts/full/logo/Logo.vue";
import CodeInput from "@/components/shared/CodeInput.vue";
import {ref} from "vue";
import Authentication from "@/api/apis/Authentication";
import {useRoute, useRouter} from "vue-router";

const router = useRouter()

let email = ref("Hm646036@gmail.com")

function setOtp(n) {
    Authentication.confirmedIs2Fa(n).then(
        () => {
            router.push('/')
        }
    )
}
</script>
<template>
    <v-container fluid class="pa-3">
        <v-row class="h-100vh d-flex justify-center align-center">
            <v-col cols="12" lg="4" xl="3" class="d-flex align-center">
                <v-card rounded="md" elevation="10" class="px-sm-1 px-0 withbg mx-auto" max-width="500">
                    <v-card-item class="pa-sm-8">
                        <div class="d-flex justify-center py-4">
                            <Logo/>
                        </div>
                    </v-card-item>
                    <v-card-title class="text-center">
                        ورود دو مرحله ایی
                    </v-card-title>
                    <v-card-subtitle class="text-center">
                        کد تایید را وراد نمایید
                    </v-card-subtitle>
                    <v-card-text>
                        <v-col cols="12" class="mt-5">
                            <v-row align="center" justify="center" class="mb-5">
                                <code-input @getOtp="(n) => setOtp(n)"/>
                            </v-row>
                        </v-col>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions class="d-flex flex-column gap-3 align-start ">
                        <div>
                            به دستگاه خود دسترسی ندارید؟
                            <v-btn color="primary" variant="text">بازگردانی</v-btn>
                        </div>
                        <div>
                            با {{ email }} وارد شده اید ، میخواهید خارج شوید؟
                            <v-btn color="primary" variant="text">خروج</v-btn>
                        </div>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>


<style scoped>

</style>
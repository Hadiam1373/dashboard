<script setup>
import {useRoute, useRouter} from "vue-router";
import KYC from "@/api/apis/KYC";
import {onMounted, ref} from "vue";

const route = useRoute()
const router = useRouter()

let userData = ref()

function getUserData() {
    const id = route.params.id
    KYC.getUserData(id).then(
        (r) => {
            userData.value = r.data.data.user_meta
        }
    )
}

onMounted(() => {
    getUserData()
})
</script>
<template>
    <v-card class="pa-5" min-height="300">
        <v-card-title>
            <div class="d-flex justify-space-between align-center">
                <div>مشخصات کاربر</div>
                <div>
                    <v-icon color="primary" @click="router.push('/kyc/kyc-list')"
                            class="cursor-pointer"
                            size="large">mdi-keyboard-backspace
                    </v-icon>
                </div>
            </div>
        </v-card-title>
        <v-divider class="mt-5 mb-5"></v-divider>
        <v-card-text v-if="userData">
            <v-row align="center" justify="space-between" class="mb-5">
                <v-col cols="12" sm="6" lg="4">
                    <div>
                        <span class="font-weight-bold v-list-item-title">نام کاربر :  </span>
                        <span class="v-list-item-title"> {{ userData.name }} </span>
                    </div>
                </v-col>
                <v-col cols="12" sm="6" lg="4">
                    <div>
                        <span class="font-weight-bold v-list-item-title">نام خانوادگی  :  </span>
                        <span class="v-list-item-title"> {{ userData.last_name }} </span>
                    </div>
                </v-col>
                <v-col cols="12" sm="6" lg="4">
                    <div>
                        <span class="font-weight-bold v-list-item-title">تاریخ تولد :  </span>
                        <span class="v-list-item-title"> {{ userData.date_of_birth }} </span>
                    </div>
                </v-col>
            </v-row>
            <v-row align="center" justify="space-between" class="mb-5">
                <v-col cols="12" sm="6" lg="4">
                    <div>
                        <span class="font-weight-bold v-list-item-title">شماره تماس :  </span>
                        <span class="v-list-item-title"> {{ userData.phone }} </span>
                    </div>
                </v-col>
                <v-col cols="12" sm="6" lg="4">
                    <div>
                        <span class="font-weight-bold v-list-item-title">شناسه کاربر :  </span>
                        <span class="v-list-item-title"> {{ userData.id }} </span>
                    </div>
                </v-col>
                <v-col cols="12" sm="6" lg="4">
                    <div>
                        <span class="font-weight-bold v-list-item-title">وضعیت کاربر :  </span>
                        <span class="v-list-item-title"> {{ userData.status }} </span>
                    </div>
                </v-col>
            </v-row>
            <v-row align="center" class="mb-5">
                <v-col cols="12" sm="6" lg="4">
                    <div>
                        <span class="font-weight-bold v-list-item-title">نوع آدرس کاربر :  </span>
                        <span class="v-list-item-title">{{ userData.address_type }} </span>
                    </div>
                </v-col>
                <v-col cols="12" sm="6" lg="4">
                    <div>
                        <span class="font-weight-bold v-list-item-title">کد پستی کاربر :  </span>
                        <span class="v-list-item-title">{{ userData.zip }} </span>
                    </div>
                </v-col>
            </v-row>
            <v-row class="mb-5">
                <v-col cols="12">
                    <div>
                        <span class="font-weight-bold v-list-item-title">آدرس کاربر :  </span>
                        <span class="v-list-item-title">{{ userData.address }}</span>
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <div>
                        <span class="font-weight-bold v-list-item-title">مدارک بارگذاری شده کاربر :  </span>
                        <v-img
                                :width="300"
                                aspect-ratio="4/3"
                                class="mt-5"
                                :src="userData.image"
                        ></v-img>
                    </div>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>


<style scoped>

</style>
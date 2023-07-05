<script setup>
import {onMounted, ref} from "vue";
import LogManager from "@/api/apis/LogManager";
import {useRoute} from "vue-router";

const data = ref()
const route = useRoute()

function getLogData() {
    const id = route.params.id
    LogManager.showLog(id).then(
        (r) => {
            getLogData()
            data.value = r.data.data.log
        }
    )
}

onMounted(() => {
    getLogData()
})
</script>
<template>
    <v-card v-if="data" class="pa-5">
        <v-card-title>مشاهده لاگ</v-card-title>
        <v-divider class="mt-5 mb-5"></v-divider>
        <v-card-text>
            <v-row align="start" justify="space-around">
                <v-list>
                    <v-list-item>
                        <div class="d-flex flex-column gap-2">
                            <v-list-item-title class="font-weight-bold">کاربر :</v-list-item-title>
                            <v-alert :text="data.user.name"></v-alert>
                        </div>
                    </v-list-item>
                    <v-list-item>
                        <div class="d-flex flex-column gap-2">
                            <v-list-item-title class="font-weight-bold">آدرس IP :</v-list-item-title>
                            <v-alert :text="data.ip"></v-alert>
                        </div>
                    </v-list-item>
                    <v-list-item>
                        <div class="d-flex flex-column gap-2">
                            <v-list-item-title class="font-weight-bold">نوع لاگ :</v-list-item-title>
                            <v-alert :text="data.type"></v-alert>
                        </div>
                    </v-list-item>
                    <v-list-item>
                        <div class="d-flex flex-column gap-2">
                            <v-list-item-title class="font-weight-bold">سیستم عامل کاربر :</v-list-item-title>
                            <v-alert :text="data.device"></v-alert>
                        </div>
                    </v-list-item>
                    <v-list-item>
                        <div class="d-flex flex-column gap-2">
                            <v-list-item-title class="font-weight-bold">مرورگر کاربر :</v-list-item-title>
                            <v-alert :text="data.browser"></v-alert>
                        </div>
                    </v-list-item>
                </v-list>

                <v-list>
                    <!--                    <v-list-item>-->
                    <!--                        <div class="d-flex flex-column gap-2">-->
                    <!--                            <v-list-item-title class="font-weight-bold">نام فایل :</v-list-item-title>-->
                    <!--                            <v-alert :text="data.system"></v-alert>-->
                    <!--                        </div>-->
                    <!--                    </v-list-item>-->
                    <!--                    <v-list-item>-->
                    <!--                        <div class="d-flex flex-column gap-2">-->
                    <!--                            <v-list-item-title class="font-weight-bold">شماره خط خطا :</v-list-item-title>-->
                    <!--                            <v-alert text="..."></v-alert>-->
                    <!--                        </div>-->
                    <!--                    </v-list-item>-->
                    <!--                    <v-list-item>-->
                    <!--                        <div class="d-flex flex-column gap-2">-->
                    <!--                            <v-list-item-title class="font-weight-bold">Trace :</v-list-item-title>-->
                    <!--                            <v-alert text="..."></v-alert>-->
                    <!--                        </div>-->
                    <!--                    </v-list-item>-->
                    <v-list-item>
                        <div class="d-flex flex-column gap-2">
                            <v-list-item-title class="font-weight-bold">Old Data :</v-list-item-title>
                            <v-alert>{{ data.data.old.tow_factor_status }} / {{ data.data.old.updated_at }}</v-alert>
                        </div>
                    </v-list-item>
                    <v-list-item>
                        <div class="d-flex flex-column gap-2">
                            <v-list-item-title class="font-weight-bold">New Data :</v-list-item-title>
                            <v-alert>{{ data.data.new.tow_factor_status }} / {{ data.data.new.updated_at }}</v-alert>
                        </div>
                    </v-list-item>
                    <v-list-item>
                        <div class="d-flex flex-column gap-2">
                            <v-list-item-title class="font-weight-bold">توضیحات :</v-list-item-title>
                            <v-alert :text="data.description"></v-alert>
                        </div>
                    </v-list-item>
                </v-list>
            </v-row>
        </v-card-text>
    </v-card>
</template>


<style scoped>

</style>
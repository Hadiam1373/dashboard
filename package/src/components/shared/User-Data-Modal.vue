<script setup>
import {ref} from "vue";

let dialog = ref(false)
const props = defineProps(['data', 'loading'])
</script>

<template>
    <v-dialog
            v-model="dialog"
            activator="parent"
            width="auto"
    >
        <v-card
                min-width="375"
                height="auto"
                rounded="10"
                class="pa-5"
        >
            <div class="d-flex w-100 align-center justify-lg-space-between flex-column">
                <v-avatar
                        color="grey"
                        size="150"
                        rounded="50"
                        variant="outlined"
                        class="reject"
                >
                    <v-img cover :src="data.image"></v-img>
                </v-avatar>
                <v-col>
                    <v-divider></v-divider>
                </v-col>

                <v-row align="center" justify="space-between" class="w-100">
                    <v-col cols="12" sm="6">
                        <v-list-item
                                class="text-white mt-5 text-no-wrap"
                                title="نام کاربر"
                                :subtitle='props.data.name'
                        ></v-list-item>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-list-item
                                class="text-white mt-5 text-no-wrap"
                                title="نام خانوادگی"
                                :subtitle="props.data.last_name"
                        ></v-list-item>
                    </v-col>
                </v-row>
                <v-row align="center" class="w-100" justify="space-between">
                    <v-col cols="12" sm="6">
                        <v-list-item
                                class="text-white mt-5 text-no-wrap"
                                title="نوع آدرس"
                                :subtitle="props.data.address_type"
                        ></v-list-item>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-list-item
                                class="text-white mt-5 text-no-wrap"
                                title="شماره تماس"
                                :subtitle="props.data.phone"
                        ></v-list-item>
                    </v-col>
                </v-row>
                <v-row align="center" class="w-100" justify="space-between">
                    <v-col cols="12" sm="6">
                        <v-list-item
                                class="text-white mt-5 text-no-wrap"
                                title="تاریخ تولد"
                                :subtitle="props.data.date_of_birth"
                        ></v-list-item>
                    </v-col>

                    <v-col cols="12" sm="6">
                        <v-list-item
                                class="text-white mt-5 text-no-wrap"
                                title="کد پستی"
                                :subtitle="props.data.zip"
                        ></v-list-item>
                    </v-col>
                </v-row>
                <v-row align="center" class="w-100" justify="space-between">
                    <v-col cols="12">
                        <v-list-item
                                class="text-white mt-5 text-no-wrap"
                                title="آدرس"
                                :subtitle="props.data.address"
                        ></v-list-item>
                    </v-col>
                </v-row>
            </div>
            <v-btn @click="dialog.value = false" block variant="flat" color="primary" class="mt-5">بستن پنجره</v-btn>
        </v-card>
    </v-dialog>
</template>


<style>
.v-list-item-subtitle {
    margin-top: 5px !important;
}

.accept {
    border: 5px solid #28C76F !important;
}

.reject {
    border: 5px solid #EA5455;
}
</style>
<script setup>
import Users from "@/api/apis/users";
import {onMounted, ref} from "vue";

let profileData = ref()

function getProfileData() {
    Users.getProfile().then(
        (r) => {
            profileData.value = r.data.data
        },
    )
}

onMounted(() => {
    getProfileData()
})
</script>

<template>
    <v-row>
        <v-col v-for="(item , index) in profileData" :key="index" cols="12" lg="3">
            <v-card class="profile-card pa-2">
                <v-col class="text-start">
                    {{ $vuetify.locale.t(`$vuetify.dashboard.cartTitle.${index}`) }}
                </v-col>
                <v-col class="text-end">
                    {{ item }}
                </v-col>
            </v-card>
        </v-col>
    </v-row>
</template>


<style scoped>
.profile-card {
    height: 100px;
}
</style>

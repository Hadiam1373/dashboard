<script setup>
import {ListCheckIcon, MailIcon, UserIcon} from 'vue-tabler-icons';
import Authentication from "@/api/apis/Authentication";
import {router} from '@/router'
import {clearItem, getItem} from "@/storage";
import {computed, onMounted, onUnmounted, ref} from "vue";

let userData = ref({})
let loading = ref(false)

function Logout() {
    loading.value = true
    Authentication.logout().then(r => {
        try {
            if (r.status !== 'error') {
                clearItem()
                router.push('/auth/login');
            }
        } catch (e) {
            loading.value = false
        }
    })
}

const computedUserData = computed(() => {
    return userData = JSON.parse(getItem('userData'))
})
</script>

<template>
  <!-- ---------------------------------------------- -->
  <!-- notifications DD -->
  <!-- ---------------------------------------------- -->
    <v-menu :close-on-content-click="false">
        <template v-slot:activator="{ props }">
            <v-btn class="profileBtn custom-hover-primary" variant="text" v-bind="props" icon>
                <v-avatar size="35">
                    <img src="@/assets/images/users/avatar-1.jpg" height="35" alt="user"/>
                </v-avatar>
            </v-btn>
        </template>
        <v-sheet rounded="md" width="200" elevation="10" class="mt-2">
            <v-list class="py-0" lines="one" density="compact">
                <v-list-item>
                    <v-list-item-title>
                        {{ computedUserData.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle class="mt-2">
                        {{ computedUserData.email }}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle class="mt-2">
                        {{ computedUserData.roles[0] }}
                    </v-list-item-subtitle>
                </v-list-item>
                <v-divider class="mt-2 mb-2"></v-divider>
                <v-list-item value="item1" active-color="primary">
                    <template v-slot:prepend>
                        <SettingsIcon stroke-width="1.5" size="20"/>
                    </template>
                    <v-list-item-title @click="router.push('/setting')" class="pl-4 mx-1 text-body-1">
                        {{ $vuetify.locale.t(`$vuetify.sidebar.setting`) }}
                    </v-list-item-title>
                </v-list-item>
                <v-list-item value="item2" active-color="primary">
                    <template v-slot:prepend>
                        <WalletIcon stroke-width="1.5" size="20"/>
                    </template>
                    <v-list-item-title class="pl-4 text-body-1">
                        <v-list-item-title @click="router.push('/wallets')" class="pl-4 mx-1 text-body-1">
                            {{ $vuetify.locale.t(`$vuetify.sidebar.wallets`) }}
                        </v-list-item-title>
                    </v-list-item-title>
                </v-list-item>
                <v-list-item value="item3" active-color="primary">
                    <template v-slot:prepend>
                        <ReportMoneyIcon stroke-width="1.5" size="20"/>
                    </template>
                    <v-list-item-title class="pl-4 mx-1 text-body-1">
                        {{ $vuetify.locale.t(`$vuetify.sidebar.profits`) }}
                    </v-list-item-title>
                </v-list-item>
            </v-list>
            <div class="pt-4 pb-4 px-5 text-center">
                <v-btn @click="Logout" :loading="loading" color="primary" variant="outlined" block>
                    {{ $vuetify.locale.t(`$vuetify.sidebar.Logout`) }}
                </v-btn>
            </div>
        </v-sheet>
    </v-menu>
</template>

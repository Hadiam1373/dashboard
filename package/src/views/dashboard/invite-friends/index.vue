<script setup>
import Invite from "@/components/invite-friends/invite.vue";
import FriendsList from "@/components/invite-friends/friends-list.vue";
import InviteFriends from "@/api/apis/InviteFriends";
import NotVerify2FA from "@/components/shared/NotVerify2FA.vue";
import {onMounted, ref} from "vue";

const friends = ref()
const inviteCode = ref()
let google_2factor_status = ref()

async function copyCode(value) {
    await navigator.clipboard.writeText(value);
}

function getIndex() {
    InviteFriends.getIndexData().then(
        (r) => {
            friends.value = r.data.data.friends.data
            inviteCode.value = r.data.data.code
            google_2factor_status.value = r.data.data.google_2factor_status
        }
    )
}


onMounted(() => {
    getIndex()
})
</script>

<template>
    <v-row>
        <v-col cols="12">
            <v-card class="pa-5">
                <NotVerify2FA v-if="google_2factor_status === 'disable'"/>
                <invite v-else/>
            </v-card>
        </v-col>
        <v-col cols="12">
            <v-card class="pa-5">
                <v-card-title>کد دعوت شما</v-card-title>
                <v-card-subtitle>با این کد دوستان خود را به این پلتفرم دعوت کنید !</v-card-subtitle>
                <v-chip
                        class="ma-2 mt-5 cursor-pointer"
                        color="primary"
                        label
                        size="large"
                        @click="copyCode(inviteCode)"
                >
                    <v-icon start icon="mdi-account-circle-outline"></v-icon>
                    {{ inviteCode }}
                    <v-tooltip
                            activator="parent"
                            location="top"
                    >
                        {{ inviteCode }}
                    </v-tooltip>
                </v-chip>
            </v-card>
        </v-col>
        <v-col cols="12">
            <v-card class="pa-5">
                <friends-list :friends="friends"/>
            </v-card>
        </v-col>
    </v-row>
</template>


<style scoped>

</style>
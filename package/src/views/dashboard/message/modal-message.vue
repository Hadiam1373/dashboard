<template>
    <v-dialog v-model="dialog" :loading="dialog" width="auto">
        <v-card class="pa-5">
            موضوع پیام :
            <v-card-title class="mb-5">
                {{data && data.subject }}
            </v-card-title>
            متن پیام :
            <v-card-text class="mb-5">{{ data && data.description }}</v-card-text>
            <v-card-actions>
                <v-btn color="primary" block @click="dialog = false">بستن پنجره</v-btn>
            </v-card-actions>
        </v-card>
        <template v-slot:activator>
            <v-btn size="x-small" color="info" @click="getMessageData" icon="mdi-eye-outline"></v-btn>
        </template>
    </v-dialog>
</template>

<script setup>
import {onMounted, ref} from "vue";
import Message from "@/api/apis/Mesages"

const props = defineProps(['id']);
let dialog = ref(false);
let data = ref(null);

async function getMessageData() {
    try {
        const response = await Message.showMessage(props.id);
        data.value = response.data.data.contact;
        dialog.value = true;
    } catch (error) {
        console.error(error);
    }
}
</script>

<style scoped>
</style>

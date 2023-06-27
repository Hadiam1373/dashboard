<template>
    <v-card class="pa-5 mx-4">
        <perfect-scrollbar class="scroll-area">
            <div class="w-90 mb-2 mx-3"
                 v-for="(item , index) in data">
                <v-alert max-width="300px" :key="index" class="mr-auto" v-if="item.side_right" size="large" color="secondary">
                    {{ item.message }}
                    <caption class="date">{{ item.created_at }}</caption>
                </v-alert>
                <v-alert max-width="300px" :key="index" class="ml-auto" v-if="!item.side_right" size="large" color="primary">
                    {{ item.message }}
                    <caption class="date">{{ item.created_at }}</caption>
                </v-alert>
            </div>
        </perfect-scrollbar>

        <v-spacer></v-spacer>
        <v-row align="center">
            <v-col cols="12">
                <v-textarea v-model="message"
                            variant="outlined" no-resize
                            color="primary" rows="1"
                            label="متن پیام"
                            row-height="15" hide-details>
                </v-textarea>
            </v-col>

            <v-col cols="12">
                <v-row align="center" justify="space-between">
                    <v-col cols="12" sm="6">
                        <v-file-input label="فایل" hide-details variant="outlined"></v-file-input>
                    </v-col>
                    <v-col cols="12" sm="3">
                        <v-btn @click="sendTicket" block color="primary" size="large" variant="flat">ارسال تیکت</v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-card>
</template>

<script setup>
import {onMounted, ref} from "vue";
import Ticket from "@/api/apis/Ticket";
import {useRoute} from "vue-router";

const route = useRoute()
const props = defineProps(['data'])

let data = ref()
let message = ref()

function sendTicket() {
    const id = route.params.id
    Ticket.sendTicket(id, message.value).then(
        (r) => {
            getTicket()
        }
    )
}

function getTicket(){
    const id = route.params.id
    Ticket.showTicket(id).then(
        (r) => {
            data.value = r.data.data.ticket.messages
        }
    )
}

onMounted(() => {
    getTicket()
})
</script>

<style scoped>
.main-message-container {
    width: 100%;
    height: 300px;
    overflow: scroll;
}

.scroll-area {
    position: relative;
    margin: auto;
    width: 100%;
    height: 300px;
}

.date {
    font-size: 10px;
    position: absolute;
    left: 5px;
}
</style>
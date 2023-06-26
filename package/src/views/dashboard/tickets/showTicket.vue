<template>
    <v-row align="start" justify="space-between">
        <v-col cols="12" lg="6">
           <TicketData v-if="ticketData" :data="ticketData"/>
        </v-col>

        <v-col cols="12" lg="6">
            <chat v-if="ticketData" :data="message"/>
        </v-col>
    </v-row>

</template>

<script setup>
import Chat from "@/components/ticket/chat.vue";
import Ticket from "@/api/apis/Ticket";
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import TicketData from "@/components/ticket/TicketData.vue";

let message = ref()
let ticketData = ref()
const route = useRoute()

function getTicket() {
    const id = route.params.id
    Ticket.showTicket(id).then(
        (r) => {
            message.value = r.data.data.ticket.messages
            ticketData.value = r.data.data.ticket
        }
    )
}

onMounted(() => {
    getTicket()
})
</script>

<style scoped>

</style>
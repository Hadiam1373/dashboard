<template>
    <chat :data="message"/>
</template>

<script setup>
import Chat from "@/components/ticket/chat.vue";
import Ticket from "@/api/apis/Ticket";
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
let message = ref()
const route = useRoute()

function getTicket(){
    const id = route.params.id
    Ticket.showTicket(id).then(
        (r) => {
            message.value = r.data.data.ticket.messages
        }
    )
}

onMounted(() => {
    getTicket()
})
</script>

<style scoped>

</style>
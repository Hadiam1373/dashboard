<template>
    <v-card class="pa-5">
        <v-card-title>مشخصات تیکت</v-card-title>
        <v-divider class="mt-5 mb-5"></v-divider>
        <v-col cols="12">
            <span class="font-weight-bold">عنوان تیکت : </span>
            <span>{{props.data.subject}}</span>
        </v-col>
        <v-col cols="12">
            <span class="font-weight-bold">واحد پشتیبانی : </span>
            <span>{{props.data.department_name}}</span>
        </v-col>
        <v-col cols="12">
            <span class="font-weight-bold">وضعیت تیکت : </span>
            <span>{{props.data.status}}</span>
        </v-col>
        <v-col cols="12">
            <span class="font-weight-bold">تاریخ ایجاد : </span>
            <span>{{props.data.created_at}}</span>
        </v-col>
        <v-col cols="12">

            <question-modal :dialog="dialog" ok="بله" cancel="خیر"
                            text="ایا از بستن تیکت اطمینان دارید؟"
                            @confirm="closeTicket" @reject="dialog = false"
            >
                <template #element>
                    <v-btn :disabled="props.data.status === 'بسته شده'" variant="flat" @click="dialog = true" color="error" block>بستن تیکت</v-btn>
                </template>
            </question-modal>
        </v-col>
    </v-card>
</template>

<script setup>
import Ticket from "@/api/apis/Ticket";
import QuestionModal from "@/components/shared/QuestionModal.vue";
import {ref} from "vue";
import {succsessToast} from "@/plugins/ToastAlert";

const props = defineProps(['data'])
let dialog = ref(false)

function closeTicket(){
 const id = props.data.id
    Ticket.CloseTicket(id).then(
        (r)=>{
            dialog.value = false
            succsessToast.fire({
                icon: 'success',
                text: r.data.message
            }).then(r => true)
        }
    )
}
</script>

<style scoped>

</style>
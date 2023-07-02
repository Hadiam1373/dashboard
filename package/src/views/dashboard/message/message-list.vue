<script setup>
import FiltersTable from "@/components/shared/FiltersTable.vue";
import Status from "@/components/shared/Status.vue";
import DataTable from "@/components/shared/DataTable.vue";
import {computed, onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import QuestionModal from "@/components/shared/QuestionModal.vue";
import Message from '@/api/apis/Mesages';
import ModalMessage from "@/views/dashboard/message/modal-message.vue";


const router = useRouter()
let page = ref(1)
let status = ref()
let kycList = ref()
let perPage = ref()
let total = ref()
let messages = ref()
let loading = ref(false)
let dialog = ref(false)


let paginationLength = computed(() => {
    let length = Math.ceil(total.value / perPage.value)
    return length > 1 ? length : 0
})

let inputs = ref([
    {type: 'text', label: 'user', key: 'one'},
    {type: 'text', label: 'email', key: 'two'},
    {type: 'text', label: 'subject', key: 'tree'},
])

let headers = ref([
    {title: 'id', align: 'start', key: 'id'},
    {title: 'fullName', align: 'center', key: 'fullName'},
    // {title: 'user', align: 'center', key: 'user'},
    {title: 'email', align: 'center', key: 'email'},
    {title: 'subject', align: 'center', key: 'subject'},
    {title: 'date', align: 'center', key: 'date'},
    {title: 'action', align: 'end', key: 'action'},
])


function getDataFilters(filter) {
    Message.getMessages(page.value, filter.text1, filter.text2, filter.text3).then(
        (r) => {
            messages.value = r.data.data.contacts.data
        }
    )
}

function deleteMessage(id) {
    Message.deleteMessage(id).then(
        () => {
            getData()
        }
    )
}


function getData() {
    Message.getMessages().then(
        (r) => {
            messages.value = r.data.data.contacts.data
        }
    )
}

onMounted(() => {
    getData()
})
</script>

<template>
    <v-card>
        <v-card-title>
            <div class="d-flex w-100 justify-space-between align-center pa-0 pa-lg-5">
                <div>
                    <span>
                        لیست پیام ها
                    </span>
                </div>
            </div>
        </v-card-title>
        <filters-table remove="remove"
                       :item1="status" search="search" @getDataFilters="getDataFilters"
                       @removeDataFilters="getData" :inputs="inputs"
        />
        <v-divider class="mb-5"></v-divider>
        <DataTable :headers="headers"
                   :dataTable="messages"
                   :page="page"
                   :total="total"
                   :perPage="perPage"
                   local="messages"
        >
            <template v-slot:body="{item}">
                <td class="text-center">{{ item.id }}</td>
                <td class="text-center">{{ item.full_name }}</td>
                <td class="text-center">{{ item.email }}</td>
                <td class="text-center">{{ item.subject }}</td>
                <td class="text-center">{{ item.created_at }}</td>
                <td class="text-center d-flex align-center">
                    <modal-message v-if="item.id" :id="item.id"/>
                    <question-modal class="mx-1" :dialog="dialog" ok="بله" cancel="خیر"
                                    text="ایا از حذف پیام اطمینان دارید؟"
                                    @confirm="deleteMessage(item.id)" @reject="dialog = false"
                    >
                        <template #element>
                            <v-btn size="x-small" @click="dialog = true" color="error"
                                   icon="mdi-window-close"></v-btn>
                        </template>
                    </question-modal>
                </td>
            </template>
        </DataTable>
        <v-col cols="12">
            <div class="d-flex justify-center align-center">
                <v-pagination active-color="primary" v-model="page" total-visible="3"
                              :length="paginationLength"></v-pagination>
            </div>
        </v-col>
    </v-card>
</template>


<style scoped>

</style>

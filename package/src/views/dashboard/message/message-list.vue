<script setup>
import FiltersTable from "@/components/shared/FiltersTable.vue";
import Status from "@/components/shared/Status.vue";
import DataTable from "@/components/shared/DataTable.vue";
import {computed, onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import QuestionModal from "@/components/shared/QuestionModal.vue";
import Message from "@/views/dashboard/message/index.vue";


const router = useRouter()
let page = ref(1)
let status = ref()
let kycList = ref()
let perPage = ref()
let total = ref()
let userData = ref()
let loading = ref(false)
let dialog = ref(false)


let paginationLength = computed(() => {
    let length = Math.ceil(total.value / perPage.value)
    return length > 1 ? length : 0
})

let inputs = ref([
    {type: 'text', label: 'email', key: 'one'},
    {type: 'select', label: 'type', key: 'one'}
])

let headers = ref([
    {title: 'id', align: 'start', key: 'id'},
    {title: 'user', align: 'center', key: 'user'},
    {title: 'fullName', align: 'center', key: 'fullName'},
    {title: 'email', align: 'center', key: 'email'},
    {title: 'subject', align: 'center', key: 'subject'},
    {title: 'date', align: 'center', key: 'date'},
    {title: 'action', align: 'end', key: 'action'},
])


function getDataFilters(filter) {

}

function rejectUser(id) {

}


function getData() {
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
                   dataTable=""
                   :page="page"
                   :total="total"
                   :perPage="perPage"
                   local="messages"
        >
            <template v-slot:body="{item}">
                <td class="text-center">{{ item.user.id }}</td>
                <td class="text-center">{{ item.user.roles }}</td>
                <td class="text-center">{{ item.user.name }}</td>
                <td class="text-center">{{ item.email }}</td>
                <td class="text-center">{{ item.subject }}</td>
                <td class="text-center">{{ item.created_at }}</td>
                <td class="text-center d-flex align-center">
                    <v-btn size="x-small" color="info" @click="router.push(`/kyc/user/${item.id}`)"
                           icon="mdi-eye-outline">
                    </v-btn>

                    <question-modal :dialog="dialog" ok="بله" cancel="خیر"
                                    text="ایا از عدم تایید کاربر اطمینان دارید؟"
                                    @confirm="rejectUser(item.id)" @reject="dialog = false"
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

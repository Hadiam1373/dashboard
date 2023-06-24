<script setup>

import FiltersTable from "@/components/shared/FiltersTable.vue";
import Status from "@/components/shared/Status.vue";
import DataTable from "@/components/shared/DataTable.vue";
import {computed, onMounted, ref, watch} from "vue";
import Profit from "@/api/apis/Profit";
import {useRouter} from "vue-router";
const router = useRouter()
let page = ref(1)
let status = ref()
let profitData = ref()
let perPage = ref()
let total = ref()

let inputs = ref([
    {type: 'text', label: 'type', key: 'one'},
    {type: 'select', label: 'support_department', key: 'one'}
])

let headers = ref([
    {title: 'subject', align: 'start', key: 'subject'},
    {title: 'department', align: 'center', key: 'department'},
    {title: 'status', align: 'center', key: 'status'},
    {title: 'created_at', align: 'center', key: 'created_at'},
    {title: 'action', align: 'end', key: 'action'},
])

let paginationLength = computed(() => {
    let length = Math.ceil(total.value / perPage.value)
    return length > 1 ? length : 0
})
function getDataFilters(filter){
    Profit.getProfit(page.value , filter.text1 , filter.select1).then(
        (r) => {

        },
    )
}

function getData(){
    Profit.getProfit(page.value).then(
        (r) => {

        },
    )
}

watch(page, (newX) => {
    getData()
})

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
                        لیست تیکت ها
                    </span>
                </div>
            </div>
        </v-card-title>
        <filters-table  remove="remove"
                        :item1="status" search="search" @getDataFilters="getDataFilters"
                        @removeDataFilters="getData" :inputs="inputs"
        />
        <v-divider class="mb-5"></v-divider>
        <DataTable :headers="headers"
                   :dataTable="profitData"
                   :page="page"
                   :total="total"
                   :perPage="perPage"
                   local="tickets"
        >
            <template v-slot:body="{item}">
                <td class="text-center">{{ item.subject }}</td>
                <td class="text-center">{{ item.department.name }}</td>
                <td class="text-center">
                    <status :value="status" :status="status"/>
                </td>
                <td class="text-center">{{ item.created_at }}</td>
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


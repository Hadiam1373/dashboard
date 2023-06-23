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
    {type: 'text', label: 'profit', key: 'one'},
    {type: 'select', label: 'type', key: 'one'}
])

let headers = ref([
    {title: 'id', align: 'start', key: 'id'},
    {title: 'amount', align: 'center', key: 'amount'},
    {title: 'user', align: 'center', key: 'user'},
    {title: 'package', align: 'end', key: 'package'},
    {title: 'status', align: 'end', key: 'status'},
    {title: 'date', align: 'end', key: 'creation_date'}

])

let paginationLength = computed(() => {
    let length = Math.ceil(total.value / perPage.value)
    return length > 1 ? length : 0
})
function getDataFilters(filter){
    Profit.getProfit(page.value , filter.text1 , filter.select1).then(
        (r) => {
            profitData.value = r.data.data.profits.data
            perPage.value = r.data.data.profits.meta.per_page
            total.value = r.data.data.profits.meta.total
            status.value = r.data.data.status
        },
    )
}

function getData(){
  Profit.getProfit(page.value).then(
      (r) => {
          profitData.value = r.data.data.profits.data
          perPage.value = r.data.data.profits.meta.per_page
          total.value = r.data.data.profits.meta.total
          status.value = r.data.data.status
          console.log(r.data.data.status)
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
                        لیست درآمد ها
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
                   local="profit"
        >
            <template v-slot:body="{item}">
                <td class="text-center">{{ item.id }}</td>
                <td class="text-center">{{ item.amount }}</td>
                <td class="text-center">{{ item.user }}</td>
                <td class="text-center">{{ item.package }}</td>
                <td class="text-center">
                    <status :value="item.status_label" :status="item.status"/>
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

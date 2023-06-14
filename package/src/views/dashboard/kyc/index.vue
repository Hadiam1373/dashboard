<script setup>

import FiltersTable from "@/components/shared/FiltersTable.vue";
import Status from "@/components/shared/Status.vue";
import DataTable from "@/components/shared/DataTable.vue";
import {ref} from "vue";
import Profit from "@/api/apis/Profit";
import {useRouter} from "vue-router";

const router = useRouter()
let page = ref(1)
let status = ref()
let profitData = ref()
let perPage = ref()
let total = ref()

let inputs = ref([
    {type: 'text', label: 'email', key: 'one'},
    {type: 'select', label: 'type', key: 'one'}
])

let headers = ref([
    {title: 'id', align: 'start', key: 'id'},
    {title: 'user', align: 'center', key: 'user'},
    {title: 'status', align: 'end', key: 'status'},
    {title: 'date', align: 'end', key: 'creation_date'},
    {title: 'action', align: 'end', key: 'action'},
])

function getDataFilters() {

}

function getData() {
    Profit.getProfit(page.value, status.value).then(
        (r) => {
            profitData.value = r.data.data.profits.data
            perPage.value = r.data.data.profits.meta.per_page
            total.value = r.data.data.profits.meta.total
            status.value = r.data.data.status
        },
    )
}
</script>

<template>
    <v-card>
        <v-card-title>
            <div class="d-flex w-100 justify-space-between align-center pa-0 pa-lg-5">
                <div>
                    <span>
                        لیست احراز هویت ها
                    </span>
                </div>
            </div>
        </v-card-title>
        <filters-table remove="remove"
                       item1="" search="search" @getDataFilters="getDataFilters"
                       @removeDataFilters="getData" :inputs="inputs"
        />
        <v-divider class="mb-5"></v-divider>
        <DataTable :headers="headers"
                   :dataTable="profitData"
                   :page="page"
                   :total="total"
                   :perPage="perPage"
                   local="kycList"
        >
            <template v-slot:body="{item}">
                <td class="text-center">{{ item.id }}</td>
                <td class="text-center">{{ item.name }}</td>
                <td class="text-center">
                    <status :value="item.status_label" :status="item.status"/>
                </td>
                <td class="text-center">{{ item.created_at }}</td>
                <td class="text-center d-none d-lg-table-cell d-sm-none">
                    <v-btn size="small" color="secondary" class="mx-1 mt-2 mt-lg-0" prepend-icon="mdi-receipt">
                        {{ $vuetify.locale.t(`$vuetify.dashboard.gateWays.invoice`) }}
                    </v-btn>
                    <v-btn @click="router.push(`/gateways/newGateways/${item.id}`)" size="small" color="primary"
                           class="mx-1 mt-2 mt-lg-0" prepend-icon="mdi-cog">
                        {{ $vuetify.locale.t(`$vuetify.dashboard.gateWays.setting`) }}
                    </v-btn>
                </td>
                <td class="text-center d-lg-none">
                    <v-icon class="mx-1" color="primary">mdi-receipt</v-icon>
                    <v-icon class="mx-1" @click="router.push(`/gateways/newGateways/${item.id}`)" color="secondary">
                        mdi-cog
                    </v-icon>
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
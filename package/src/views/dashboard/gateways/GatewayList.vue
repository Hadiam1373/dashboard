<script setup>
import Gateways from "@/api/apis/Gateways";
import {watch, onMounted, ref, computed} from "vue";
import DataTable from "@/components/shared/DataTable.vue";
import FiltersTable from "@/components/shared/FiltersTable.vue";
import Status from "@/components/shared/Status.vue";
import {useRouter} from "vue-router";

const router = useRouter()
let gateWaysData = ref()
let perPage = ref()
let total = ref()
let page = ref(1)
let status = ref()

let paginationLength = computed(() => {
    let length = Math.ceil(total.value / perPage.value)
    return length > 1 ? length : 0
})

let headers = ref([
    {title: 'id', align: 'start', key: 'id'},
    {title: 'name', align: 'center', key: 'name'},
    {title: 'status_label', align: 'center', key: 'status_label'},
    {title: 'created_at', align: 'end', key: 'created_at'},
    {title: 'action', align: 'end', key: 'action'},
])

let inputs = ref([
    {type: 'text', label: 'gatName', key: 'one'},
    {type: 'select', label: 'type', key: 'one'}
])


function getData() {
    Gateways.getGateways(page.value).then(
        (r) => {
            gateWaysData.value = r.data.data.gateways.data
            perPage.value = r.data.data.gateways.meta.per_page
            total.value = r.data.data.gateways.meta.total
            status.value = r.data.data.status
        },
    )
}

function getDataFilters(filter) {
    Gateways.getGateways(page.value, filter.text1 , filter.select1).then(
        (r) => {
            gateWaysData.value = r.data.data.gateways.data
            perPage.value = r.data.data.gateways.meta.per_page
            total.value = r.data.data.gateways.meta.total
            status.value = r.data.data.status
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
                        {{ $vuetify.locale.t(`$vuetify.dashboard.gateWays.title`) }}
                    </span>
                </div>
                <div>
                    <v-btn color="primary" class="d-none d-lg-block d-sm-none"
                           @click="router.push('/gateways/newGateways')">
                        {{ $vuetify.locale.t(`$vuetify.dashboard.gateWays.create`) }}
                    </v-btn>
                    <v-icon class="d-lg-none" @click="router.push('/gateways/newGateways')" color="primary">mdi-plus
                    </v-icon>
                </div>
            </div>
        </v-card-title>
        <filters-table remove="remove"
                       :item1="status" search="search" @getDataFilters="getDataFilters"
                       @removeDataFilters="getData" :inputs="inputs"
        />
        <v-divider class="mb-5"></v-divider>
        <DataTable :headers="headers"
                   :dataTable="gateWaysData"
                   :page="page"
                   :total="total"
                   :perPage="perPage"
                   local="gateWays"
        >
            <template v-slot:body="{item}">
                <td class="text-center">{{ item.id }}</td>
                <td class="text-center">{{ item.name }}</td>
                <td class="text-center">
                    <status :value="item.status_label" :status="item.status"/>
                </td>
                <td class="text-center">{{ item.created_at }}</td>
                <td class="text-center d-none d-lg-table-cell d-sm-none">
                    <v-btn size="small" color="secondary" @click="router.push(`/invoices/invoice-list/${item.name}`)" class="mx-1 mt-2 mt-lg-0" prepend-icon="mdi-receipt">
                        {{ $vuetify.locale.t(`$vuetify.dashboard.gateWays.invoice`) }}
                    </v-btn>
                    <v-btn @click="router.push(`/gateways/newGateways/${item.id}`)" size="small" color="primary"
                           class="mx-1 mt-2 mt-lg-0" prepend-icon="mdi-cog">
                        {{ $vuetify.locale.t(`$vuetify.dashboard.gateWays.setting`) }}
                    </v-btn>
                </td>
                <td class="text-center d-lg-none">
                    <v-icon class="mx-1" @click="router.push(`/invoices/invoice-list/${item.name}`)" color="primary">mdi-receipt</v-icon>
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
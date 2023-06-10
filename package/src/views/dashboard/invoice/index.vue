<script setup>
import Status from "@/components/shared/Status.vue";
import DataTable from "@/components/shared/DataTable.vue";
import FiltersTable from "@/components/shared/FiltersTable.vue";
import {computed, onMounted, ref, watch} from "vue";
import Invoice from "@/api/apis/Invoice";
import {useRouter} from "vue-router";

const router = useRouter()

let gateWaysData = ref()
let gate = ref([])
let perPage = ref()
let total = ref()
let page = ref(1)
let status = ref()
let invoiceData = ref()

let paginationLength = computed(() => {
    let length = Math.ceil(total.value / perPage.value)
    return length > 1 ? length : 0
})

// let gateways = computed(async () => {
//     gateWaysData.value.forEach(item => gate.value.push(item.name))
//     return gate
// })

let headers = ref([
    {title: 'id', align: 'start', key: 'id'},
    {title: 'amount', align: 'center', key: 'name'},
    // {title: 'status_label', align: 'center', key: 'status_label'},
    {title: 'created_at', align: 'center', key: 'created_at'},
    {title: 'token', align: 'center', key: 'token'},
    {title: 'action', align: 'end', key: 'action'},
])

let inputs = ref([
    {type: 'select', label: 'gatName', key: 'one'},
    {type: 'select', label: 'type', key: 'two'}
])


function getData() {
    Invoice.getInvoice(page.value).then(
        (r) => {
            // gateWaysData.value = r.data.data.gateways
            gateWaysData.value = r.data.data.gateways
            gateWaysData.value.forEach(item => gate.value.push(item.name))
            invoiceData.value = r.data.data.invoices.data
            perPage.value = r.data.data.invoices.meta.per_page
            total.value = r.data.data.invoices.meta.total
            // status.value = r.data.data.status
        },
    )
}

function getDataFilters(filter) {
    Invoice.getInvoice(page.value, filter.select1, filter.select2).then(
        (r) => {
            gateWaysData.value = r.data.data.gateways
            invoiceData.value = r.data.data.invoices.data
            perPage.value = r.data.data.invoices.meta.per_page
            total.value = r.data.data.invoices.meta.total
            // status.value = r.data.data.status
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
                        {{ $vuetify.locale.t(`$vuetify.dashboard.invoice.title`) }}
                    </span>
                </div>
                <div>
                    <v-btn color="primary" @click="router.push('/invoices/invoice-setting')">
                        {{ $vuetify.locale.t(`$vuetify.dashboard.invoice.create`) }}
                    </v-btn>
                </div>
            </div>
        </v-card-title>
        <filters-table label1="gatName" label2="type" remove="remove"
                       :item1="gate" search="search" @getDataFilters="getDataFilters"
                       @removeDataFilters="getData" :inputs="inputs"
        />
        <v-divider class="mb-5"></v-divider>
        <DataTable :headers="headers"
                   :dataTable="invoiceData"
                   :page="page"
                   :total="total"
                   :perPage="perPage"
                   local="invoice"
        >
            <template v-slot:body="{item}">
                <td class="text-center">{{ item.id }}</td>
                <td class="text-center">{{ item.cost }}</td>
                <!--                <td class="text-center d-flex justify-center align-center">-->
                <!--                    <status :value="item.status_label" :status="item.status"/>-->
                <!--                </td>-->
                <td class="text-center">{{ item.created_at }}</td>
                <td class="text-center">{{ item.token }}</td>
                <td class="text-center d-none d-lg-table-cell d-sm-none">
                    <v-btn @click="$router.push(`/gateways/newGateways/${item.id}`)" size="small" color="primary"
                           class="mx-1 mt-2 mt-lg-0" prepend-icon="mdi-receipt">
                        {{ $vuetify.locale.t(`$vuetify.dashboard.invoice.factor`) }}
                    </v-btn>
                    <v-btn size="small" class="mx-1 mt-2 mt-lg-0" color="info" prepend-icon="mdi-pen">
                        {{ $vuetify.locale.t(`$vuetify.dashboard.invoice.setting`) }}
                    </v-btn>
                    <v-btn @click="$router.push(`/gateways/newGateways/${item.id}`)" size="small" color="error"
                           class="mx-1 mt-2 mt-lg-0" prepend-icon="mdi-close">
                        {{ $vuetify.locale.t(`$vuetify.dashboard.invoice.disable`) }}
                    </v-btn>
                </td>
                <td class="text-center d-flex align-center  d-lg-none">
                    <v-icon class="mx-1" color="primary">mdi-receipt</v-icon>
                    <v-icon class="mx-1" color="secondary">mdi-cog</v-icon>
                </td>
            </template>
        </DataTable>
        <v-col cols="12">
            <div class="d-flex justify-center align-center">
                <v-pagination active-color="primary" v-model="page" :length="paginationLength"></v-pagination>
            </div>
        </v-col>
    </v-card>
</template>

<style scoped>

</style>
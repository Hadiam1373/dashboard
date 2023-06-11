<script setup>
import Status from "@/components/shared/Status.vue";
import DataTable from "@/components/shared/DataTable.vue";
import FiltersTable from "@/components/shared/FiltersTable.vue";
import {computed, onMounted, ref, watch} from "vue";
import Invoice from "@/api/apis/Invoice";
import {useRouter} from "vue-router";
import QuestionModal from "@/components/shared/QuestionModal.vue";

const router = useRouter()

let gateWaysData = ref()
let gate = ref([])
let gateId = ref([])
let perPage = ref()
let total = ref()
let page = ref(1)
let status = ref()
let invoiceData = ref()
let dialog = ref(false)
let date = ref()

let paginationLength = computed(() => {
    let length = Math.ceil(total.value / perPage.value)
    return length > 1 ? length : 0
})


let headers = ref([
    {title: 'id', align: 'start', key: 'id'},
    {title: 'amount', align: 'center', key: 'name'},
    {title: 'filled', align: 'center', key: 'filled'},
    {title: 'user', align: 'center', key: 'user'},
    {title: 'user_charged', align: 'center', key: 'user_charged'},
    {title: 'last_tx_id', align: 'center', key: 'last_tx_id'},
    {title: 'status_label', align: 'center', key: 'status_label'},
    {title: 'created_at', align: 'center', key: 'created_at'},
    {title: 'action', align: 'end', key: 'action'},
])

let inputs = ref([
    {type: 'select', label: 'gatName', key: 'one'},
    {type: 'select', label: 'type', key: 'two'}
])

function showFactor(token) {
    window.open(`https://test.bitocredit.com/gateway/pay/invoice/${token}`, '_blank')
}

function getData() {
    Invoice.getInvoice(page.value).then(
        (r) => {
            gateWaysData.value = r.data.data.gateways
            gateWaysData.value.forEach(item => gate.value.push(item.name))
            gateWaysData.value.forEach(item => gateId.value.push(item.id))
            invoiceData.value = r.data.data.invoices.data
            perPage.value = r.data.data.invoices.meta.per_page
            total.value = r.data.data.invoices.meta.total
            status.value = r.data.data.status
        },
    )
}

function deleteFactor(id) {
    Invoice.rejectInvoice(id).then(
        () => {
            dialog.value = false
        }
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
                <vue3-persian-datetime-picker v-model="date"></vue3-persian-datetime-picker>
                <div>
                    <v-btn color="primary" class="d-none d-lg-block d-sm-none" @click="router.push('/invoices/invoice-setting')">
                        {{ $vuetify.locale.t(`$vuetify.dashboard.invoice.create`) }}
                    </v-btn>
                    <v-icon class="d-lg-none" @click="router.push('/invoices/invoice-setting')" color="primary">mdi-plus</v-icon>
                </div>
            </div>
        </v-card-title>
        <filters-table label1="gatName" label2="type" remove="remove"
                       :item1="gate" :item2="status" search="search" @getDataFilters="getDataFilters"
                       @removeDataFilters="getData" :inputs="inputs" itemTitle1="name"
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
                <td class="text-center">{{ item.filled }}</td>
                <td class="text-center">{{ item.user.name }}</td>
                <td class="text-center">{{ item.user_charged }}</td>
                <td class="text-center mx-wi text-no-wrap">
                    <v-tooltip :text="item.last_tx_id">
                        <template v-slot:activator="{ props }">
                            <a class="cursor-pointer" v-bind="props">{{ item.last_tx_id }}</a>
                        </template>
                    </v-tooltip>
                </td>
                <td class="text-center">
<!--                    <status :value="item.status_label" :status="item.status_label"/>-->
                    {{item.status_label}}
                </td>
                <td class="text-center">{{ item.created_at }}</td>
                <td class="text-center d-none d-lg-flex align-center d-sm-none">
                    <v-btn @click="showFactor(item.token)"
                           size="small" color="primary"
                           class="mx-1 mt-2 mt-lg-0" prepend-icon="mdi-receipt">
                        {{ $vuetify.locale.t(`$vuetify.dashboard.invoice.factor`) }}
                    </v-btn>
                    <v-btn size="small" class="mx-1 mt-2 mt-lg-0" color="info" prepend-icon="mdi-pen">
                        {{ $vuetify.locale.t(`$vuetify.dashboard.invoice.setting`) }}
                    </v-btn>
                    <question-modal  :dialog="dialog"
                                    title="آیا از غیر فعال کردن این صورت حساب اطمینان دارید؟" ok="بله"
                                    cancel="انصراف" @confirm="deleteFactor(item.id)" @reject="dialog = false">
                        <template v-slot:element="{props}">
                            <v-btn size="small" color="error" @click="dialog =! dialog"
                                   class="mx-1 mt-2 mt-lg-0" prepend-icon="mdi-close">
                                {{ $vuetify.locale.t(`$vuetify.dashboard.invoice.disable`) }}
                            </v-btn>
                        </template>
                    </question-modal>
                </td>
                <td class="text-center d-lg-none">
                    <div class="d-flex align-center w-100">
                    <v-icon @click="showFactor(item.token)" class="mx-1" color="primary">mdi-receipt</v-icon>
                    <v-icon class="mx-1" color="info">mdi-pen</v-icon>
                    <question-modal class="mx-1" :dialog="dialog"
                                    title="آیا از غیر فعال کردن این صورت حساب اطمینان دارید؟" ok="بله"
                                    cancel="انصراف" @confirm="deleteFactor(item.id)" @reject="dialog = false">
                        <template v-slot:element="{props}">
                            <v-icon class="mx-1" color="error" @click="dialog =! dialog">mdi-close</v-icon>
                        </template>
                    </question-modal>
                    </div>
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
.mx-wi {
    max-width: 130px;
    min-width: 120px;
    overflow: hidden;
}
</style>
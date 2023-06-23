<script setup>
import FiltersTable from "@/components/shared/FiltersTable.vue";
import DataTable from "@/components/shared/DataTable.vue";
import {computed, onMounted, ref} from "vue";
import Transaction from "@/api/apis/Transaction";
import Status from "@/components/shared/Status.vue";

let inputs = ref([
    {type: 'text', label: 'transaction_hash', key: 'one'},
    {type: 'text', label: 'walletId', key: 'two'},
    {type: 'select', label: 'type', key: 'one'},
    {type: 'text', label: 'receiver_wallet', key: 'tree'},
    {type: 'text', label: 'sender_wallet', key: 'four'},
    {type: 'select', label: 'user', key: 'two'},
])

let headers = ref([
    {title: 'wallet_id', align: 'start', key: 'wallet_address_id'},
    {title: 'user', align: 'center', key: 'user'},
    {title: 'transaction_hash', align: 'center', key: 'transaction_id'},
    {title: 'sender_wallet_address', align: 'center', key: 'ownerAddress'},
    {title: 'receiver_wallet_address', align: 'center', key: 'toAddress'},
    {title: 'amount', align: 'end', key: 'amount'},
    {title: 'fee', align: 'end', key: 'fee'},
    {title: 'status', align: 'end', key: 'status'},
    {title: 'deposit_transaction', align: 'end', key: 'base_tx_id'},
    {title: 'network', align: 'end', key: 'network'},
    {title: 'created_time', align: 'end', key: 'created_at'},
])

let transactionData = ref()

let perPage = ref()
let total = ref()
let page = ref(1)
let status = ref()

let paginationLength = computed(() => {
    let length = Math.ceil(total.value / perPage.value)
    return length > 1 ? length : 0
})

function getDataFilters(filter) {
    Transaction.getTransaction(
        page.value, filter.text1, filter.text2, filter.select1,
        filter.text3, filter.text4, filter.select2
    ).then(
        (r) => {
            transactionData.value = r.data.data.transactions.data
            perPage.value = r.data.data.transactions.meta.per_page
            total.value = r.data.data.transactions.meta.total
            status.value = r.data.data.status
        }
    )
}

async function copyCode(value) {
    await navigator.clipboard.writeText(value);
}

function getData() {
    Transaction.getAdminTransaction().then(
        (r) => {
            transactionData.value = r.data.data.transactions.data
        }
    )
}

onMounted(() => {
    getData()
})
</script>
<template>
    <v-card-title>
        <div class="d-flex w-100 justify-space-between align-center pa-0 pa-lg-5">
            <div>
                    <span>
                        لیست تراکنش ها
                    </span>
            </div>
        </div>
    </v-card-title>
    <filters-table remove="remove"
                   search="search" @getDataFilters="getDataFilters"
                   @removeDataFilters="getData" :inputs="inputs"
    />
    <v-divider class="mb-5"></v-divider>
    <DataTable :headers="headers"
               :dataTable="transactionData"
               :page="page"
               :total="total"
               :perPage="perPage"
               local="transaction"
    >
        <template v-slot:body="{item}">
            <td class="text-center">
                <span @click="copyCode(item.wallet_id)" class="tooltip-width">
                     {{ item.wallet_id }}
                <v-tooltip
                        activator="parent"
                        location="top"
                >
                  {{ item.wallet_id }}
                </v-tooltip>
                </span>
            </td>
            <td class="text-center">{{item.user.name}}</td>
            <td class="text-center">{{ item.transaction_id }}</td>
            <td class="text-center">
                <span @click="copyCode(item.ownerAddress)" class="tooltip-width">
                      {{ item.ownerAddress }}
                <v-tooltip
                        activator="parent"
                        location="top"
                >
                   {{ item.ownerAddress }}
                </v-tooltip>
                </span>
            </td>
            <td class="text-center">
                <span @click="copyCode(item.toAddress)" class="tooltip-width">
                      {{ item.toAddress }}
                <v-tooltip
                        activator="parent"
                        location="top"
                >
               {{ item.toAddress }}
                </v-tooltip>
                </span>
            </td>
            <td class="text-center">{{ item.amount }}</td>
            <td class="text-center">{{ item.fee }}</td>
            <td class="text-center"> <status :value="item.status" :status="item.status"/></td>
            <td class="text-center">{{ item.deposit_transaction }}</td>
            <td class="text-center">{{ item.network }}</td>
            <td class="text-center">{{ item.created_at }}</td>
        </template>
    </DataTable>
    <v-col cols="12">
        <div class="d-flex justify-center align-center">
            <v-pagination active-color="primary" v-model="page" total-visible="3"
                          :length="paginationLength"></v-pagination>
        </div>
    </v-col>
</template>


<style scoped>

</style>

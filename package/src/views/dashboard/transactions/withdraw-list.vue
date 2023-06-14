<script setup>
import FiltersTable from "@/components/shared/FiltersTable.vue";
import DataTable from "@/components/shared/DataTable.vue";
import {ref} from "vue";
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
function getDataFilters() {

}

function getData() {

}
</script>
<template>
    <filters-table remove="remove"
                   item1=""  item2="" search="search" @getDataFilters="getDataFilters"
                   @removeDataFilters="getData" :inputs="inputs"
    />
    <v-divider class="mb-5"></v-divider>
    <DataTable :headers="headers"
               :dataTable="walletsData"
               :page="page"
               :total="total"
               :perPage="perPage"
               local="transaction"
    >
        <template v-slot:body="{item}">
            <td class="text-center">{{ item.id }}</td>
            <td class="text-center">{{ item.user_id }}</td>
            <td class="text-center">{{ item.address}}</td>
            <td class="text-center">{{ item.type}}</td>
            <td class="text-center">{{ item.created_at}}</td>
            <td class="text-center">
                <v-btn @click="router.push(`/gateways/newGateways/${item.id}`)" size="small" color="primary"
                       class="mx-1 mt-2 mt-lg-0">
                    تراکنش ها
                </v-btn>
            </td>
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
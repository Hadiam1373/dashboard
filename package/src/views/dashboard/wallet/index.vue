<script setup>

import FiltersTable from "@/components/shared/FiltersTable.vue";
import Status from "@/components/shared/Status.vue";
import DataTable from "@/components/shared/DataTable.vue";
import {computed, onMounted, ref, watch} from "vue";
import {useRouter} from "vue-router";
import Wallet from "@/api/apis/Wallet";

const router = useRouter()
let page = ref(1)
let user_id = ref()
let wallet_id = ref()
let address = ref()
let network = ref()
let walletsData = ref()
let perPage = ref()
let total = ref()
let networkList = ref([
    {title: 'TRON', value: 'TRON'},
    {title: 'BSC', value: 'BSC'}
])

let inputs = ref([
    {type: 'text', label: 'walletId', key: 'one'},
    {type: 'select', label: 'user', key: 'one'},
    {type: 'text', label: 'address', key: 'two'},
    {type: 'select', label: 'network', key: 'two'}
])

let headers = ref([
    {title: 'id', align: 'start', key: 'id'},
    {title: 'user', align: 'center', key: 'user'},
    {title: 'address', align: 'center', key: 'status'},
    {title: 'network', align: 'center', key: 'creation_date'},
    {title: 'date', align: 'center', key: 'action'},
    {title: 'action', align: 'end', key: 'action'},
])

let paginationLength = computed(() => {
    let length = Math.ceil(total.value / perPage.value)
    return length > 1 ? length : 0
})

function getData() {
    Wallet.getWalletList(page.value).then(
        (r) => {
            walletsData.value = r.data.data.wallets.data
            perPage.value = r.data.data.wallets.per_page
            total.value = r.data.data.wallets.total
        },
    )
}

async function copyCode(value) {
    await navigator.clipboard.writeText(value);
}

function getDataFilters(filter) {
    Wallet.getWalletList(page.value, filter.text1, filter.select1, filter.text2, filter.select2).then(
        (r) => {
            walletsData.value = r.data.data.wallets.data
            perPage.value = r.data.data.wallets.per_page
            total.value = r.data.data.wallets.total
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
                        لیست کیف پول ها
                    </span>
                </div>
            </div>
        </v-card-title>
        <filters-table remove="remove"
                       item1="" :item2="networkList" search="search" @getDataFilters="getDataFilters"
                       @removeDataFilters="getData" :inputs="inputs"
        />
        <v-divider class="mb-5"></v-divider>
        <DataTable :headers="headers"
                   :dataTable="walletsData"
                   :page="page"
                   :total="total"
                   :perPage="perPage"
                   local="wallet"
        >
            <template v-slot:body="{item}">
                <td class="text-center">{{ item.id }}</td>
                <td class="text-center">{{ item.user_id }}</td>
                <td class="text-center d-flex align-center justify-center">
                    <span @click="copyCode(item.address)" class="tooltip-width">
                      {{ item.address }}
                <v-tooltip
                        activator="parent"
                        location="top"
                >
                   {{ item.address }}
                </v-tooltip>
                </span>
                </td>
                <td class="text-center">{{ item.type }}</td>
                <td class="text-center">{{ item.created_at }}</td>
                <td class="text-center">
                    <v-btn @click="router.push(`/transactions/deposit-list`)" size="small" color="primary"
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
    </v-card>
</template>


<style scoped>

</style>
<script setup>
import FiltersTable from "@/components/shared/FiltersTable.vue";
import DataTable from "@/components/shared/DataTable.vue";
import {computed, onMounted, ref} from "vue";
import Transaction from "@/api/apis/Transaction";
import Status from "@/components/shared/Status.vue";
import QuestionModal from "@/components/shared/QuestionModal.vue";

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
    // {title: 'user', align: '', key: 'user'},
    {title: 'transaction_hash', align: 'center', key: 'transaction_id'},
    {title: 'sender_wallet_address', align: 'center', key: 'ownerAddress'},
    {title: 'receiver_wallet_address', align: 'center', key: 'toAddress'},
    {title: 'amount', align: 'center', key: 'amount'},
    {title: 'fee', align: 'center', key: 'fee'},
    {title: 'status', align: 'center', key: 'status'},
    {title: 'withdraw_status', align: 'center', key: 'withdraw_status'},
    {title: 'status_callback', align: 'center', key: 'status_callback'},
    {title: 'deposit_transaction', align: 'center', key: 'base_tx_id'},
    {title: 'network', align: 'center', key: 'network'},
    {title: 'created_time', align: 'center', key: 'created_at'},
    {title: 'action', align: 'end', key: 'action'},
])

let transactionData = ref()

let perPage = ref()
let total = ref()
let page = ref(1)
let status = ref()
let copyText = ref()
let dialog = ref(false)

let paginationLength = computed(() => {
    let length = Math.ceil(total.value / perPage.value)
    return length > 1 ? length : 0
})

async function copyCode(value) {
    await navigator.clipboard.writeText(value);
    copyText.value = "کپی شد!"
}

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

function getData() {
    Transaction.getTransaction().then(
        (r) => {
            transactionData.value = r.data.data.transactions.data
            perPage.value = r.data.data.transactions.meta.per_page
            total.value = r.data.data.transactions.meta.total
            status.value = r.data.data.status
        }
    )
}

function getExcel(){
    Transaction.getExcel().then(response => {
        const blob = new Blob([response.data], {type: 'application/pdf'})
        console.log(blob)
    })
}

function deleteItem(id) {
    Transaction.removeTransaction(id).then(
        () => {
            dialog.value = false
        }
    )
}

function manualCallback(id) {
    Transaction.manualCallback(id)
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
            <div>
                <v-btn
                    color="primary"
                    variant="flat"
                     @click="getExcel"
                    >
                 دانلود خروجی Excel
                </v-btn>

            </div>
        </div>
    </v-card-title>
    <filters-table remove="remove" :item1="status"
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
<!--            <td class="text-center">{{ item.user.name }}</td>-->
            <td class="text-center">
                <span @click="copyCode(item.transaction_id)" class="tooltip-width">
                      {{ item.transaction_id }}
                <v-tooltip
                        activator="parent"
                        location="top"
                >
                   {{ item.transaction_id }}
                </v-tooltip>
                </span>
            </td>
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
            <td class="text-center">
                <status :value="item.status" :status="item.status"/>
            </td>
            <td class="text-center">
                <status :value="item.withdraw_status" :status="item.withdraw_status"/>
            </td>
            <td class="text-center">
                <status :value="item.status_callback" :status="item.status_callback"/>
            </td>
            <td class="text-center">{{ item.base_tx_id }}</td>
            <td class="text-center">{{ item.network }}</td>
            <td class="text-center">{{ item.created_at }}</td>
            <td class="text-center d-none d-lg-flex gap-2 align-center d-sm-none">
                <v-btn
                        size="small" color="primary"
                        @click="manualCallback(item.transaction_id)"
                        class="mx-1 mt-2 mt-lg-0">
                    CallBack
                </v-btn>
                <question-modal :dialog="dialog"
                                title="آیا از غیر فعال کردن این تراکنش اطمینان دارید؟" ok="بله"
                                cancel="انصراف" @confirm="deleteFactor(item.id)" @reject="dialog = false">
                    <template v-slot:element="{props}">
                        <v-btn size="small" color="error" @click="dialog =! dialog"
                               class="mx-1 mt-2 mt-lg-0" prepend-icon="mdi-close">
                            حذف
                        </v-btn>
                    </template>
                </question-modal>
            </td>
            <td class="text-center d-lg-none">
                <div class="d-flex align-center w-100">
                    <v-icon tag="button" @click="manualCallback(item.transaction_id)" class="mx-1" color="primary">
                        mdi-receipt
                    </v-icon>
                    <question-modal class="mx-1" :dialog="dialog"
                                    title="آیا از غیر فعال کردن این تراکنش اطمینان دارید؟" ok="بله"
                                    cancel="انصراف" @confirm="deleteItem(item.id)" @reject="dialog = false">
                        <template v-slot:element="{props}">
                            <v-icon tag="button" class="mx-1" color="error" @click="dialog =! dialog">mdi-close</v-icon>
                        </template>
                    </question-modal>
                </div>
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

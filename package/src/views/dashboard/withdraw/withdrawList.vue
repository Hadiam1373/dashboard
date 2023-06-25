<script setup>

import FiltersTable from "@/components/shared/FiltersTable.vue";
import Status from "@/components/shared/Status.vue";
import DataTable from "@/components/shared/DataTable.vue";
import {computed, onMounted, ref, watch} from "vue";
import Profit from "@/api/apis/Profit";
import {useRouter} from "vue-router";
import WithdrawRequest from "@/api/apis/Withdraw";
import QuestionModal from "@/components/shared/QuestionModal.vue";

const router = useRouter()
let page = ref(1)
let status = ref()
let withdrawData = ref()
let perPage = ref()
let total = ref()
let dialog = ref(false)
let dialog2 = ref(false)

let inputs = ref([
    {type: 'text', label: 'walletId', key: 'one'},
    {type: 'select', label: 'type', key: 'two'},
    {type: 'select', label: 'email', key: 'one'}
])

let headers = ref([
    {title: 'id', align: 'start', key: 'id'},
    {title: 'user', align: 'center', key: 'user'},
    {title: 'wallet', align: 'center', key: 'wallet'},
    {title: 'transactionId', align: 'center', key: 'transactionId'},
    {title: 'withdrawAmount', align: 'center', key: 'withdrawAmount'},
    {title: 'sentAmount', align: 'center', key: 'sentAmount'},
    {title: 'status', align: 'center', key: 'status'},
    {title: 'created_at', align: 'center', key: 'created_at'},
    {title: 'action', align: 'end', key: 'action'},
])

let paginationLength = computed(() => {
    let length = Math.ceil(total.value / perPage.value)
    return length > 1 ? length : 0
})

function getDataFilters(filter) {
    WithdrawRequest.Withdraw(page.value, filter.text1, filter.select2, filter.select1).then(
        (r) => {
            withdrawData.value = r.data.data.withdraws.data
        },
    )
}

async function copyCode(value) {
    await navigator.clipboard.writeText(value);
}

function goToTronscan(id) {
    window.open(`https://tronscan.org/#/transaction/${id}`, '_blank')
}

function getData() {
    WithdrawRequest.Withdraw().then(
        (r) => {
            withdrawData.value = r.data.data.withdraws.data
            status.value = r.data.data.status
        }
    )
}

function confirmWithdraw(id) {
    WithdrawRequest.confirmWithdraw(id)
}

function rejectWithdraw(id) {
    WithdrawRequest.rejectWithdraw(id)
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
                       درخواست های برداشت
                    </span>
                </div>
            </div>
        </v-card-title>
        <filters-table remove="remove"
                       :item2="status" item-value2="title" item-title2="value" search="search"
                       @getDataFilters="getDataFilters"
                       @removeDataFilters="getData" :inputs="inputs"
        />
        <v-divider class="mb-5"></v-divider>
        <DataTable :headers="headers"
                   :dataTable="withdrawData"
                   :page="page"
                   :total="total"
                   :perPage="perPage"
                   local="withdraw"
        >
            <template v-slot:body="{item}">
                <td class="text-center">{{ item.id }}</td>
                <td class="text-center">
                    <a class="link cursor-pointer text-decoration-underline"
                       @click="router.push(`/users/users-list/edit-user-data/${ item.user.id}`)">
                        {{ item.user.name }}
                    </a>
                </td>
                <td class="text-center">
                    <span @click="copyCode(item.target_wallet)" class="tooltip-width">
                      {{ item.target_wallet }}
                <v-tooltip
                        activator="parent"
                        location="top"
                >
               {{ item.target_wallet }}
                </v-tooltip>
                </span>
                </td>
                <td class="text-center">
                    <span @click="copyCode(item.tx_id)" class="tooltip-width">
                     {{ item.tx_id }}
                <v-tooltip
                        activator="parent"
                        location="top"
                >
                {{ item.tx_id }}
                </v-tooltip>
                </span>
                </td>
                <td class="text-center">{{ item.withdraw_amount }}</td>
                <td class="text-center">{{ item.sent_amount }}</td>
                <td class="text-center">
                    <status :value="item.status_label" :status="item.status"/>
                </td>
                <td class="text-center">{{ item.created_at }}</td>
                <td class="text-center d-flex align-center">
                    <v-btn size="x-small" class="mx-1" color="info" @click="goToTronscan(item.tx_id)"
                           icon="mdi-eye-outline">
                    </v-btn>
                    <question-modal :dialog="dialog" ok="بله" cancel="خیر"
                                    text="ایا از عدم تایید درخواست اطمینان دارید؟"
                                    @confirm="rejectWithdraw(item.id)" @reject="dialog = false"
                    >
                        <template #element>
                            <v-btn class="mx-2" size="x-small" @click="dialog = true" color="error"
                                   icon="mdi-window-close"></v-btn>
                        </template>
                    </question-modal>
                    <question-modal :dialog="dialog2" ok="بله" cancel="خیر"
                                    text="ایا از  تایید درخواست اطمینان دارید؟"
                                    @confirm="confirmWithdraw(item.id)" @reject="dialog2 = false"
                    >
                        <template #element>
                            <v-btn size="x-small" class="mx-2" @click="dialog2 = true" color="success"
                                   icon="mdi-check" :disabled="item.status === 'accepted'">
                            </v-btn>
                        </template>
                    </question-modal>
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


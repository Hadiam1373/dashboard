<script setup>
import FiltersTable from "@/components/shared/FiltersTable.vue";
import DataTable from "@/components/shared/DataTable.vue";
import {computed, onMounted, ref, watch} from "vue";
import {useRouter} from "vue-router";
import LogManager from "@/api/apis/LogManager";
import {successMessage} from "@/api/fetch/showErrorMessage";


const router = useRouter()
let filterBy = ref()
let sortBy = ref()
let typeLog = ref('all')
let dataLogs = ref()

let page = ref(1)
let perPage = ref()
let total = ref()
let loading = ref(false)

let paginationLength = computed(() => {
    let length = Math.ceil(total.value / perPage.value)
    return length > 1 ? length : 0
})


let inputs = ref([
    {type: 'select', label: 'filterBy', key: 'one'},
    {type: 'select', label: 'sortBy', key: 'two'},
    {type: 'select', label: 'typeLog', key: 'tree'}
])

let headers = ref([
    {title: 'name', align: 'start', key: 'id'},
    {title: 'typeLog', align: 'center', key: 'user'},
    {title: 'description', align: 'end', key: 'status'},
    {title: 'show', align: 'end', key: 'creation_date'},
    {title: 'action', align: 'end', key: 'action'},
])

function toShowLog(id) {
    router.push(`/logManager/showLog/${id}`)
}

watch(page, (newX) => {
    getDataFilters(page.value, '', '', '')
})

function deleteLog(id) {
    LogManager.deleteLog(id).then(
        (r) => {
            if (r.data.status === 'success') {
                successMessage('لاگ مورد نظر با موفقیت حذف شد')
            }
        }
    )
}

function getDataFilters(filter) {
    LogManager.geAllLogs(page.value, filter.select1, filter.select2, filter.select3).then(
        (r) => {
            dataLogs.value = r.data.data.logs.data
            perPage.value = r.data.data.logs.meta.per_page
            total.value = r.data.data.logs.meta.total
            filterBy.value = r.data.data.all_type_seen
            sortBy.value = r.data.data.all_type_sort
            typeLog.value = r.data.data.all_type_blog
        }
    )
}

function getAllLogsData() {
    LogManager.geAllLogs().then(
        (r) => {
            dataLogs.value = r.data.data.logs.data
            perPage.value = r.data.data.logs.meta.per_page
            total.value = r.data.data.logs.meta.total
            filterBy.value = r.data.data.all_type_seen
            sortBy.value = r.data.data.all_type_sort
            typeLog.value = r.data.data.all_type_blog
        }
    )
}

onMounted(() => {
    getAllLogsData()
})
</script>

<template>
    <v-card>
        <v-card-title>
            <div class="d-flex w-100 justify-space-between align-center pa-0 pa-lg-5">
                <div>
                    <span>
                        لیست لاگ ها
                    </span>
                </div>
            </div>
        </v-card-title>
        <filters-table remove="remove"
                       :item1="filterBy" :item2="sortBy" :item3="typeLog" search="search"
                       @getDataFilters="getDataFilters"
                       @removeDataFilters="getAllLogsData" :inputs="inputs"
        />
        <v-divider class="mb-5"></v-divider>
        <DataTable :headers="headers"
                   :dataTable="dataLogs"
                   :page="page"
                   :total="total"
                   :perPage="perPage"
                   local="logManager"
        >
            <template v-slot:body="{item}">
                <td class="text-center">{{ item.id }}</td>
                <td class="text-center">{{ item.type }}</td>
                <td class="text-center">{{ item.description }}</td>
                <td class="text-center">
                    <v-chip v-if="item.seen === 0" label color="#FF3838">خیر</v-chip>
                    <v-chip v-if="item.seen === 1" label color="#56F000">بله</v-chip>
                </td>

                <td class="text-center">
                    <v-menu offset-y>
                        <template v-slot:activator="{ props }">
                            <v-btn
                                    color="primary"
                                    v-bind="props"
                                    append-icon="mdi-menu-down"
                            >
                                فعالیت
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item @click="toShowLog(item.id)">
                                <v-list-item-title>مشاهده</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="deleteLog(item.id)">
                                <v-list-item-title>حذف</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
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

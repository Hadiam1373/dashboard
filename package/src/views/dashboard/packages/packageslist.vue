<script setup>
import FiltersTable from "@/components/shared/FiltersTable.vue";
import DataTable from "@/components/shared/DataTable.vue";
import {computed, onMounted, ref, watch} from "vue";
import {useRouter} from "vue-router";
import QuestionModal from "@/components/shared/QuestionModal.vue";
import Package from "@/api/apis/Packages"
import Status from "@/components/shared/Status.vue";
import {successMessage} from "@/api/fetch/showErrorMessage";


const router = useRouter()
let page = ref(1)
let status = ref()
let packageList = ref()
let perPage = ref()
let total = ref()
let messages = ref()
let loading = ref(false)
let dialog = ref(false)
let type = ref()

let paginationLength = computed(() => {
    let length = Math.ceil(total.value / perPage.value)
    return length > 1 ? length : 0
})

let inputs = ref([
    {type: 'text', label: 'package_name', key: 'one'},
    {type: 'select', label: 'status', key: 'one'},
    {type: 'select', label: 'type', key: 'two'},
])

let headers = ref([
    {title: 'id', align: 'start', key: 'id'},
    {title: 'package_name', align: 'center', key: 'package_name'},
    {title: 'type', align: 'center', key: 'type'},
    {title: 'status', align: 'center', key: 'status'},
    {title: 'date', align: 'center', key: 'date'},
    {title: 'action', align: 'end', key: 'action'},
])


function getDataFilters(filter) {
    Package.getAllPackages(page.value, filter.text1, filter.select1, filter.select2).then(
        (r) => {
            packageList.value = r.data.data.packages.data
            type.value = r.data.data.type
            status.value = r.data.data.status
        }
    )
}

function deletePackage(id) {
    Package.deletePackage(id).then(
        (r) => {
            if (r.data.status === 'success') {
                dialog.value = false
                successMessage(r.data.message)
                getData()
            }
        }
    )
}


function getData() {
    Package.getAllPackages(page.value).then(
        (r) => {
            packageList.value = r.data.data.packages.data
            type.value = r.data.data.type
            status.value = r.data.data.status
            perPage.value = r.data.data.packages.meta.per_page
            total.value = r.data.data.packages.meta.total
        }
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
                        لیست پکیج ها
                    </span>
                </div>
                <div>
                    <v-btn color="primary" class="d-none d-lg-block d-sm-none"
                           @click="router.push('/packages/CreatePackage')">
                        ایجاد پکیج
                    </v-btn>
                    <v-icon class="d-lg-none" @click="router.push('/packages/CreatePackage')" color="primary">
                        mdi-plus
                    </v-icon>
                </div>
            </div>
        </v-card-title>
        <filters-table remove="remove"
                       :item1="type" :item2="status" search="search" @getDataFilters="getDataFilters"
                       @removeDataFilters="getData" :inputs="inputs"
        />
        <v-divider class="mb-5"></v-divider>
        <DataTable :headers="headers"
                   :page="page"
                   :dataTable="packageList"
                   :total="total"
                   :perPage="perPage"
                   local="packages"
        >
            <template v-slot:body="{item}">
                <td class="text-center">{{ item.id }}</td>
                <td class="text-center">{{ item.name }}</td>
                <td class="text-center">
                    <status :value="item.status_label" :status="item.status"/>
                </td>
                <td class="text-center">{{ item.status_label }}</td>
                <td class="text-center">{{ item.created_at }}</td>
                <td class="text-center">
                    <div class="d-flex align-center justify-center gap-2">
                    <v-btn color="info" @click="router.push(`/packages/CreatePackage/${item.id}`)" variant="flat" class="d-none d-lg-block">
                        ویرایش
                    </v-btn>
                    <v-btn icon="mdi-pen" size="x-small" @click="router.push(`/packages/CreatePackage/${item.id}`)" class="d-lg-none mx-4" color="info"></v-btn>
                    <question-modal :dialog="dialog" ok="بله" cancel="خیر"
                                    text="ایا از حذف پیام اطمینان دارید؟"
                                    @confirm="deletePackage(item.id)" @reject="dialog = false"
                    >
                        <template #element>
                            <v-btn size="x-small" @click="dialog = true" color="error"
                                   icon="mdi-window-close"></v-btn>
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
    </v-card>
</template>


<style scoped>

</style>

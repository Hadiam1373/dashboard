<script setup>
import FiltersTable from "@/components/shared/FiltersTable.vue";
import Status from "@/components/shared/Status.vue";
import DataTable from "@/components/shared/DataTable.vue";
import {computed, onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import QuestionModal from "@/components/shared/QuestionModal.vue";
import Department from "@/api/apis/Departments";
import {successMessage} from "@/api/fetch/showErrorMessage";


const router = useRouter()
let page = ref(1)
let status = ref()
let perPage = ref()
let total = ref()
let departmentList = ref()
let loading = ref(false)
let dialog = ref(false)


let paginationLength = computed(() => {
    let length = Math.ceil(total.value / perPage.value)
    return length > 1 ? length : 0
})

let inputs = ref([
    {type: 'text', label: 'name', key: 'one'},
    {type: 'select', label: 'type', key: 'one'}
])

let headers = ref([
    {title: 'id', align: 'start', key: 'id'},
    {title: 'department', align: 'center', key: 'department'},
    {title: 'status', align: 'center', key: 'status'},
    {title: 'action', align: 'end', key: 'action'},
])


function getDataFilters(filter) {
    Department.getDepartments(page.value, filter.text1, filter.select1).then(
        (r) => {
            departmentList.value = r.data.data.departments.data
            status.value = r.data.data.status
        }
    )
}

function deleteDPT(id) {
    Department.deleteDPT(id).then(
        (r) => {
            dialog.value = false
            successMessage('واحد پشتیبانی مورد نظر حذف شد')
            getData()
        }
    )
}


function getData() {
    Department.getDepartments().then(
        (r) => {
            departmentList.value = r.data.data.departments.data
            status.value = r.data.data.status
        }
    )
}

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
                       لیست واحد های پشتیبانی
                    </span>
                </div>
                <div>
                    <v-btn variant="flat" color="primary" @click="router.push('/department/edite-department')">ایجاد
                        واحد
                    </v-btn>
                </div>
            </div>
        </v-card-title>
        <filters-table remove="remove"
                       :item1="status" search="search" @getDataFilters="getDataFilters"
                       @removeDataFilters="getData" :inputs="inputs"
        />
        <v-divider class="mb-5"></v-divider>
        <DataTable :headers="headers"
                   :dataTable="departmentList"
                   :page="page"
                   :total="total"
                   :perPage="perPage"
                   local="department"
        >
            <template v-slot:body="{item}">
                <td class="text-center">{{ item.id }}</td>
                <td class="text-center">{{ item.name }}</td>
                <td class="text-center">{{ item.status }}</td>
                <td class="text-end d-flex align-center justify-center gap-2">
                    <v-btn color="info" variant="flat" @click="router.push(`/department/edite-department/${item.id}`)">
                        ویرایش
                    </v-btn>


                    <v-dialog
                            v-model="dialog"
                            persistent
                            width="auto"
                    >
                        <template v-slot:activator="{ props }">
                            <v-btn @click="dialog = true" variant="flat" color="error">حذف</v-btn>
                        </template>
                        <v-card>
                            <v-card-text>
                                آیا مایل به حذف این واحد هستید؟
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                        color="error"
                                        variant="outlined"
                                        @click="deleteDPT(item.id)"
                                >
                                    بله
                                </v-btn>
                                <v-btn
                                        color="success"
                                        variant="outlined"
                                        @click="dialog = false"
                                >
                                    خیر
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
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

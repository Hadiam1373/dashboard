<script setup>
import FiltersTable from "@/components/shared/FiltersTable.vue";
import DataTable from "@/components/shared/DataTable.vue";
import {computed, onMounted, ref} from "vue";
import Users from "@/api/apis/users";
import {useRoute, useRouter} from "vue-router";
import QuestionModal from "@/components/shared/QuestionModal.vue";

const router = useRouter()
const route = useRoute()

let inputs = ref([
    {type: 'text', label: 'name', key: 'two'},
    {type: 'text', label: 'label', key: 'one'},
])

let headers = ref([
    {title: 'id', align: 'start', key: 'id'},
    {title: 'label', align: 'center', key: 'label'},
    {title: 'name', align: 'center', key: 'name'},
    {title: 'roles', align: 'center', key: 'roles'},
    {title: 'rolesCount', align: 'center', key: 'rolesCount'},
    {title: 'action', align: 'enter', key: 'action'},
])

let usersData = ref()
let dialog = ref(false)
let perPage = ref()
let total = ref()
let page = ref(1)

let paginationLength = computed(() => {
    let length = Math.ceil(total.value / perPage.value)
    return length > 1 ? length : 0
})

function getDataFilters(filter) {
    Users.getRoles(page.value, filter.text1, filter.text2).then(
        (r) => {
            usersData.value = r.data.data.roles
        }
    )
}

function deleteItem(id) {
    Users.removeRoles(id).then(
        () => {
            dialog.value = false
            getData()
        }
    )
}

function getData() {
    Users.getRoles().then(
        (r) => {
            usersData.value = r.data.data.roles
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
                       لیست نقش ها
                    </span>
                </div>
                <div>
                    <v-btn color="primary" variant="flat" @click="router.push(`/users/user-roles/edit-roles`)">ایجاد نقش</v-btn>
                </div>
            </div>
            <filters-table remove="remove"
                           search="search" @getDataFilters="getDataFilters"
                           @removeDataFilters="getData" :inputs="inputs"
            />
        </v-card-title>

        <v-divider class="mb-5"></v-divider>
        <DataTable :headers="headers"
                   :dataTable="usersData"
                   :page="page"
                   :total="total"
                   :perPage="perPage"
                   local="roles"
        >
            <template v-slot:body="{item}">
                <td class="text-center">{{ item.id }}</td>
                <td class="text-center">{{ item.name }}</td>
                <td class="text-center">{{ item.display_name }}</td>
                <td class="text-center">{{ item.description }}</td>
                <td class="text-center">{{ item.permissions_count }}</td>
                <td class="text-center d-none d-lg-flex  align-center d-sm-none">
                    <v-btn size="small" @click="router.push(`edit-roles/${item.id}`)"
                           class="mx-1 mt-2 mt-lg-0" color="info" prepend-icon="mdi-pen">
                        {{ $vuetify.locale.t(`$vuetify.dashboard.invoice.setting`) }}
                    </v-btn>
                    <question-modal :dialog="dialog"
                                    title="آیا از غیر فعال کردن این نقش اطمینان دارید؟" ok="بله"
                                    cancel="انصراف" @confirm="deleteItem(item.id)" @reject="dialog = false">
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
                        <v-icon class="mx-1" color="info" @click="router.push(`edit-roles/${item.id}`)">mdi-pen</v-icon>
                        <question-modal class="mx-1" :dialog="dialog"
                                        title="آیا از غیر فعال کردن این نقش اطمینان دارید؟" ok="بله"
                                        cancel="انصراف" @confirm="deleteItem(item.id)" @reject="dialog = false">
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
                <v-pagination active-color="primary" v-model="page" total-visible="3"
                              :length="paginationLength"></v-pagination>
            </div>
        </v-col>
    </v-card>
</template>


<style scoped>

</style>

<script setup>
import FiltersTable from "@/components/shared/FiltersTable.vue";
import DataTable from "@/components/shared/DataTable.vue";
import {computed, onMounted, ref} from "vue";
import Users from "@/api/apis/users";
import {useRouter} from "vue-router";

const router = useRouter()

let actions = ref([
    {title: 'ویرایش اطلاعات', to: `edit-user-data`},
    {title: 'ویرایش رمز عبور', to: 'edit-password'},
    {title: 'ویرایش دسترسی', to: 'edit-role'}
])

let inputs = ref([
    {type: 'text', label: 'user', key: 'one'},
    {type: 'text', label: 'userEmail', key: 'two'},
])

let headers = ref([
    {title: 'id', align: 'start', key: 'id'},
    {title: 'name', align: 'center', key: 'name'},
    {title: 'email', align: 'center', key: 'email'},
    {title: 'amount', align: 'center', key: 'amount'},
    {title: 'roles', align: 'center', key: 'roles'},
    {title: 'created_at', align: 'end', key: 'created_at'},
    {title: 'action', align: 'end', key: 'action'},
])

let usersData = ref()

let perPage = ref()
let total = ref()
let page = ref(1)

let paginationLength = computed(() => {
    let length = Math.ceil(total.value / perPage.value)
    return length > 1 ? length : 0
})

function performAction(path , id) {
  router.push(`/users/users-list/${path.to}/${id}`)
}

function getDataFilters(filter) {
    Users.getUsersData(page.value, filter.text1, filter.text2).then(
        (r) => {
            usersData.value = r.data.data.users
        }
    )
}

function getData() {
    Users.getUsersData().then(
        (r) => {
            usersData.value = r.data.data.users
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
                        نمایش کاربران
                    </span>
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
                   local="user"
        >
            <template v-slot:body="{item}">
                <td class="text-center">{{ item.id }}</td>
                <td class="text-center">{{ item.name }}</td>
                <td class="text-center">{{ item.email }}</td>
                <td class="text-center" v-if="item.purse">{{ item.purse.amount }}</td>
                <td class="text-center" v-else>{{ item.purse }}</td>
                <td class="text-center">{{ item.roles }}</td>
                <td class="text-center">{{ item.created_at }}</td>
            </template>
            <template v-slot:actions="{ item }">
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
                            <v-list-item
                                    v-for="(actionItem, index) in actions"
                                    :key="index"
                                    @click="performAction(actionItem ,item.id)"
                            >
                                <v-list-item-title>{{ actionItem.title }}</v-list-item-title>
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

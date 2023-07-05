<script setup>
import Gateways from "@/api/apis/Gateways";
import {watch, onMounted, ref, computed} from "vue";
import DataTable from "@/components/shared/DataTable.vue";
import FiltersTable from "@/components/shared/FiltersTable.vue";
import Status from "@/components/shared/Status.vue";
import {useRouter} from "vue-router";
import Versions from "@/api/apis/Versions";

const router = useRouter()
let versions = ref()
let perPage = ref()
let total = ref()
let page = ref(1)


let paginationLength = computed(() => {
    let length = Math.ceil(total.value / perPage.value)
    return length > 1 ? length : 0
})

let headers = ref([
    {title: 'id', align: 'start', key: 'id'},
    {title: 'version', align: 'center', key: 'name'},
    {title: 'created_at', align: 'end', key: 'created_at'},
    {title: 'action', align: 'end', key: 'action'},
])



function getData() {
  Versions.getVersions().then(
      (r)=>{
          versions.value = r.data.data.versions.data
          perPage.value = r.data.data.versions.meta.per_page
          total.value = r.data.data.versions.meta.total
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
                        نسخه ها
                    </span>
                </div>
                <div>
                    <v-btn color="primary" class="d-none d-lg-block d-sm-none"
                           @click="router.push('/gateways/newGateways')">
                        ایجاد نسخه
                    </v-btn>
                    <v-icon class="d-lg-none" @click="router.push('/gateways/newGateways')" color="primary">mdi-plus
                    </v-icon>
                </div>
            </div>
        </v-card-title>
        <v-divider class="mb-5"></v-divider>
        <DataTable :headers="headers"
                   :dataTable="versions"
                   :page="page"
                   :total="total"
                   :perPage="perPage"
                   local="changeHistory"
        >
            <template v-slot:body="{item}">
                <td class="text-center">{{ item.id }}</td>
                <td class="text-center">{{ item.name }}</td>
                <td class="text-center">{{ item.created_at }}</td>
                <td class="text-center d-none d-lg-table-cell d-sm-none">
                    <v-btn size="small" color="secondary" @click="router.push(`/`)" class="mx-1 mt-2 mt-lg-0" prepend-icon="mdi-eye-outline">
                        جزئیات نسخه
                    </v-btn>
                    <v-btn @click="router.push(`/changeHistory/Create-changeHistory/${item.id}`)" size="small" color="primary"
                           class="mx-1 mt-2 mt-lg-0" prepend-icon="mdi-square-edit-outline">
                        ویرایش نسخه
                    </v-btn>
                </td>
                <td class="text-center d-lg-none">
                    <v-icon class="mx-1" @click="router.push(`/`)" color="primary">mdi-receipt</v-icon>
                    <v-icon class="mx-1" @click="router.push(`/changeHistory/Create-changeHistory/${item.id}`)" color="secondary">
                        mdi-square-edit-outline
                    </v-icon>
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
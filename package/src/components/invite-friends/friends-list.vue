<script setup>
import {computed, onMounted, ref} from "vue";
import DataTable from "@/components/shared/DataTable.vue";
import Status from "@/components/shared/Status.vue";

const props = defineProps(['friends'])
let paginationLength = computed(() => {
    let length = Math.ceil(total.value / perPage.value)
    return length > 1 ? length : 0
})

let page = ref(1)
let perPage = ref()
let total = ref()
let headers = ref([
    {title: 'id', align: 'start', key: 'id'},
    {title: 'name', align: 'center', key: 'name'},
    {title: 'status_label', align: 'center', key: 'status_label'},
    {title: 'created_at', align: 'end', key: 'created_at'},
])


</script>

<template>
    <DataTable :headers="headers"
               :dataTable="props.friends"
               :page="page"
               :total="total"
               :perPage="perPage"
               local="inviteFriend"
    >
        <template v-slot:body="{item}">
            <td class="text-center">{{ item.id }}</td>
            <td class="text-center">{{ item.name }}</td>
            <td class="text-center">
                <status :value="item.status_label" :status="item.status"/>
            </td>
            <td class="text-center">{{ item.created_at }}</td>
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
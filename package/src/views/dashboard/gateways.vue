<script setup>
import Gateways from "@/api/apis/Gateways";
import {onMounted, ref} from "vue";
import DataTable from "@/components/shared/DataTable.vue";

let gateWaysData = ref()

let headers = ref([
    {title: 'id', align: 'start', key: 'id'},
    {title: 'name', align: 'center', key: 'name'},
    {title: 'status', align: 'center', key: 'status'},
    {title: 'status_label', align: 'center', key: 'status_label'},
    {title: 'created_at', align: 'end', key: 'created_at'},
])

function getData() {
    Gateways.getGateways().then(
        (r) => {
            gateWaysData.value = r.data.data.gateways.data
        },
        (error) => {
            console.log(error)
        }
    )
}

onMounted(() => {
    getData()
})
</script>

<template>
    <data-table :headers="headers" :items="gateWaysData" local="gateWays" itemsPerPage="5"/>
</template>
<style scoped>

</style>

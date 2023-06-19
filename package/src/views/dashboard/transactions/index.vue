<script setup>
import {ref} from "vue";


</script>
<template>
    <v-card>
        <router-view/>
    </v-card>
</template>

<script>
import FiltersTable from "@/components/shared/FiltersTable.vue";
import DataTable from "@/components/shared/DataTable.vue";

export default {
    name: "index",
    components: {DataTable, FiltersTable}
}
</script>

<style scoped>

</style>
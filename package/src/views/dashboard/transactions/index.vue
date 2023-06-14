<script setup>
import {ref} from "vue";


</script>
<template>
    <v-card>
        <v-card-title>
            <div class="d-flex w-100 justify-space-between align-center pa-0 pa-lg-5">
                <div>
                    <span>
                        لیست تراکنش ها
                    </span>
                </div>
            </div>
        </v-card-title>
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
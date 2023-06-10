<script setup>
const props = defineProps(['headers', 'dataTable', 'page', 'total', 'perPage' , 'local'])
</script>

<template>
        <v-table  class="mt-5" height="400px" fixed-header>
            <thead>
            <tr>
                <th class="text-center"
                    v-for="(item , index) in headers"
                    :key="index">
                    {{ $vuetify.locale.t(`$vuetify.dashboard.${props.local}.${item.title}`) }}
                </th>
            </tr>
            </thead>
            <tbody v-if="dataTable">
            <tr
                    v-for="(item , index) in dataTable"
                    :key="index"
            >
                <slot name="body" :item="item"></slot>
            </tr>
            </tbody>
        </v-table>
        <div v-if="!dataTable || !dataTable[0]" class="d-flex noData align-center justify-center w-100 h-100">
            {{ $vuetify.locale.t(`$vuetify.noDataText`) }}
        </div>

</template>

<style scoped>
.noData {
    position: fixed;
    top: 20%;
    left: -8%;
}
</style>

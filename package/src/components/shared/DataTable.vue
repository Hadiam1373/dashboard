<script setup>
const props = defineProps(['headers', 'items', 'itemsPerPage', 'local'])
</script>

<template>

    <v-data-table v-model:items-per-page="itemsPerPage" :headers="headers" :items="items" item-value="name"
        class="elevation-1">
        <template v-slot:header="{ header }">
            <span>{{ $vuetify.locale.t(`$vuetify.dashboard.${local}.${header}`) }}</span>
        </template>
    </v-data-table>
</template>

<style scoped></style>

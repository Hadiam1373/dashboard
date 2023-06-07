<script setup>
import {ref} from "vue";

const props = defineProps(['label1', 'label2', 'search', 'remove', 'status'])
let filters = ref({
    label1: '',
    label2: '',
})

const emit = defineEmits(['removeDataFilters' , 'getDataFilters'])

function removeFilters() {
    filters.value.label1 = ''
    filters.value.label2 = ''
    emit('removeDataFilters')
}

</script>
<template>
    <div class="d-flex w-100 mb-5 pa-lg-5 pa-2">
        <v-expansion-panels color="primary">
            <v-expansion-panel
                    bg-color="purple"
                    :title="$vuetify.locale.t(`$vuetify.filter`)"
            >
                <v-expansion-panel-text class="pt-5">
                    <v-row align="center">
                        <v-col cols="12" lg="4" sm="6">
                            <v-text-field variant="outlined" color="primary" hide-details v-model="filters.label1"
                                          :label="$vuetify.locale.t(`$vuetify.filters.${props.label1}`)">

                            </v-text-field>

                        </v-col>
                        <v-col cols="12" lg="4" sm="6">
                            <v-select variant="outlined" :items="status" color="primary" hide-details
                                      v-model="filters.label2"
                                      :label="$vuetify.locale.t(`$vuetify.filters.${props.label2}`)">

                            </v-select>
                        </v-col>
                        <v-col cols="12" lg="4" sm="12" class="text-end">
                            <v-btn @click="$emit('getDataFilters' , filters)" class="mx-2" color="primary"
                                   variant="outlined" size="large" prepend-icon="mdi-magnify">
                                {{ $vuetify.locale.t(`$vuetify.filters.${props.search}`) }}
                            </v-btn>
                            <v-btn @click="removeFilters" class="mx-2" color="error" variant="outlined" size="large"
                                   prepend-icon="mdi-close-circle-outline">
                                {{ $vuetify.locale.t(`$vuetify.filters.${props.remove}`) }}
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</template>

<style scoped>

</style>
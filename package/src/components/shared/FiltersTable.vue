<script setup>
import {computed, ref} from "vue";

const props = defineProps(['search', 'remove', 'status', 'inputs' , 'item1' ,'item2' ,'item3' ,'item4'])
let filters = ref({
    text1: '',
    text2: '',
    text3: '',
    text4: '',
    select1: '',
    select2: '',
    select3: '',
    select4: ''
})

const emit = defineEmits(['removeDataFilters', 'getDataFilters'])

function removeFilters() {
    filters.value.text1 = ''
    filters.value.text2 = ''
    filters.value.text3 = ''
    filters.value.text4 = ''
    filters.value.select1 = ''
    filters.value.select2 = ''
    filters.value.select3 = ''
    filters.value.select4 = ''
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
                        <v-col v-for="(item , index) in props.inputs" cols="12" lg="4" sm="6">
                            <v-text-field v-if="item.type === 'text' && item.key === 'one'" :key="index"
                                          variant="outlined" color="primary" hide-details v-model="filters.text1"
                                          :label="$vuetify.locale.t(`$vuetify.filters.${item.label}`)">
                            </v-text-field>
                            <v-text-field v-if="item.type === 'text' && item.key === 'two'" :key="index"
                                          variant="outlined" color="primary" hide-details v-model="filters.text2"
                                          :label="$vuetify.locale.t(`$vuetify.filters.${item.label}`)">
                            </v-text-field>
                            <v-text-field v-if="item.type === 'text' && item.key === 'tree'" :key="index"
                                          variant="outlined" color="primary" hide-details v-model="filters.text3"
                                          :label="$vuetify.locale.t(`$vuetify.filters.${item.label}`)">
                            </v-text-field>
                            <v-text-field v-if="item.type === 'text' && item.key === 'four'" :key="index"
                                          variant="outlined" color="primary" hide-details v-model="filters.text4"
                                          :label="$vuetify.locale.t(`$vuetify.filters.${item.label}`)">
                            </v-text-field>
                            <!--                            select section -->
                            <v-select v-if="item.type === 'select' && item.key === 'one'" :key="index"
                                      variant="outlined" :items="props.item1" color="primary" hide-details
                                      v-model="filters.select1"
                                      :label="$vuetify.locale.t(`$vuetify.filters.${item.label}`)">
                            </v-select>
                            <v-select v-if="item.type === 'select' && item.key === 'two'" :key="index"
                                      variant="outlined" :items="props.item2" color="primary" hide-details
                                      v-model="filters.select2"
                                      :label="$vuetify.locale.t(`$vuetify.filters.${item.label}`)">
                            </v-select>
                            <v-select v-if="item.type === 'select' && item.key === 'tree'" :key="index"
                                      variant="outlined" :items="props.item3" color="primary" hide-details
                                      v-model="filters.select3"
                                      :label="$vuetify.locale.t(`$vuetify.filters.${item.label}`)">
                            </v-select>
                            <v-select v-if="item.type === 'select' && item.key === 'four'" :key="index"
                                      variant="outlined" :items="props.item4" color="primary" hide-details
                                      v-model="filters.select4"
                                      :label="$vuetify.locale.t(`$vuetify.filters.${item.label}`)">
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
<script setup>
import {computed, ref} from "vue";

const props = defineProps(['search', 'remove', 'status', 'inputs', 'item1', 'item2', 'item3', 'item4', 'itemTitle1', 'itemValue1', 'itemTitle2', 'itemValue2', 'itemTitle3', 'itemValue3', 'itemTitle4', 'itemValue4'])
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
                                      variant="outlined" color="primary" hide-details
                                      :items="props.item1"
                                      :item-title="props.itemTitle1"
                                      :item-value="props.itemValue1"
                                      v-model="filters.select1"
                                      :label="$vuetify.locale.t(`$vuetify.filters.${item.label}`)">
                            </v-select>
                            <v-select v-if="item.type === 'select' && item.key === 'two'" :key="index"
                                      variant="outlined" color="primary" hide-details
                                      v-model="filters.select2"
                                      :items="props.item2"
                                      :item-title="props.itemTitle2"
                                      :item-value="props.itemValue2"
                                      :label="$vuetify.locale.t(`$vuetify.filters.${item.label}`)">
                            </v-select>
                            <v-select v-if="item.type === 'select' && item.key === 'tree'" :key="index"
                                      variant="outlined" color="primary" hide-details
                                      v-model="filters.select3"
                                      :items="props.item3"
                                      :item-title="props.itemTitle3"
                                      :item-value="props.itemValue3"
                                      :label="$vuetify.locale.t(`$vuetify.filters.${item.label}`)">
                            </v-select>
                            <v-select v-if="item.type === 'select' && item.key === 'four'" :key="index"
                                      variant="outlined" color="primary" hide-details
                                      v-model="filters.select4"
                                      :items="props.item4"
                                      :item-title="props.itemTitle4"
                                      :item-value="props.itemValue4"
                                      :label="$vuetify.locale.t(`$vuetify.filters.${item.label}`)">
                            </v-select>
                        </v-col>
                        <v-col cols="12" lg="4" md="12" sm="12" class="text-end d-none d-lg-block d-sm-block">
                            <v-btn @click="$emit('getDataFilters' , filters)" class="mx-2" color="primary"
                                   variant="outlined" size="large" prepend-icon="mdi-magnify">
                                {{ $vuetify.locale.t(`$vuetify.filters.${props.search}`) }}
                            </v-btn>
                            <v-btn @click="removeFilters" class="mx-2" color="error" variant="outlined" size="large"
                                   prepend-icon="mdi-close-circle-outline">
                                {{ $vuetify.locale.t(`$vuetify.filters.${props.remove}`) }}
                            </v-btn>
                        </v-col>
                        <v-col cols="12" lg="4" md="12" sm="12" class="text-end d-lg-none d-sm-none">
                            <v-btn @click="$emit('getDataFilters' , filters)" class="mb-2" color="primary"
                                   variant="outlined" block prepend-icon="mdi-magnify">
                                {{ $vuetify.locale.t(`$vuetify.filters.${props.search}`) }}
                            </v-btn>
                            <v-btn @click="removeFilters" class="mt-2" color="error" variant="outlined" block
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
<script setup>

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
                            <v-text-field variant="outlined" color="primary" hide-details
                                          :label="$vuetify.locale.t(`$vuetify.dashboard.gateWays.gatName`)">

                            </v-text-field>
                        </v-col>
                        <v-col cols="12" lg="4" sm="6">
                            <v-select variant="outlined" color="primary" hide-details
                                      :label="$vuetify.locale.t(`$vuetify.dashboard.gateWays.type`)">

                            </v-select>
                        </v-col>
                        <v-col cols="12" lg="4" sm="12" class="text-end">
                            <v-btn color="primary" variant="outlined" size="large" block :prepend-icon="mdi-magnify">
                                جستجو
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
<script setup>
import {useRoute, useRouter} from "vue-router";

const route = useRoute()
const router = useRouter()
</script>

<template>
    <form>
        <v-card class="pa-5" min-height="300">
            <v-card-title>
                <div class="d-flex justify-space-between align-center">
                    <div>
<!--                        <template v-if="route.params.id"> {{ 'تنظیمات درگاه ' + name.value.value }}</template>-->
                        <template>
                            {{ $vuetify.locale.t(`$vuetify.dashboard.gateWays.gatewaySetting`) }}
                        </template>
                    </div>
                    <div>
                        <v-icon color="primary" @click="router.push('/gateways/gatewaysList')"
                                class="cursor-pointer"
                                size="large">mdi-keyboard-backspace
                        </v-icon>
                    </div>
                </div>
            </v-card-title>
            <v-divider class="mt-5 mb-5"></v-divider>
<!--            <v-row class="mt-5">-->
<!--                <v-col cols="12">-->
<!--                    <v-row align="center">-->
<!--                        <v-col cols="12" lg="4" sm="6">-->
<!--                            <v-text-field variant="outlined" color="primary" v-model="name.value.value"-->
<!--                                          label="نام درگاه"-->
<!--                                          :error-messages="name.errorMessage.value"></v-text-field>-->
<!--                        </v-col>-->
<!--                        <v-col cols="12" lg="4" sm="6">-->
<!--                            <v-text-field variant="outlined" color="primary" v-model="url.value.value"-->
<!--                                          label="آدرس درگاه"-->
<!--                                          :error-messages="url.errorMessage.value"></v-text-field>-->
<!--                        </v-col>-->
<!--                        <v-col cols="12" lg="4" sm="12">-->
<!--                            <v-text-field v-model="color.value.value" :error-messages="color.errorMessage.value"-->
<!--                                          color="primary" label="رنگ" variant="outlined"-->
<!--                                          solo>-->
<!--                                <template v-slot:append-inner>-->
<!--                                    <v-menu v-model="menu" top :close-on-content-click="false">-->
<!--                                        <template v-slot:activator="{ props }">-->
<!--                                            <div :style="swatchStyle" v-bind="props"/>-->
<!--                                        </template>-->
<!--                                        <v-card>-->
<!--                                            <v-card-text class="pa-0">-->
<!--                                                <v-color-picker v-model="color.value.value"-->
<!--                                                                flat></v-color-picker>-->
<!--                                            </v-card-text>-->
<!--                                        </v-card>-->
<!--                                    </v-menu>-->
<!--                                </template>-->
<!--                            </v-text-field>-->
<!--                        </v-col>-->
<!--                    </v-row>-->
<!--                </v-col>-->
<!--                <v-col>-->
<!--                    <v-row>-->
<!--                        <v-col cols="12" lg="4" sm="6">-->
<!--                            <div class="d-flex align-center">-->
<!--                                <v-avatar v-if="route.params.id && logo.value.value" :image="logo.value.value" size="46"></v-avatar>-->
<!--                                <v-file-input accept="image/*" prepend-icon=""-->
<!--                                              :error-messages="logo.errorMessage.value"-->
<!--                                              append-inner-icon="mdi-file-image-plus" clearable color="primary"-->
<!--                                              label="لوگو"-->
<!--                                              variant="outlined" v-model="logo.value.value">-->

<!--                                </v-file-input>-->
<!--                            </div>-->
<!--                        </v-col>-->
<!--                        <v-col cols="12" lg="5" sm="6">-->
<!--                            <v-text-field variant="outlined" color="primary"-->
<!--                                          :error-messages="callback.errorMessage.value"-->
<!--                                          label="آدرس callback" v-model="callback.value.value"></v-text-field>-->
<!--                        </v-col>-->
<!--                        <v-col cols="12" lg="3" sm="12">-->
<!--                            <v-btn v-if="route.params.id"  height="48" color="primary" block> ویرایش تنظیمات-->
<!--                                درگاه-->
<!--                            </v-btn>-->
<!--                            <v-btn v-else type="submit" height="48" color="primary" block>ثبت درگاه</v-btn>-->
<!--                        </v-col>-->
<!--                    </v-row>-->
<!--                </v-col>-->
<!--            </v-row>-->
        </v-card>
    </form>
</template>


<style scoped>

</style>
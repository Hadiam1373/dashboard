<script setup>
import Gateways from "@/api/apis/Gateways";
import {computed, onMounted, ref} from "vue";
import {useField, useForm} from "vee-validate";
import {useRoute, useRouter} from "vue-router";
import {base642Binary} from "@/tools/base642Binary";

const route = useRoute()
const router = useRouter()

const {handleSubmit, handleReset} = useForm({
    validationSchema: {
        name(value) {
            if (value) return true
            return 'لطفا نام درگاه را وراد نمایید'
        },
        url(value) {
            if (value) return true
            return 'لطفا آدرس درگاه را وراد نمایید'
        },
        callback(value) {
            if (/^https?:/.test(value)) return true
            return 'آدرس callback باید شامل https و کامل باشد '
        },
        logo(value) {
            if (value) return true
            return 'لطفا لوگو خود را انتخاب نمایید'
        },
        color(value) {
            if (value) return true
            return 'لطفا رنگ مورد نظر خود را وراد نمایید'
        },
    }
})

let formData = new FormData()
let name = useField('name')
let url = useField('url')
let callback = useField('callback')
let logo = useField('logo')
let color = useField('color')
let menu = ref(false)
let gateWayData = ref()
let userLogo = ref()

let swatchStyle = computed(() => {
    return {
        backgroundColor: color.value.value,
        cursor: 'pointer',
        height: '30px',
        width: '30px',
        borderRadius: menu ? '50%' : '4px',
        transition: 'border-radius 200ms ease-in-out'
    };
})

const submit = handleSubmit(values => {
    if (route.params.id) {
        updateGateway()
    } else {
        createGateway()
    }
})

function updateGateway() {
    formData.append('name', name.value.value)
    formData.append('url', url.value.value)
    formData.append('color', color.value.value)
    formData.append('callback', callback.value.value)
    formData.append('logo', logo.value.value[0])
    formData.append('_method', 'PATCH')
    Gateways.updateGateway(formData, route.params.id).then(
        () => {
            router.push('/gateways')
        },
        (error) => {
            router.go(0)
        }
    )
}

function createGateway() {
    formData.append('name', name.value.value)
    formData.append('url', url.value.value)
    formData.append('color', color.value.value)
    formData.append('callback', callback.value.value)
    formData.append('logo', logo.value.value[0])
    Gateways.createGateway(formData).then(
        () => {
            router.push('/gateways')
        }
    )
}

function editGateWay() {
    Gateways.getEditGateway(route.params.id).then(
        (r) => {
            url.value.value = r.data.data.gateway.url
            name.value.value = r.data.data.gateway.name
            callback.value.value = r.data.data.gateway.callback
            color.value.value = r.data.data.gateway.color
            userLogo.value = r.data.data.gateway.logo_url
        },
        (error) => {
            router.push('/gateways/gatewaysList')
        }
    )
}


onMounted(() => {
    if (route.params.id) {
        editGateWay()
    } else {
        color.value.value = '#00D1BC'
    }
})
</script>
<template>
    <form @submit.prevent="submit">
        <v-card class="pa-5" min-height="300">
            <v-card-title>
                <div class="d-flex justify-space-between align-center">
                    <div>
                        <template v-if="route.params.id"> {{ 'تنظیمات درگاه ' + name.value.value }}</template>
                        <template v-else>
                            {{ $vuetify.locale.t(`$vuetify.dashboard.gateWays.gatewaySetting`) }}
                        </template>
                    </div>
                    <div>
                        <v-icon color="primary" @click="$router.push('/gateways/gatewaysList')"
                                class="cursor-pointer"
                                size="large">mdi-keyboard-backspace
                        </v-icon>
                    </div>
                </div>
            </v-card-title>
            <v-divider class="mt-5 mb-5"></v-divider>
            <v-row class="mt-5">
                <v-col cols="12">
                    <v-row align="center">
                        <v-col cols="12" lg="4" sm="6">
                            <v-text-field variant="outlined" color="primary" v-model="name.value.value"
                                          label="نام درگاه"
                                          :error-messages="name.errorMessage.value"></v-text-field>
                        </v-col>
                        <v-col cols="12" lg="4" sm="6">
                            <v-text-field variant="outlined" color="primary" v-model="url.value.value"
                                          label="آدرس درگاه"
                                          :error-messages="url.errorMessage.value"></v-text-field>
                        </v-col>
                        <v-col cols="12" lg="4" sm="12">
                            <v-text-field v-model="color.value.value" :error-messages="color.errorMessage.value"
                                          color="primary" label="رنگ" variant="outlined"
                                          solo>
                                <template v-slot:append-inner>
                                    <v-menu v-model="menu" top :close-on-content-click="false">
                                        <template v-slot:activator="{ props }">
                                            <div :style="swatchStyle" v-bind="props"/>
                                        </template>
                                        <v-card>
                                            <v-card-text class="pa-0">
                                                <v-color-picker v-model="color.value.value"
                                                                flat></v-color-picker>
                                            </v-card-text>
                                        </v-card>
                                    </v-menu>
                                </template>
                            </v-text-field>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col>
                    <v-row>
                        <v-col cols="12" lg="4" sm="6">
                            <div class="d-flex gap-2">
                                <v-avatar v-if="route.params.id" :image="userLogo" size="46"></v-avatar>
                                <v-file-input accept="image/*" prepend-icon=""
                                              :error-messages="logo.errorMessage.value"
                                              append-inner-icon="mdi-file-image-plus" clearable color="primary"
                                              label="لوگو"
                                              variant="outlined" v-model="logo.value.value">

                                </v-file-input>
                            </div>
                        </v-col>
                        <v-col cols="12" lg="5" sm="6">
                            <v-text-field variant="outlined" color="primary"
                                          :error-messages="callback.errorMessage.value"
                                          label="آدرس callback" v-model="callback.value.value"></v-text-field>
                        </v-col>
                        <v-col cols="12" lg="3" sm="12">
                            <v-btn v-if="route.params.id" type="submit" height="48" color="primary" block> ویرایش
                                تنظیمات
                                درگاه
                            </v-btn>
                            <v-btn v-else type="submit" height="48" color="primary" block>ثبت درگاه</v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-card>
    </form>
</template>
<style scoped>

</style>

<script setup>
import Gateways from "@/api/apis/Gateways";
import {computed, ref} from "vue";
import {useField, useForm} from "vee-validate";

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
            if (value) return true
            return 'لطفا آدرس callback را وراد نمایید'
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
    createGateway()
})

function createGateway() {
    console.log(logo.value.value.file[0])
    formData.append('name', name.value.value)
    formData.append('url', url.value.value)
    formData.append('color', color.value.value)
    formData.append('callback', callback.value.value)
    formData.append('logo', logo.value.value.file[0])
    Gateways.createGateway(formData)
}
</script>
<template>
    <form @submit.prevent="submit">
        <v-card class="pa-5" min-height="300">
            <v-card-title>
                <div class="d-flex justify-space-between align-center">
                    <div>
                        {{ $vuetify.locale.t(`$vuetify.dashboard.gateWays.gatewaySetting`) }}
                    </div>
                    <div>
                        <v-icon color="primary" @click="$router.push('/gateways/gatewaysList')" class="cursor-pointer"
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
                                          label="نام درگاه" :error-messages="name.errorMessage.value"></v-text-field>
                        </v-col>
                        <v-col cols="12" lg="4" sm="6">
                            <v-text-field variant="outlined" color="primary" v-model="url.value.value"
                                          label="آدرس درگاه" :error-messages="url.errorMessage.value"></v-text-field>
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
                                                <v-color-picker v-model="color.value.value" flat></v-color-picker>
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
                            <v-file-input accept="image/*" prepend-icon=""
                                          :error-messages="logo.errorMessage.value"
                                          append-inner-icon="mdi-file-image-plus" clearable color="primary" label="لوگو"
                                          variant="outlined" v-model="logo.value.value"></v-file-input>
                        </v-col>
                        <v-col cols="12" lg="5" sm="6">
                            <v-text-field variant="outlined" color="primary"
                                          :error-messages="callback.errorMessage.value"
                                          label="آدرس callback" v-model="callback.value.value"></v-text-field>
                        </v-col>
                        <v-col cols="12" lg="3" sm="12">
                            <v-btn type="submit" height="48" color="primary" block>ثبت درگاه</v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-card>
    </form>
</template>
<!--<v-btn @click="$router.push('/gateways/gatewaysList')">back</v-btn>-->
<style scoped>

</style>

<template>
    <form @submit.prevent="submit">
        <v-row align="center" justify="space-between">
            <v-col cols="12" lg="6">
                <v-img
                        :width="150"
                        aspect-ratio="3/4"
                        cover
                        src="../../../src/assets/images/example-person.png"
                        class="mb-4"
                ></v-img>
                <v-list class="text-start pa-4">
                    <v-list-item-title class="font-weight-bold">قوانین بارگزاری عکس شما</v-list-item-title>
                    <v-divider class="mt-5 mb-5"></v-divider>
                    <v-list-item>
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است.
                    </v-list-item>
                    <v-list-item>
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است.
                    </v-list-item>
                    <v-list-item>
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است.
                    </v-list-item>
                </v-list>
            </v-col>
            <v-col cols="12"  lg="5">
                <v-file-input
                        v-model="files.value.value"
                        label="برای بارگذاری تصویر کلیک کنید"
                        prepend-icon="mdi-camera"
                        variant="outlined"
                        color="primary"
                        show-size
                        accept="image/*"
                        :error-messages="files.errorMessage.value"
                        class="mb-5"
                >
                    <template v-slot:selection="{ fileNames }">
                        <template v-for="fileName in fileNames" :key="fileName">
                            <v-chip
                                    size="small"
                                    label
                                    color="primary"
                                    class="me-2"
                            >
                                {{ fileName }}
                            </v-chip>
                        </template>
                    </template>
                </v-file-input>
                <v-card height="120" class="pa-4 d-flex flex-column gap-3">
                    <div class="w-100 d-flex justify-space-between align-center">
                        <span class="font-weight-bold">کد امنیتی :</span>
                        <vue-countdown :time="10 * 60 * 1000" v-slot="{ minutes, seconds }">
                            <span style="color: red">{{ seconds }} : {{ minutes }}</span>
                        </vue-countdown>
                    </div>
                    <v-card color="secondary" class="w-50 mx-auto pa-1">
                        <span class="font-weight-light v-card-title font-weight-bold">51616161</span>
                    </v-card>
                </v-card>
            </v-col>
            <div class="d-flex w-100 justify-space-between align-center mt-5">
                <v-btn color="primary" class="mr-auto" type="submit">ثبت اطلاعات</v-btn>
            </div>
        </v-row>
    </form>
</template>

<script setup>
import {ref} from "vue";
import VueCountdown from '@chenfengyuan/vue-countdown';
import {useField, useForm} from "vee-validate";
import KYC from "@/api/apis/KYC";

const {handleSubmit, handleReset} = useForm({
    validationSchema: {
        files(value){
            if (value) return true
            return 'لطفا تصویر را بارگذاری نمایید'
        }
    }
})

const submit = handleSubmit(values => {
    const formData = new FormData()
    formData.append('validation_image_name' , files.value.value[0])
    KYC.stepTree(formData)
})

let panel = ref(true)
const files = useField('files')
</script>

<style scoped>

</style>
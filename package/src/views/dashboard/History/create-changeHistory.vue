<script setup>
import {useField, useForm} from "vee-validate";
import Editor from '@tinymce/tinymce-vue'

const {handleSubmit, handleReset} = useForm({
    validationSchema: {
        version(value) {
            if (value) return true
            return 'لطفا نسخه را وراد نمایید'
        }
    }
})

let version = useField('version')
let userChange = useField('userChange')
let adminChange = useField('adminChange')

const submit = handleSubmit(values => {
    alert('ok')
})
</script>
<template>
    <form @submit.prevent="submit">
        <v-card class="pa-5">
            <v-card-title>ایجاد نسخه</v-card-title>
            <v-card-text>
                <v-col cols="4">
                    <v-text-field variant="outlined" color="primary" v-model="version.value.value"
                                  label="کد نسخه"
                                  :error-messages="version.errorMessage.value">
                    </v-text-field>
                </v-col>
                <v-col cols="12">
                    <span class="v-card-title">تغییرات نسخه کاربر</span>
                    <v-divider class="mt-5 mb-5"></v-divider>
                    <Editor
                            api-key="no-api-key"
                            v-model="userChange.value.value"
                            :init="{
                                plugins: 'lists link image table code help wordcount'
                                  }"
                    />
                </v-col>

                <v-col cols="12">
                    <span class="v-card-title">تغییرات نسخه ادمین</span>
                    <v-divider class="mt-5 mb-5"></v-divider>
                    <Editor
                            api-key="no-api-key"
                            v-model="adminChange.value.value"
                            :init="{
                                plugins: 'lists link image table code help wordcount'
                                  }"
                    />
                </v-col>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn type="submit" height="48" width="150" variant="flat" color="primary">ثبت نسخه</v-btn>
            </v-card-actions>
        </v-card>
    </form>
</template>


<style scoped>

</style>
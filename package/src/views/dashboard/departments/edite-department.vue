<script setup>
import {onMounted, ref} from "vue";
import {useField, useForm} from "vee-validate";
import {useRoute, useRouter} from "vue-router";
import Department from "@/api/apis/Departments";
import {successMessage} from "@/api/fetch/showErrorMessage";

const route = useRoute()
const router = useRouter()

const statusItem = ref(
    [
        {title: 'Active', value: '1'},
        {title: 'inActive', value: '0'}
    ]
)

const {handleSubmit, handleReset} = useForm({
    validationSchema: {
        name(value) {
            if (value) return true
            return 'لطفا نام واحد را وراد نمایید'
        },
        status(value) {
            if (value) return true
            return 'لطفا آدرس درگاه را وراد نمایید'
        },
    }
})

let formData = new FormData()
let name = useField('name')
let status = useField('status')


const submit = handleSubmit(values => {
    if (route.params.id) {
        updateDepartment()
    } else {
        createDepartment()
    }
})

function updateDepartment() {
    formData.append('name', name.value.value)
    formData.append('status', status.value.value)
    formData.append('_method', 'PATCH')
    Department.editeDepartment(formData).then(
        (r) => {
            successMessage('واحد پشتیبانی مورد نظر ویرایش شد')
        },
    )
}

function getEditedDepartmentData() {
    const id = route.params.id
    Department.getEditedDepartmentData(id).then(
        (r) => {
            name.value.value = r.data.data.department.name
            if (r.data.data.department.status === 1) {
                status.value.value = 'Active'
            } else {
                status.value.value = 'inActive'
            }

        }
    )
}

function createDepartment() {
    Department.createDepartment(name.value.value, status.value.value).then(
        (r) => {
            successMessage('واحد پشتیبانی مورد نظر ایجاد شد')
        }
    )
}


onMounted(() => {
    if (route.params.id) {
        getEditedDepartmentData()
    } else {

    }
})
</script>
<template>
    <form @submit.prevent="submit">
        <v-card class="pa-5" min-height="300">
            <v-card-title>
                <div class="d-flex justify-space-between align-center">
                    <div>
                        <span v-if="route.params.id">ویرایش واحد پشتیبانی</span>
                        <span v-else>ایجاد واحد پشتیبانی</span>
                    </div>
                    <div>
                        <v-icon color="primary" @click="$router.push('/department/department-list')"
                                class="cursor-pointer"
                                size="large">mdi-keyboard-backspace
                        </v-icon>
                    </div>
                </div>
            </v-card-title>
            <v-divider class="mt-5 mb-5"></v-divider>
            <v-row align="center">
                <v-col cols="12" lg="4" sm="6">
                    <v-text-field variant="outlined" color="primary" v-model="name.value.value"
                                  label="نام واحد"
                                  :error-messages="name.errorMessage.value"></v-text-field>
                </v-col>
                <v-col cols="12" lg="4" sm="6">
                    <v-select variant="outlined" color="primary" v-model="status.value.value"
                              label="وضعیت"
                              :error-messages="status.errorMessage.value"
                              :items="statusItem"
                              item-title="title"
                              item-value="value"
                    >
                    </v-select>
                </v-col>
            </v-row>
            <v-card-actions>
                <v-row justify="end">
                    <v-btn type="submit" color="primary" variant="flat" size="large">ثبت</v-btn>
                </v-row>
            </v-card-actions>
        </v-card>
    </form>
</template>
<style scoped>

</style>

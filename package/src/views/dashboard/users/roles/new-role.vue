<script setup>
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import Users from "@/api/apis/users";
import Authentication from "@/api/apis/Authentication";
import {successMessage} from "@/api/fetch/showErrorMessage";

const route = useRoute()
const router = useRouter()


let roles = ref()
let label = ref()
let permissions = ref()
let loading = ref(false)
let formData = new FormData()
let name = ref()
let itemRoles = ref([])
let itemPermissions = ref([])
let des = ref()

function getEditedRoles() {
    let id = route.params.id
    Users.EditedRoles(id).then(
        (r) => {
            r.data.data.permissions.forEach((role) => {
                if (role.assigned) {
                    itemPermissions.value.push(role.id)
                }
            })
            permissions.value = r.data.data.permissions
            name.value = r.data.data.model.display_name
            label.value = r.data.data.model.name
            des.value = r.data.data.model.description
        }
    )
}

function updateRoles() {
    loading.value = true
    let id = route.params.id
    Users.updateRoles(id, itemRoles.value, itemPermissions.value).then(
        (r) => {
            loading.value = false
            if (r.data.status === 'success') {
                successMessage('کاربر باموفقیت بروزرسانی شد')
            }
        },
        (error) => {
            loading.value = false
        }
    )
}

function getOptionRoles() {
    Users.roleCreateOption().then(
        (r) => {
            permissions.value = r.data.data.permissions
        }
    )
}

function createRole() {
    Users.creteRole(name.value, label.value, des.value, itemPermissions.value).then(
        (r) => {
            if (r.data.status === 'success') {
                successMessage('نقش باموفقیت ایجاد شد')
            }
        }
    )
}


onMounted(() => {
    if (route.params.id) {
        getEditedRoles()
    } else {
        getOptionRoles()
    }
})
</script>

<template>
    <v-card class="pa-5" min-height="300">
        <v-card-title>
            <div class="d-flex justify-space-between align-center">
                <div v-if="route.params.id">ویرایش نقش</div>
                <div v-else>ایجاد نقش</div>
                <div>
                    <v-icon color="primary" @click="$router.push('/users/user-roles/role-list')"
                            class="cursor-pointer"
                            size="large">mdi-keyboard-backspace
                    </v-icon>
                </div>
            </div>
        </v-card-title>
        <v-divider class="mt-5 mb-5"></v-divider>
        <v-card-text>
            <v-row align="center">
                <v-col cols="12" sm="6" class="mb-5">
                    <v-text-field variant="outlined" color="primary" v-model="name"
                                  label="برچسب"
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="mb-5">
                    <v-text-field variant="outlined" color="primary" v-model="label"
                                  label="نام نقش"
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-textarea variant="outlined" color="primary" label="توضیحات" v-model="des"></v-textarea>
                </v-col>
            </v-row>

            <v-row class="mb-5">
                <v-col cols="12">
                    <span class="v-list-item-title font-weight-bold">دسترسی ها</span>
                </v-col>
                <v-col v-for="(item , index) in permissions" cols="12" sm="6" lg="3">
                    <v-checkbox
                            v-model="itemPermissions"
                            :key="index"
                            :label="item.display_name"
                            color="primary"
                            :value="item.id"
                            hide-details
                    ></v-checkbox>
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions>
            <div class="d-flex justify-end w-100 mt-5">
                <v-btn v-if="route.params.id" @click="updateRoles" :loading="loading" size="large" variant="flat"
                       color="primary">
                    ثبت
                </v-btn>
                <v-btn v-else @click="createRole" :loading="loading" size="large" variant="flat" color="primary">
                    ثبت نقش جدید
                </v-btn>
            </div>
        </v-card-actions>
    </v-card>
</template>

<style scoped>

</style>

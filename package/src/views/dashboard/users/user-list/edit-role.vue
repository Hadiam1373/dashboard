<script setup>
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import Users from "@/api/apis/users";
import Authentication from "@/api/apis/Authentication";
import {successMessage} from "@/api/fetch/showErrorMessage";

const route = useRoute()
const router = useRouter()


let roles = ref()
let permissions = ref()
let loading = ref(false)
let formData = new FormData()
let name = ref()
let itemRoles = ref([])
let itemPermissions = ref([])
let userId = ref()

function getEditedRoles() {
    let id = route.params.id
    Users.getEditedRoles(id).then(
        (r) => {
            roles.value = r.data.data.roles
            r.data.data.roles.forEach((role) => {
                if (role.assigned) {
                    itemRoles.value.push(role.id)
                }
            })
            r.data.data.permissions.forEach((role) => {
                if (role.assigned) {
                    itemPermissions.value.push(role.id)
                }
            })
            permissions.value = r.data.data.permissions
            name.value = r.data.data.user_name
            userId.value = r.data.data.user_id
        }
    )
}

function updatePassword() {
    loading.value = true
    let id = route.params.id
    Users.updateRoles(id, itemRoles.value, itemPermissions.value).then(
        (r) => {
            loading.value = false
            if(r.data.status === 'success') successMessage('دسترسی های مورد نظر با موفقیت اعمال شد')
        },
        (error) => {
            loading.value = false
        }
    )
}


onMounted(() => {
    getEditedRoles()
})
</script>

<template>
    <v-card class="pa-5" min-height="300">
        <v-card-title>
            <div class="d-flex justify-space-between align-center">
                <div>ویرایش دسترسی کابر</div>
                <div>
                    <v-icon color="primary" @click="$router.push('/users/users-list/show-user-list')"
                            class="cursor-pointer"
                            size="large">mdi-keyboard-backspace
                    </v-icon>
                </div>
            </div>
        </v-card-title>
        <v-divider class="mt-5 mb-5"></v-divider>
        <v-card-text>
            <v-row align="center">
                <v-col cols="12" sm="12" md="6" lg="6" class="mb-5">
                    <v-card color="on-surface">
                        <v-card-title>اطلاعات هویتی کاربر</v-card-title>
                        <v-divider class="mt-5 mb-5"></v-divider>
                        <v-card-text>
                            <div class="d-flex gap-4">
                                <v-avatar color="primary">
                                    <v-icon icon="mdi-account-circle"></v-icon>
                                </v-avatar>
                                <v-spacer></v-spacer>
                                <div class="d-flex w-100 flex-column gap-3">
                                    <div class="v-list-item-title d-flex flex-column flex-lg-row gap-2">
                                        <div>
                                           <span class="font-weight-bold">
                                              نام و نام خانوادگی کاربر :
                                            </span>
                                        </div>
                                        <div>
                                            <span>{{ name }}</span>
                                        </div>
                                    </div>
                                    <div class="v-list-item-title d-flex flex-column flex-lg-row gap-2">
                                        <div>
                                           <span class="font-weight-bold">
                                               شناسه کاربر :
                                            </span>
                                        </div>
                                        <div>
                                            <span>{{ userId }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
            <v-row v-if="roles" class="mb-5">
                <v-col cols="12">
                    <span class="v-list-item-title font-weight-bold">نقش ها</span>
                </v-col>
                <v-col v-for="(item , index) in roles" cols="12" sm="6" lg="3">
                    <v-checkbox
                            v-model="itemRoles"
                            :key="index"
                            :label="item.display_name"
                            color="primary"
                            :value="item.id"
                            hide-details
                    ></v-checkbox>
                </v-col>
            </v-row>

            <v-row v-if="permissions" class="mb-5">
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
                <v-btn @click="updatePassword" :loading="loading" size="large" variant="flat" color="primary">
                    ثبت
                </v-btn>
            </div>
        </v-card-actions>
    </v-card>
</template>

<style scoped>

</style>

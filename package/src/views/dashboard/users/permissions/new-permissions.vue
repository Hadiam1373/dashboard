<script setup>
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import Users from "@/api/apis/users";

const route = useRoute()

let name = ref()
let label = ref()
let des = ref()
let loading = ref(false)
function getOptionPermission(){
    let id = route.params.id
    Users.EditedPermissions(id).then(
        (r)=>{
            name.value = r.data.data.model.display_name
            label.value = r.data.data.model.name
            des.value = r.data.data.model.description
        }
    )
}

function updatePermission(){
    loading.value = true
    let id = route.params.id
    Users.updatePermissions(id, name.value, label.value , des.value).then(
        () => {
            loading.value = false
        },
        (error) => {
            loading.value = false
        }
    )
}

function createPermission(){
    loading.value = true
    let id = route.params.id
    Users.cretePermissions(name.value, label.value , des.value).then(
        () => {
            loading.value = false
        },
        (error) => {
            loading.value = false
        }
    )
}

onMounted(() => {
    if (route.params.id) {
        getOptionPermission()
    }
})
</script>
<template>
    <v-card class="pa-5" min-height="300">
        <v-card-title>
            <div class="d-flex justify-space-between align-center">
                <div v-if="route.params.id">ویرایش نقش</div>
                <div v-else>ایجاد دسترسی</div>
                <div>
                    <v-icon color="primary" @click="$router.push('/users/permissions/PermissionsList')"
                            class="cursor-pointer"
                            size="large">mdi-keyboard-backspace
                    </v-icon>
                </div>
            </div>
        </v-card-title>
        <v-divider class="mt-5 mb-5"></v-divider>
        <v-card-text>
            <v-row align="center">
                <v-col cols="12" sm="6">
                    <v-text-field variant="outlined" color="primary" v-model="name"
                                  label="نام"
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-text-field variant="outlined" color="primary" v-model="label"
                                  label="برچسب"
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-textarea variant="outlined" color="primary" label="توضیحات" v-model="des"></v-textarea>
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions>
            <div class="d-flex justify-end w-100 mt-5">
                <v-btn v-if="route.params.id" @click="updatePermission" :loading="loading" size="large" variant="flat"
                       color="primary">
                    ثبت
                </v-btn>
                <v-btn v-else @click="createPermission" :loading="loading" size="large" variant="flat" color="primary">
                    ثبت دسترسی جدید
                </v-btn>
            </div>
        </v-card-actions>
    </v-card>
</template>


<style scoped>

</style>
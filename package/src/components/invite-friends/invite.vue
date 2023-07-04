<script setup>
import {ref} from "vue";
import CodeInput from "@/components/shared/CodeInput.vue";
import {useField, useForm} from "vee-validate";
import InviteFriends from "@/api/apis/InviteFriends";

const {handleSubmit, handleReset} = useForm({
    validationSchema: {
        inviteCode(value) {
            if (value) return true
            return 'لطفا کد معرف را وراد نمایید'
        }
    }
})

function setOtp(val) {
    googleCode.value = val
}

function submitOtp() {
    InviteFriends.sendCode(inviteCode.value.value, googleCode.value)
}

let inviteCode = useField('inviteCode')
let googleCode = ref()
let step = ref(1)



const submit = handleSubmit(values => {
    step.value++
})
</script>

<template>
    <form @submit.prevent="submit">
        <v-card class="pa-5" elevation="0">
            <v-window v-model="step">
                <v-window-item :value="1">
                    <v-col cols="12" lg="4">
                        <span>چنانچه کد دعوت دارید آن را در فیلد زیر وارد کنید</span>
                        <v-text-field class="mt-5" variant="outlined" color="primary"
                                      v-model="inviteCode.value.value"
                                      :error-messages="inviteCode.errorMessage.value"
                        >
                        </v-text-field>
                    </v-col>
                </v-window-item>
                <v-window-item :value="2">
                    <v-row class="mt-5"></v-row>
                    <v-row align="center" justify="center" class="mb-5">
                        <span class="mb-5">کد ورود 2 مرحله ای</span>
                        <code-input @getOtp="(n) => setOtp(n)"/>
                    </v-row>
                </v-window-item>
            </v-window>
            <v-card-actions>
                <v-btn @click="step--" v-if="step === 2" variant="flat" color="secondary" width="150">مرحله قبل</v-btn>
                <v-spacer></v-spacer>
                <v-btn type="submit" v-if="step === 1" variant="flat" color="primary" width="150">ادامه</v-btn>
                <v-btn @click="submitOtp" v-if="step === 2" variant="flat" color="primary" width="150">ثبت</v-btn>
            </v-card-actions>
        </v-card>
    </form>
</template>


<style scoped>

</style>
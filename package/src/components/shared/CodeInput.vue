<script setup>
import {ref} from "vue";
import VOtpInput from "vue3-otp-input";

const otpInput = ref(null);
const bindModal = ref("");
</script>
<template>
    <div style="direction: ltr">
        <v-otp-input
                ref="otpInput"
                v-model:value="bindModal"
                input-classes="otp-input isTheme"
                separator=""
                :num-inputs="6"
                :should-auto-focus="true"
                input-type="letter-numeric"
                :conditionalClass="['one', 'two', 'three', 'four']"
                :placeholder="['*', '*', '*', '*','*', '*']"
                @on-complete="$emit('getOtp' , bindModal)"
        />
    </div>
<!--    <div class="d-flex flex">-->
<!--        <v-btn color="primary" @click="clearInput()">Clear Input</v-btn>-->
<!--        <v-btn @click="fillInput('2929')">Fill Input</v-btn>-->
<!--    </div>-->
</template>
<style>
.otp-input {
    width: 40px;
    height: 40px;
    padding: 4px;
    margin: 0 10px;
    font-size: 20px;
    border-radius: 4px;
    text-align: center;
}

.v-theme--dark .isTheme{
    border: 1px solid white;
    background-color: var(--v-theme-on-background);
}

.v-theme--light .isTheme{
    border: 1px solid black;
    background-color: var(--v-theme-on-background);
}

/* Background colour of an input field with value */
.otp-input.is-complete {
    border-color: #00FF00;
}

.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input::placeholder {
    font-size: 15px;
    text-align: center;
    font-weight: 600;
}
</style>
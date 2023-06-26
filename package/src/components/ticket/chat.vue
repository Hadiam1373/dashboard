<template>
    <v-card class="pa-5">
        <div class="w-100 mb-2" :class="{'text-left':item.side_right , 'text-right':!item.side_right}" v-for="(item , index) in props.data">
            <v-chip v-if="item.side_right" size="large" color="secondary">{{ item.message }}</v-chip>
            <v-chip v-if="!item.side_right" size="large" color="primary" >{{ item.message }}</v-chip>
        </div>

        <v-card-actions>
            <v-textarea v-model="message"
                          variant="outlined" type="password"
                          color="primary">
            </v-textarea>
        </v-card-actions>
    </v-card>
</template>

<script setup>
import {ref} from "vue";

const props = defineProps(['data'])

let message = ref()
</script>

<style scoped>

</style>
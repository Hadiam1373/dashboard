<script setup>
import {computed} from "vue";

const props = defineProps(['status', 'value'])
let computedColor = computed(() => {
    let color;
    switch (props.status) {
        case 'pending' :
            color = '#FCE83A'
            break;
        case 'paid':
            color = '#56F000'
            break;
        case 'cancelled':
            color = '#FFB302'
            break;
        case 'expired':
            color = '#FFB302'
            break;
        case 'enable':
            color = '#56F000'
            break;
        case 'disable':
            color = '#FCE83A'
            break;
        case 'ban':
            color = '#FF3838'
            break;
    }
    return color
})
</script>

<template>
    <div class="d-flex justify-center">
        <v-chip class="max-width-chip d-none d-sm-none d-lg-flex" label :color="computedColor">{{ value }}</v-chip>
        <v-chip size="x-small" class="d-lg-none" label :color="computedColor">{{ value }}</v-chip>
    </div>
</template>


<style scoped>
.max-width-chip {
    width: 70px !important;
    height: 30px !important;
    text-align: center !important;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

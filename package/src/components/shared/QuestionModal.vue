<script setup>
let props = defineProps(['dialog', 'title', 'text', 'ok', 'cancel'])
</script>

<template>
    <v-row justify="center">
        <v-dialog
                v-model="props.dialog"
                persistent
                width="auto"
        >
            <template v-slot:activator="{ props }">
                <slot name="element" :props="props">

                </slot>
            </template>
            <v-card>
                <v-card-title class="text-h5">
                    {{ props.title }}
                </v-card-title>
                <v-card-text>
                    {{ props.text }}
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="error"
                            variant="outlined"
                            @click="$emit('confirm' , false)"
                    >
                        {{ props.ok }}
                    </v-btn>
                    <v-btn
                            color="success"
                            variant="outlined"
                            @click="$emit('reject' , false)"
                    >
                        {{ props.cancel }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>


<style scoped>

</style>
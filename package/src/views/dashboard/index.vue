<script setup lang="ts">
/*Call Components*/
import SalesOverview from '@/components/dashboard/SalesOverview.vue';
import ProfileUserCard from "@/components/dashboard/ProfileUserCard.vue";
</script>
<template>
    <v-row>
        <v-col cols="12">
            <v-row class="mb-5">
                <profile-user-card/>
            </v-row>
            <v-row>
                <!-- Sales overview -->
                <v-col cols="12">
                    <SalesOverview/>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script setup>
import Icon from '../Icon.vue';
import {useRouter} from "vue-router";
const router = useRouter()
const props = defineProps({item: Object, level: Number});
</script>

<template>
  <!--        IF Item Has Children-->
    <v-list-group
            v-if="item.children"
            :value="item.title"
    >
        <template v-slot:activator="{ props }">
            <v-list-item
                    v-bind="props"
                    :prepend-icon="item.icon"
                    :title="$vuetify.locale.t(`$vuetify.sidebar.${item.title}`)"
                    class="mb-1"
                    :disabled="item.disabled"
                    :target="item.type === 'external' ? '_blank' : ''"
            ></v-list-item>
        </template>
        <v-list-item
                v-for="(item , index) in item.children"
                :key="index"
                :to="item.to"
                :title="$vuetify.locale.t(`$vuetify.sidebar.${item.title}`)"
                :value="item.title"
        >
        </v-list-item>
    </v-list-group>
  <!---Single Item-->
    <v-list-item
            v-else
            :to="item.to"
            rounded
            class="mb-1"
            active-color="primary"
            :disabled="item.disabled"
            :target="item.type === 'external' ? '_blank' : ''"
    >
        <!--        -If icon-->
        <template v-slot:prepend>
            <v-icon>{{ item.icon}}</v-icon>
        </template>
        <v-list-item-title>{{ $vuetify.locale.t(`$vuetify.sidebar.${item.title}`) }}</v-list-item-title>
        <!---If Caption-->
        <v-list-item-subtitle v-if="item.subCaption" class="text-caption mt-n1 hide-menu">
            {{ item.subCaption }}
        </v-list-item-subtitle>
        <!---If any chip or label-->
        <template v-slot:append v-if="item.chip">
            <v-chip
                    :color="item.chipColor"
                    class="sidebarchip hide-menu"
                    :size="'small'"
                    :variant="item.chipVariant"
                    :prepend-icon="item.chipIcon"
            >
                {{ item.chip }}
            </v-chip>
        </template>
    </v-list-item>
</template>

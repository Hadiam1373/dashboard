<template>
  <v-btn @click="toggleTheme()" density="comfortable" icon="mdi-theme-light-dark"></v-btn>
</template>

<script>
import { useTheme } from 'vuetify'

export default {
  setup () {
    const theme = useTheme()

    return {
      theme,
      toggleTheme: () => theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
    }
  },
}
</script>

<style scoped>

</style>
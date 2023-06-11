<template>

</template>

<script>
import { useDate } from 'vuetify/labs/date'

export default {
    setup () {
        const date = useDate()

        const formatted = date.format('2010-04-13 00:00:00', 'fullDateWithWeekday')

        console.log(formatted) // Tuesday, April 13, 2010
    },
}
</script>

<style scoped>

</style>
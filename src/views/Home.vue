<template>
  <h2>Home - {{event.bandName}}</h2>
</template>

<script>
export default {
    computed: {
        event() {
            return this.$store.getters['events/currentEvent'] ? this.$store.getters['events/currentEvent'] : {};
        }
    }
}
</script>

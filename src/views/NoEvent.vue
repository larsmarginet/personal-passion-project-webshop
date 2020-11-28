<template>
  <h2>No event :(</h2>
</template>

<script>
export default {
    mounted() {
        this.$store.dispatch('setLoadingComponent', false);
    }
}
</script>

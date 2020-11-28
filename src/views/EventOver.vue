<template>
  <h2>Event over :(</h2>
</template>

<script>
export default {
    mounted() {
        this.$store.dispatch('setLoadingComponent', false);
    }
}
</script>

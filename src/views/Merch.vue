<template>
    <section>
        <h2 style="display: none">Merchandise</h2>
    </section>
</template>

<script>
export default {
    mounted() {
        this.$store.dispatch('setLoadingComponent', false);
        this.$store.dispatch('merch/loadMerch');
    }
}
</script>

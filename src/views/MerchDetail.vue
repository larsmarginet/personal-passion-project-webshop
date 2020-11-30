<template>
  <p>detail</p>
</template>

<script>
export default {
    props: {
        id: {
            required: true,
            type: String
        }
    },
    computed: {
        currentItem() {
            return this.$store.getters['merch/currentItem'];
        },
        loading() {
            return this.$store.getters['merch/loading'];
        },
        error() {
            return this.$store.getters['merch/error'];
        }
    },
    mounted() {
        this.$store.dispatch('setLoadingComponent', false);
        this.$store.dispatch('merch/getMerchById', this.id);
    }
}
</script>

<style>

</style>
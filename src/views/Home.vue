<template>
    <section>
        <h2 style="display: none">Home</h2>
        <article>
            <v-card width="100%" height="200" class="primary menu-item mb-4" href="/menu" flat>
                <v-icon x-large dark class="mx-auto">fastfood</v-icon>
                <h3 class="v-card__title white--text pa-0">Food &amp; drinks</h3>
            </v-card>  
        </article>
        <article>
            <v-card width="100%" height="200" class="primary menu-item mb-4" href="/merch" flat>
                <v-icon x-large dark class="mx-auto">checkroom</v-icon>
                <h3 class="v-card__title white--text pa-0">Merchandise</h3>
            </v-card>  
        </article>
    </section>
</template>

<script>
export default {
    computed: {
        event() {
            return this.$store.getters['events/currentEvent'] ? this.$store.getters['events/currentEvent'] : {};
        }
    },
    mounted() {
        this.$store.dispatch('setLoadingComponent', false);
    }
}
</script>

<style scoped>
.menu-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>

<template>
    <section>
        <h2 hidden>Home</h2>
        <v-card width="100%" height="200" class="primary menu-item mb-4" href="/menu" flat>
            <v-icon x-large dark class="mx-auto">fastfood</v-icon>
            <v-card-title class="white--text pa-0">Food &amp; drinks</v-card-title>
        </v-card>  
        <v-card width="100%" height="200" class="primary menu-item mb-4" href="/merch" flat>
            <v-icon x-large dark class="mx-auto">checkroom</v-icon>
            <v-card-title class="white--text pa-0">Merchandise</v-card-title>
        </v-card>  
    </section>
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

<style scoped>
.menu-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>

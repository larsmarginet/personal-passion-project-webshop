<template>
    <section>
        <h2 hidden>food &amp; drinks</h2>
        <v-container class="ma-0 pa-0" v-if="loading">
            <v-skeleton-loader type="list-item-avatar-two-line" class="mb-4" v-for="n in 3" :key="n"></v-skeleton-loader>
        </v-container>
        <MenuCard v-for="item in menu" :key="item.id" :item="item" v-else-if="!loading && menu"/>
    </section>
</template>

<script>
import MenuCard from '../components/MenuCard';
export default {
    components: {
        MenuCard
    },
    computed: {
        menu() {
            return this.$store.getters['menu/menu'];
        },
        loading() {
            return this.$store.getters['menu/loading'];
        }
    },
    mounted() {
        this.$store.dispatch('setLoadingComponent', false);
        this.$store.dispatch('menu/loadMenu');
    }
}
</script>
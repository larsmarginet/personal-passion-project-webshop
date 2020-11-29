<template>
    <section>
        <h2 style="display: none">Food &amp; drinks</h2>
        <v-container class="ma-0 pa-0" v-if="loading">
            <v-skeleton-loader type="list-item-avatar-two-line" class="mb-4" v-for="n in 3" :key="n"></v-skeleton-loader>
        </v-container>
        <div v-else-if="!loading && menu"> 
            <article v-for="filter in filters" :key="filter">
                <h3 class="display-1 py-2">{{filter}}</h3>
                <MenuCard v-for="item in filteredMenu(filter)" :key="item.id" :item="item"/>
            </article>
        </div>
    </section>
</template>

<script>
import MenuCard from '../components/MenuCard';
export default {
    components: {
        MenuCard
    },
    data() {
        return {
            filters: ['soda', 'beer', 'wine', 'liquor', 'hot', 'snacks']
        }
    },
    computed: {
        menu() {
            return this.$store.getters['menu/menu'];
        },
        loading() {
            return this.$store.getters['menu/loading'];
        }
    },
    methods: {
        filteredMenu(filter) {
            return this.menu ? this.menu.filter(item => item.category === filter) : null;
        },
    },
    mounted() {
        this.$store.dispatch('setLoadingComponent', false);
        this.$store.dispatch('menu/loadMenu');
    }
}
</script>
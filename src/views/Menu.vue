<template>
    <section>
        <h2 style="display: none">Food &amp; drinks</h2>
        <v-expand-transition>
            <Alert @dismissed="onDismissed" :text="error" v-if="error"/>
        </v-expand-transition>
        <v-container class="ma-0 pa-0" v-if="loading">
            <v-skeleton-loader type="list-item-avatar-two-line" class="mb-4" v-for="n in 3" :key="n"></v-skeleton-loader>
        </v-container>
        <div v-else-if="!loading && menu"> 
            <article v-for="filter in filters" :key="filter" style="maxWidth: 600px" class="mx-auto">
                <h3 class="display-1 py-2">{{filter}}</h3>
                <MenuCard v-for="item in filteredMenu(filter)" :key="item.id" :item="item" @decrementQuantity="handleDecrementQuantity" @incrementQuantity="handleIncrementQuantity"/>
            </article>
        </div>
        <div class="orders">
            <MenuOrders :orders="orders" @decrementQuantity="handleDecrementQuantity" @incrementQuantity="handleIncrementQuantity" @removeOrder="handleRemoveOrder"/>
        </div>
    </section>
</template>

<script>
import MenuCard from '../components/MenuCard';
import MenuOrders from '../components/MenuOrders';
import Alert from '../components/shared/Alert';
export default {
    components: {
        MenuCard,
        MenuOrders,
        Alert
    },
    data() {
        return {
            filters: ['soda', 'beer', 'wine', 'liquor', 'hot', 'snacks'],
            orders: [],
        }
    },
    computed: {
        menu() {
            return this.$store.getters['menu/menu'];
        },
        loading() {
            return this.$store.getters['menu/loading'];
        },
        error() {
            return this.$store.getters['menu/error'];
        }
    },
    methods: {
        filteredMenu(filter) {
            return this.menu ? this.menu.filter(item => item.category === filter) : null;
        },
        handleDecrementQuantity(id) {
            const item = this.orders.find(item => item.id === id);
            if (item.quantity > 1) {
                item.quantity--;
            } else {
                const index = this.orders.findIndex(item => item.id === id);
                this.orders.splice(index, 1);
                const menuItem = this.menu.find(item => item.id === id);
                menuItem.quantity = 0;
            }
        },
        handleIncrementQuantity(id) {
            const item = this.menu.find(item => item.id === id);
            const alreadyExists = this.orders.find(item => item.id === id);
            if (alreadyExists) {
                alreadyExists.quantity++;
            } else {
                item.quantity++;
                this.orders.push(item);
            }
        },
        handleRemoveOrder(id) {
            const index = this.orders.findIndex(item => item.id === id);
            this.orders.splice(index, 1);
            const menuItem = this.menu.find(item => item.id === id);
            menuItem.quantity = 0;
        },
         onDismissed() {
            this.$store.dispatch('menu/clearError');
        },
    },
    mounted() {
        this.$store.dispatch('setLoadingComponent', false);
        this.$store.dispatch('menu/loadMenu');
    }
}
</script>

<style scoped>
.orders {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
}
</style>
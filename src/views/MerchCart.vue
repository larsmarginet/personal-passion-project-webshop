<template>
    <section style="maxWidth: 600px" class="mx-auto">
        <h2 style="display: none">cart</h2>
        <div v-if="cart.length > 0">
            <swipe-list ref="list" class="card" :items="cart" item-key="id">
                <template v-slot="{ item }">
                    <div class="card-content mb-2">
                        <MerchCardMini :item="item" @decrementQuantity="handleDecrementQuantity" @incrementQuantity="handleIncrementQuantity"/>
                    </div>
                </template>
                <template v-slot:right="{ item }">
                    <div class="swipeout-action error delete-card mb-2" title="remove" @click="removeOrder(item.id, item.selectedOption)" @keypress.enter="removeOrder(item.id, item.selectedOption)">
                        <v-icon class="white--text px-5">delete</v-icon>
                    </div>
                </template>
            </swipe-list>
            <v-row justify="space-between" class="px-3">
                <p class="grey--text text--lighten-1 title">Total:</p>
                <p class="font-weight-bold title">€{{cartTotal}}</p>
            </v-row>
            <v-btn class="primary" block large depressed @click="handleOrderMerch">Order</v-btn>
        </div>
        <div class="mt-8" v-else>
            <p class="text-center body-1">Your cart is empty...</p>
            <v-row justify="center">
                <v-btn to="/merch" class="primary" depressed>Continue shopping</v-btn>
            </v-row>
        </div>
    </section>
</template>

<script>
import { SwipeList } from 'vue-swipe-actions';
import MerchCardMini from '../components/merch/MerchCardMini'
export default {
    components: {
        MerchCardMini,
        SwipeList
    },
    computed:{
        cart() {
            return this.$store.getters['cart/cart'];
        },
        cartTotal() {
            let total = 0;
            this.cart.forEach(order => total += (parseFloat(order.price) * order.orderQuantity));
            return (Math.round(total * 100) / 100).toFixed(2);
        }
    },
    methods: {
        removeOrder(id, option) {
            this.$store.dispatch('cart/deleteItem', {id, option})
        },
        handleDecrementQuantity({id, option}) {
            const item = this.cart.find(item => item.id === id && item.selectedOption === option);
            if (item.orderQuantity <= 1) {
                this.$store.dispatch('cart/deleteItem', {id, option});
            } else {
                this.$store.commit('cart/updateCartItem', {id, selectedOption: option, orderQuantity: -1});
            }
        },
        handleIncrementQuantity({id, option}) {
            this.$store.commit('cart/updateCartItem', {id, selectedOption: option, orderQuantity: 1});
        },
        handleOrderMerch() {
            this.$store.dispatch('cart/placeMerchOrders', this.cart)
        }
    },
    mounted() {
        this.$store.dispatch('setLoadingComponent', false);
    }
}
</script>

<style lang="scss">
.swipeout-action {
  display: flex;
  align-items: center;
  padding: 0 2rem;
  cursor: pointer;
}

.swipeout {
	position: relative;
	overflow: hidden;
	display: flex;
}

.swipeout .swipeout-left, .swipeout .swipeout-right {
	position: absolute;
	height: 100%;
	display: flex;
	z-index: 1;
}

.swipeout .swipeout-left {
	left: 0;
	transform: translateX(-100%);
}

.swipeout .swipeout-right {
	right: 0;
	transform: translateX(100%);
}

.swipeout .swipeout-content,
.swipeout .swipeout-action {
	transition: transform .2s;
	will-change: transform;
}

.swipeout.swipeout--no-transition .swipeout-content,
.swipeout.swipeout--no-transition .swipeout-action {
  transition: none !important;
}

.swipeout .swipeout-content {
	width: 100%;
}

.swipeout-non-selectable {
	-webkit-user-select: none !important;
	-moz-user-select: none !important;
	-ms-user-select: none !important;
	user-select: none !important;
}

.swipeout-no-pointer-events {
	pointer-events: none !important;
}

.swipeout-list {
	display: flex;
	flex-direction: column;
}

.swipeout-list-item {
	flex: 1;
}
</style>
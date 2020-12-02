<template>
    <div>
        <v-bottom-sheet v-model="modal" scrollable>
            <v-card class="rounded-t-xl grey lighten-4" height="80vh">
                <v-row justify="end" class="ma-0" style="maxHeight: 50px">
                    <v-btn fab depressed text  @click="closeSheet"><v-icon class="primary--text">highlight_off</v-icon></v-btn>
                </v-row>
                <v-card-text style="overflowY: scroll; maxWidth: 600px" class="mx-auto">
                    <swipe-list ref="list" class="card" :items="orders" item-key="id">
                        <template v-slot="{ item }">
                            <div class="card-content mb-2">
                                <MenuOrderCard :order="item" @decrementQuantity="handleDecrementQuantity" @incrementQuantity="handleIncrementQuantity"/>
                            </div>
                        </template>
                        <template v-slot:right="{ item }">
                            <div class="swipeout-action error delete-card mb-2" title="remove" @click="removeOrder(item.id)" @keypress.enter="removeOrder(item.id)">
                                <v-icon class="white--text px-5">delete</v-icon>
                            </div>
                        </template>
                    </swipe-list>
                </v-card-text>
                <v-card-actions>
                    <v-col>
                        <v-row justify="space-between" class="px-3">
                            <p class="grey--text text--lighten-1">Total:</p>
                            <p class="font-weight-bold">€{{totalPrice}}</p>
                        </v-row>
                        <v-btn block depressed large class="primary">Order</v-btn>
                    </v-col>
                </v-card-actions>
            </v-card>
        </v-bottom-sheet>
        <v-scroll-y-reverse-transition>
            <v-card class="primary rounded-0 headline" flat link @click="modal = !modal" v-if="orders.length > 0">
                <v-row class="px-6 py-2">
                    <p class="mb-0 white--text"><span class="font-weight-bold">{{totalItems}}</span> items</p>
                    <v-spacer></v-spacer>
                    <p class="mb-0 white--text headline font-weight-bold">€{{totalPrice}}</p>
                </v-row>
            </v-card>
        </v-scroll-y-reverse-transition>
    </div>
</template>

<script>
import { SwipeList } from 'vue-swipe-actions';
import MenuOrderCard from './MenuOrderCard';
export default {
    props: {
        orders: {
            required: true,
            type: Array
        }
    },
    components: {
        MenuOrderCard,
        SwipeList
    },
    data() {
        return {
            modal: false,
        }
    },
    computed: {
        totalItems() {
            let total = 0;
            this.orders.forEach(order => total += order.quantity);
            return total;
        },
        totalPrice() {
            let total = 0;
            this.orders.forEach(order => total += (parseFloat(order.price) * order.quantity));
            return (Math.round(total * 100) / 100).toFixed(2);
        }
    },
    methods: {
        handleDecrementQuantity(id) {
            this.$emit('decrementQuantity', id);
        },
        handleIncrementQuantity(id) {
            this.$emit('incrementQuantity', id);
        },
        closeSheet() {
            this.modal = !this.modal;
            this.$refs.list.closeActions();
        },
        removeOrder(id) {
            this.$emit('removeOrder', id)
        }
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
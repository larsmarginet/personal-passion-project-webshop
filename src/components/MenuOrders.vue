<template>
    <div>
        <v-bottom-sheet v-model="modal" scrollable>
            <v-card class="rounded-t-xl grey lighten-4" height="80vh">
                <v-row justify="end" class="ma-0" style="maxHeight: 50px">
                    <v-btn fab depressed text  @click="modal = !modal"><v-icon class="primary--text">highlight_off</v-icon></v-btn>
                </v-row>
                <v-card-text style="overflowY: scroll">
                    <MenuOrderCard v-for="order in orders" :key="order.id" :order="order" @decrementQuantity="handleDecrementQuantity" @incrementQuantity="handleIncrementQuantity"/>
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
import MenuOrderCard from '../components/MenuOrderCard';
export default {
    props: {
        orders: {
            required: true,
            type: Array
        }
    },
    components: {
        MenuOrderCard
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
        }
    }
}
</script>
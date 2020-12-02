<template>
    <v-card flat class="rounded-lg">
        <v-row class="pl-3">
            <v-col cols="4" sm="2">
                <v-responsive :aspect-ratio="1/1" style="maxWidth: 70px; maxHeight: 70px" class="rounded-lg">
                    <img :src="order.image" :alt="order.name" style="objectFit: cover; maxHeight: 70px">
                </v-responsive>
            </v-col>
            <v-col cols="8" class="card-grid px-0">
                <v-card-title class="pa-0">{{order.name}}</v-card-title>
                <div class="card-grid-bottom">
                    <v-row align="center" class="ml-1">
                        <v-btn color="primary" depressed fab x-small @click="decrementQuantity"><v-icon small>remove</v-icon></v-btn>
                        <p class="mb-0 mx-2">{{order.quantity}}</p>
                        <v-btn color="primary" depressed fab x-small @click="incrementQuantity"><v-icon small>add</v-icon></v-btn>
                    </v-row>
                    <p class="mr-7 my-0 title">€{{order.price}}</p>
                </div>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
export default {
    props: {
        order: {
            required: true,
            type: Object,
        }
    },
    methods: {
        decrementQuantity() {
            this.$emit('decrementQuantity', this.order.id);
        },
        incrementQuantity() {
            this.$emit('incrementQuantity', this.order.id);
        }
    }
}
</script>


<style scoped>
.card-grid {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.card-grid-bottom {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
}
</style>

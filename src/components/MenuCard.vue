<template>
    <v-card flat class="mb-4 mx-auto rounded-lg" max-width="600">
        <v-row class="pl-3">
            <v-col cols="4" sm="2">
                <v-responsive :aspect-ratio="1/1" style="maxWidth: 100px; maxHeight: 100px" class="rounded-lg">
                    <img :src="item.image" :alt="item.name" style="objectFit: cover; maxHeight: 100px">
                </v-responsive>
            </v-col>
            <v-col cols="8" class="card-grid px-0">
                <v-card-title class="pa-0">{{item.name}}</v-card-title>
                <div class="card-grid-bottom">
                    <v-row align="center" class="ml-1">
                        <v-btn color="primary" depressed fab x-small @click="decrementQuantity" :disabled="quantity < 1"><v-icon small>remove</v-icon></v-btn>
                        <p class="mb-0 mx-2">{{quantity}}</p>
                        <v-btn color="primary" depressed fab x-small @click="incrementQuantity"><v-icon small>add</v-icon></v-btn>
                    </v-row>
                    <p class="mr-7 my-0 title">€{{item.price}}</p>
                </div>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
export default {
    props: {
        item: {
            required: true,
            type: Object,
        }
    },
    data() {
        return {
            quantity: 0
        }
    },
    methods: {
        decrementQuantity() {
            if (this.quantity > 0) {
                this.quantity --;
            }
        },
        incrementQuantity() {
            this.quantity++;

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
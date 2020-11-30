<template>
    <v-card flat class="rounded-lg" >
        <router-link :to="`merch/${item.id}`" style="textDecoration: none" class="grey--text text--darken-4">
            <div class="px-4 pt-4">
                <div class="primary amount-left mr-4 pl-8 pr-4 py-2 rounded-bl-lg white--text font-weight-bold" v-if="item.quantity <= 15">{{item.quantity}} left</div>
                <v-img :src="item.image.image" :alt="item.name" cover :aspect-ratio="1/1" ></v-img>
            </div>
            <v-card-title>{{item.name}}</v-card-title>
        </router-link>
        <v-row class="px-7 pb-4" justify="space-between" align="center">
            <p class="mb-0 title">€{{item.price}}</p>
            <v-btn depressed large link class="primary"><v-icon class="white--text">add_shopping_cart</v-icon></v-btn>
        </v-row>
    </v-card>
</template>

<script>
export default {
    props: {
        item: {
            required: true,
            type: Object
        }
    },
}
</script>

<style scoped>
.amount-left {
    position: absolute;
    z-index: 99;
    right: 0;
}
</style>
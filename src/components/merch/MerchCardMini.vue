<template>
    <article>
        <v-card flat class="rounded-lg">
            <v-row class="pl-3">
                <v-col style="width: 25%; maxWidth: 100px">
                    <v-responsive :aspect-ratio="1/1" style="maxWidth: 70px; maxHeight: 70px" class="rounded-lg">
                        <img :src="item.image.image" :alt="item.name" style="objectFit: cover; maxHeight: 70px">
                    </v-responsive>
                </v-col>
                <v-col style="width: 75%" class="card-grid px-0">
                    <h3 class="v-card__title py-0 pl-0 pr-5" style="lineHeight: 1">{{item.name}}<span class="ml-2 primary--text" v-if="item.selectedOption"> {{item.selectedOption}}</span></h3>
                    <div class="card-grid-bottom">
                        <v-row align="center" class="ml-1">
                            <v-btn color="primary" depressed fab x-small @click="decrementQuantity"><v-icon small>remove</v-icon></v-btn>
                            <p class="mb-0 mx-2">{{item.orderQuantity}}</p>
                            <v-btn color="primary" depressed fab x-small @click="incrementQuantity" :disabled="item.orderQuantity >= maxQuantity"><v-icon small>add</v-icon></v-btn>
                        </v-row>
                        <p class="mr-7 my-0 title">€{{item.price}}</p>
                    </div>
                </v-col>
            </v-row>
        </v-card>
    </article>
</template>

<script>
export default {
    props: {
        item: {
            required: true,
            type: Object
        }
    },
    computed: {
        maxQuantity() {
            if (this.item.selectedOption) {
                const option = this.item.options.find(option => option.option === this.item.selectedOption);
                return option.quantity;
            } else {
                return this.item.quantity
            }
        }
    },
    methods: {
        decrementQuantity() {
            this.$emit('decrementQuantity', {id: this.item.id, option: this.item.selectedOption});
        },
        incrementQuantity() {
            if (this.item.orderQuantity < this.maxQuantity) {
                this.$emit('incrementQuantity', {id: this.item.id, option: this.item.selectedOption});
            }
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


<template>
    <v-card flat class="rounded-lg" >
        <router-link :to="`merch/${item.id}`" style="textDecoration: none" class="grey--text text--darken-4">
            <div class="px-4 pt-4">
                <div class="primary amount-left mr-4 pl-8 pr-4 py-2 rounded-bl-lg white--text font-weight-bold" v-if="item.quantity <= 15">{{item.quantity}} left</div>
                <v-img :src="item.image.image" :alt="item.name" cover :aspect-ratio="1/1" ></v-img>
            </div>
            <v-card-title>{{item.name}}</v-card-title>
        </router-link>
        <v-row class="px-4 mb-2" v-if="item.options.length > 0">
            <label class="options-label" v-for="(option, i) in item.options" :key="i" :for="option"> 
                <input type="radio" class="options-radio" :id="option.option" :name="`options-${item.id}`" :value="option.option" v-model="selectedOption" :disabled="option.quantity < 1"/>
                <span class="options-option">{{option.option}}</span>
            </label>
        </v-row>
        <v-row class="px-7 pb-4" justify="space-between" align="center">
            <p class="mb-0 title">€{{item.price}}</p>
            <v-btn depressed large link class="primary" @click="handleAddToCart" :disabled="(cartItemQuantity + 1) > maxQuantity"><v-icon class="white--text">add_shopping_cart</v-icon></v-btn>
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
    data() {
        return {
            selectedOption: this.item.options.length > 0 ? this.firstOption() : null
        }
    },
    computed: {
        cartItemQuantity() {
           return this.$store.getters['cart/getCartItemQuantity']({id: this.item.id, option: this.selectedOption});
        },
        maxQuantity() {
            if (this.item.options.length > 0 && this.selectedOption) {
                const option = this.item.options.find(option => option.option === this.selectedOption);
                return option.quantity;
            } else {
                return this.item.quantity;
            }
        },
    },
    methods: {
        firstOption() {
            let option;
            for (let i = 0; i < this.item.options.length; i++) {
                if (this.item.options[i].quantity > 0) {
                    // return first option available that is still in stock
                    option = this.item.options[i].option;
                    break;
                }
            }
            return option;
        },
        handleAddToCart() {
            this.$store.dispatch('cart/addToCart', {
                orderQuantity: 1,
                selectedOption: this.selectedOption,
                signed: false,
                ...this.item
            });

        }   
    }
}
</script>

<style scoped>
.amount-left {
    position: absolute;
    z-index: 2;
    right: 0;
}

.options {
    display: flex;
}

.options-label {
    position: relative;
    cursor: pointer;
}

.options-option {
    border: 2px solid #6fcf97;
    display: block;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    justify-content: center;
    text-align: center;
    padding-top: 3px;
    margin-left: 10px;
}

.options-radio {
    position: absolute;
	opacity: 0;
    display: block;
    width: 35px;
    height: 35px;
}

.options-radio:checked ~ span {
    background: #6fcf97;
    color: white;
}

.options-radio:disabled ~ span {
    opacity: .5;
}
</style>
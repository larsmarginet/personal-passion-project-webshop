<template>
    <section>
        <div v-if="loading" class="mx-auto" style="maxWidth: 600px">
            <v-skeleton-loader type="image"></v-skeleton-loader>
            <v-skeleton-loader type="text" class="mt-4"></v-skeleton-loader>
            <v-skeleton-loader type="paragraph" class="mt-4"></v-skeleton-loader>
            <v-skeleton-loader type="button" class="mt-4"></v-skeleton-loader>
            <v-skeleton-loader type="paragraph" class="mt-4"></v-skeleton-loader>
        </div>
        <div v-else-if="!loading && currentItem" class="mx-auto" style="maxWidth: 1100px">
            <v-row justify="center">
                <v-col cols="12" sm="8" md="6" class="pt-0" style="position: relative">
                    <router-link class="back-button pl-3 pt-2" to="/merch"><v-icon small>arrow_back_ios</v-icon></router-link>
                    <div class="primary amount-left mr-3 pl-8 pr-4 py-2 rounded-bl-lg white--text font-weight-bold" v-if="currentItem.quantity <= 15">{{currentItem.quantity}} left</div>
                    <v-carousel hide-delimiter-background height="50vh" :hide-delimiters="images.length <= 1" :show-arrows="images.length > 1">
                        <v-carousel-item v-for="(image, i) in images" :key="i" :src="image.image"></v-carousel-item>
                    </v-carousel>
                </v-col>
                <v-col cols="12" sm="8" md="6">
                    <h2>{{currentItem.name}}</h2>
                    <form @submit.prevent >
                        <h3 style="display: none">Info</h3>
                        <v-row class="mx-0 mt-2" justify="space-between" v-if="currentItem.options.length > 0">
                            <p class="subtitle-1">Options</p>
                            <div class="options">
                                <label class="options-label" v-for="(option, i) in currentItem.options" :key="i" :for="`${id}-${option.option}`"> 
                                    <input type="radio" class="options-radio" :id="`${id}-${option.option}`" name="options" :value="option.option" v-model="selectedOption" :disabled="option.quantity < 1" @change="handleSelectedOption"/>
                                    <span class="options-option">{{option.option}}</span>
                                </label>
                            </div>
                        </v-row>
                        <v-slide-y-transition>
                            <p class="error--text caption text-right" v-if="optionsError">{{optionsError}}</p>
                        </v-slide-y-transition>
                        <v-row class="mx-0 mt-2" justify="space-between">
                            <p class="subtitle-1">Quantity</p>
                            <div class="quantity">
                                <v-btn color="primary" depressed fab x-small @click="decrementQuantity" :disabled="orderQuantity <= 1"><v-icon small>remove</v-icon></v-btn>
                                <p class="mb-0 mt-1 mx-2">{{orderQuantity}}</p>
                                <v-btn color="primary" depressed fab x-small @click="incrementQuantity" :disabled="(orderQuantity + cartItemQuantity) >= maxQuantity"><v-icon small>add</v-icon></v-btn>
                            </div>
                        </v-row>
                        <v-row class="mx-0 mt-2" justify="space-between" v-if="currentItem.signable && currentEvent.signedAmount < currentEvent.signingAmount">
                            <p class="subtitle-1">Signed</p>
                            <v-switch v-model="signed" class="mt-0 mr-n3" color="primary" inset>
                                <template slot="label">
                                    <p style="display: none">label</p>
                                </template>
                            </v-switch>
                        </v-row>
                        <v-row class="mx-0 mt-2" justify="space-between" align="center">
                            <span class="subtitle-1 font-weight-bold mb-0">€{{currentItem.price}}</span>
                            <v-btn depressed class="primary" width="80%" max-width="350px" @click="handleAddToCart" :disabled="(orderQuantity + cartItemQuantity) > maxQuantity">Add to cart</v-btn>
                        </v-row>
                    </form>
                    <article class="mt-4">
                        <h3 style="display: none">Description</h3>
                        <p class="body-1">{{currentItem.description}}</p>
                    </article>
                </v-col>
            </v-row>
        </div>
    </section>
</template>

<script>
export default {
    props: {
        id: {
            required: true,
            type: String
        }
    },
    data() {
        return {
            optionsError: null,
            orderQuantity: 1,
            signed: false,
            selectedOption: null
        }
    },
    computed: {
        currentItem() {
            return this.$store.getters['merch/currentItem'];
        },
        currentEvent() {
            return this.$store.getters['events/currentEvent'];
        },
        cartItemQuantity() {
           return this.$store.getters['cart/getCartItemQuantity']({id: this.id, option: this.selectedOption});
        },
        maxQuantity() {
            if (this.currentItem.options.length > 0 && this.selectedOption) {
                const option = this.currentItem.options.find(option => option.option === this.selectedOption);
                return option.quantity;
            } else {
                return this.currentItem.quantity;
            }
        },
        images() {
            return this.currentItem.images;
        },
        loading() {
            return this.$store.getters['merch/loading'];
        },
        error() {
            return this.$store.getters['merch/error'];
        }
    },
    methods: {
        decrementQuantity() {
            this.optionsError = null;
            if (this.currentItem.options.length > 0 && !this.selectedOption) {
                this.optionsError = 'Please select an option';
                return;
            }
            if (this.orderQuantity > 1) this.orderQuantity--;
        },
        incrementQuantity() {
            this.optionsError = null;
            if (this.currentItem.options.length > 0 && !this.selectedOption) {
                this.optionsError = 'Please select an option';
                return;
            }
            if (this.orderQuantity < this.currentItem.quantity) this.orderQuantity++;
        },
        handleSelectedOption() {
            this.optionsError = null;
            const option = this.currentItem.options.find(option => option.option === this.selectedOption);
            if (option.quantity < this.orderQuantity) this.orderQuantity = option.quantity;
        },
        handleAddToCart() {
            this.optionsError = null;
            if (this.currentItem.options.length > 0 && !this.selectedOption) {
                this.optionsError = 'Please select an option';
                return;
            }
            this.$store.dispatch('cart/addToCart', {
                orderQuantity: this.orderQuantity,
                selectedOption: this.selectedOption,
                signed: this.signed,
                ...this.currentItem
            }); 
        }
    },
    mounted() {
        this.$store.dispatch('setLoadingComponent', false);
        this.$store.dispatch('merch/getMerchById', this.id);
        this.$store.dispatch('events/checkSignedAmount');
    }
}
</script>

<style scoped>
.back-button {
    position: absolute;
    z-index: 2;
    text-decoration: none;
}

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

.quantity {
    display: flex;
}
</style>
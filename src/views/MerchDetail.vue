<template>
    <div v-if="loading" class="mx-auto" style="maxWidth: 600px">
        <v-skeleton-loader type="image"></v-skeleton-loader>
        <v-skeleton-loader type="text" class="mt-4"></v-skeleton-loader>
        <v-skeleton-loader type="paragraph" class="mt-4"></v-skeleton-loader>
        <v-skeleton-loader type="button" class="mt-4"></v-skeleton-loader>
        <v-skeleton-loader type="paragraph" class="mt-4"></v-skeleton-loader>
    </div>
    <section v-else-if="!loading && currentItem" class="mx-auto" style="maxWidth: 1100px">
        <v-row justify="center">
            <v-col cols="12" sm="8" md="6" class="pt-0" style="position: relative">
                <router-link class="back-button pl-3 pt-2" to="/merch"><v-icon small>arrow_back_ios</v-icon></router-link>
                <div class="primary amount-left mr-3 pl-8 pr-4 py-2 rounded-bl-lg white--text font-weight-bold" v-if="currentItem.quantity <= 15">{{currentItem.quantity}} left</div>
                <v-carousel hide-delimiter-background height="50vh">
                    <v-carousel-item v-for="(image, i) in images" :key="i" :src="image.image"></v-carousel-item>
                </v-carousel>
            </v-col>
            <v-col cols="12" sm="8" md="6">
                <h2>{{currentItem.name}}</h2>
                <form @submit.prevent >
                    <v-row class="mx-0 mt-2" justify="space-between" v-if="currentItem.options.length > 0">
                        <p class="subtitle-1">Options</p>
                        <div class="options">
                            <label class="options-label" v-for="(option, i) in currentItem.options" :key="i" :for="option"> 
                                <input type="radio" class="options-radio" :id="option" name="options" :value="option" :checked="i === 0"/>
                                <span class="options-option">{{option}}</span>
                            </label>
                        </div>
                    </v-row>
                    <v-row class="mx-0 mt-2" justify="space-between">
                        <p class="subtitle-1">Quantity</p>
                        <div class="quantity">
                            <v-btn color="primary" depressed fab x-small @click="decrementQuantity" :disabled="orderQuantity <= 1"><v-icon small>remove</v-icon></v-btn>
                            <p class="mb-0 mt-1 mx-2">{{orderQuantity}}</p>
                            <v-btn color="primary" depressed fab x-small @click="incrementQuantity" :disabled="orderQuantity >= currentItem.quantity"><v-icon small>add</v-icon></v-btn>
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
                        <v-btn depressed class="primary" width="80%" max-width="350px">Add to cart</v-btn>
                    </v-row>
                </form>
                <div class="mt-4">
                    <p class="body-1">{{currentItem.description}}</p>
                </div>
            </v-col>
        </v-row>
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
            orderQuantity: 1,
            signed: false,
        }
    },
    computed: {
        currentItem() {
            return this.$store.getters['merch/currentItem'];
        },
        currentEvent() {
            return this.$store.getters['events/currentEvent'];
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
            if (this.orderQuantity > 1) {
                this.orderQuantity--;
            }
        },
        incrementQuantity() {
            if (this.orderQuantity < this.currentItem.quantity) {
                this.orderQuantity++;
            }
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
    z-index: 99;
    text-decoration: none;
}

.amount-left {
    position: absolute;
    z-index: 99;
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
}

.options-radio:checked ~ span {
    background: #6fcf97;
    color: white;
}

.quantity {
    display: flex;
}
</style>
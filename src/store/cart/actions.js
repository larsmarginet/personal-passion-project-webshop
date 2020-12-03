import * as firebase from "../../firebase";

export default {
    setCart(ctx, payload) {
        ctx.commit('setCart', payload);
    },

    addToCart(ctx, payload) {
        const cart = ctx.getters.cart;
        const alreadyExists = cart.find(item => item.id === payload.id && item.selectedOption === payload.selectedOption);
        if (alreadyExists) {
            ctx.commit('updateCartItem', payload);
        } else {
            ctx.commit('addItemToCart', payload);
        }
    },

    deleteItem(ctx, payload) {
        ctx.commit('deleteItem', payload);
    },

    async placeMenuOrders(ctx, payload) {
        ctx.commit('setError', null);
        ctx.commit('setLoading', true);
        try {
            await firebase.eventsCollection.doc(ctx.rootGetters['events/currentEvent'].id).collection('venueOrders').add({
                eventId: ctx.rootGetters['events/currentEvent'].id,
                orders: payload,
                status: 'uncompleted'
            });
        } catch(error) {
            console.error(error);
            ctx.commit('setError', error);
        }
        ctx.commit('setLoading', false);
    },

    // async placeMerchOrders(ctx, payload) {
    //     // 
    // },

    clearError(ctx) {
        ctx.commit('setError', null);
    }
}
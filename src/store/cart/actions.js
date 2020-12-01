export default {
    addToCart(ctx, payload) {
        const cart = ctx.getters.cart;
        const alreadyExists = cart.find(item => item.id === payload.id && item.selectedOption === payload.selectedOption);
        if (alreadyExists) {
            ctx.commit('updateCartItem', payload);
        } else {
            ctx.commit('addItemToCart', payload);
        }
    }
}
export default {
    addItemToCart(state, payload) {
        state.cart.push(payload);
        console.log(state.cart)
    },
    updateCartItem(state, payload) {
        const cartItem = state.cart.find(item => item.id === payload.id);
        cartItem.orderQuantity += payload.orderQuantity;
        console.log(state.cart)
    }
}
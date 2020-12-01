export default {
    addItemToCart(state, payload) {
        state.cart.push(payload);
    },
    updateCartItem(state, payload) {
        const cartItem = state.cart.find(item => item.id === payload.id && item.selectedOption === payload.selectedOption);
        cartItem.orderQuantity += payload.orderQuantity;
    }
}
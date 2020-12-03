export default {
    setCart(state, payload) {
        state.cart = payload;
    },

    addItemToCart(state, payload) {
        state.cart.push(payload);
        window.localStorage.setItem('cart', JSON.stringify(state.cart));
    },

    updateCartItem(state, payload) {
        const cartItem = state.cart.find(item => item.id === payload.id && item.selectedOption === payload.selectedOption);
        cartItem.orderQuantity += payload.orderQuantity;
        window.localStorage.setItem('cart', JSON.stringify(state.cart));
    },

    deleteItem(state, payload) {
        const index = state.cart.findIndex(item => item.id === payload.id && item.selectedOption === payload.option);
        state.cart.splice(index, 1);
        window.localStorage.setItem('cart', JSON.stringify(state.cart));
    },

    setLoading(state, payload) {
        state.loading = payload;
    },

    setError(state, payload) {
        state.error = payload;
    }
}
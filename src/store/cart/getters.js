export default {
    cart(state) {
        return state.cart;
    },
    getCartItemQuantity: (state) => ({id, option}) => {
        const cartItem = state.cart.find(item => item.id === id && item.selectedOption === option);
        return cartItem ? cartItem.orderQuantity : 0;
    },
    totalCartAmount(state) {
        return state.cart ? state.cart.length : 0;
    },
    error(state) {
        return state.error;
    },
    loading(state) {
        return state.loading;
    }
}
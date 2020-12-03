export default {
    cart(state) {
        return state.cart;
    },
    getCartItemQuantity: (state) => ({id, option}) => {
        const cartItem = state.cart.find(item => item.id === id && item.selectedOption === option);
        return cartItem ? cartItem.orderQuantity : 0;
    },
    totalCartAmount(state) {
        return state.cart.length;
    },
    error(state) {
        return state.error;
    },
    loading(state) {
        return state.loading;
    }
}
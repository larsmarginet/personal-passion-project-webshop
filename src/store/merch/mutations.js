export default {
    setError(state, payload) {
        state.error = payload;
    },
    setLoading(state, payload) {
        state.loading = payload;
    },
    setMerch(state, payload) {
        state.merch = payload;
    },
    setCurrentItem(state, payload) {
        state.currentItem = payload;
    }
}
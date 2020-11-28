export default {
    setCurrentTime(state, payload) {
        state.currentTime = payload;
    },
    setCurrentEvent(state, payload) {
        state.currentEvent = payload;
        window.localStorage.setItem('event', payload)
    },
    setBubble(state, payload) {
        state.bubble = payload;
    }
}
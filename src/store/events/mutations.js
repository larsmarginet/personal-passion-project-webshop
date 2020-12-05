export default {
    setCurrentTime(state, payload) {
        state.currentTime = payload;
    },
    setError(state, payload) {
        state.error = payload;
    },
    setCurrentSong(state, payload) {
        state.currentSong = payload;
    },
    async setCurrentEvent(state, payload) {
        state.currentEvent = payload;
        await window.localStorage.setItem('event', JSON.stringify(payload));
    },
    async setBubble(state, payload) {
        state.bubble = payload;
        await window.localStorage.setItem('bubble', JSON.stringify(payload));
    },
    async setRoomId(state, payload) {
        state.roomId = payload;
        await window.localStorage.setItem('roomId', JSON.stringify(payload));
    }
}
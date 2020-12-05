import * as firebase from '../../firebase';
import router from '../../router/index';

export default {
    async loadEvents(ctx, payload) {
        const currentTime = (new Date()).getTime();
        ctx.commit('setCurrentTime', currentTime);
        try {
            const result = await firebase.eventsCollection.where('roomId', '==', payload).where('end', '>=', currentTime).get();
            if (!result.empty) {
                result.forEach(event => {
                    const fetchedEvent = event.data();
                    fetchedEvent.id = event.id;
                    if (fetchedEvent.start <= currentTime) {
                        ctx.commit('setCurrentEvent', fetchedEvent);
                    } else {
                        ctx.commit('setCurrentEvent', null);
                        router.replace('/noEvent');
                    }
                });
            } else {
                router.replace('/noEvent');
            }
        } catch (error) {
            console.error(error);
            ctx.commit('setCurrentEvent', null);
            router.replace('/noEvent');
        }
    },

    async loadCurrentSong(ctx) {
        ctx.commit('setError', null);
        try {
            await firebase.eventsCollection.doc(ctx.getters.currentEvent.id).onSnapshot(snapshot => {
                const event = snapshot.data();
                ctx.commit('setCurrentSong', event.currentSong);
            })
        } catch (error) {
            ctx.commit('setError', error);
        }
    },

    async checkSignedAmount(ctx) {
        try {
            await firebase.eventsCollection.doc(ctx.getters.currentEvent.id).onSnapshot(snapshot => {
                const event = snapshot.data();
                event.id = snapshot.id;
                ctx.commit('setCurrentEvent', event);
            });
        } catch (error) {   
            console.error(error);
        }
    },

    async checkEventExperation(ctx) {
        const currentEvent = await JSON.parse(window.localStorage.getItem('event'));
        if (currentEvent && currentEvent.end < (new Date().getTime())) {
            ctx.dispatch('clearAll');
            return;
        }
        const checkExperationInterval = setInterval(() => {
            if (currentEvent && currentEvent.end < (new Date().getTime())) {
                ctx.dispatch('clearAll');
                clearInterval(checkExperationInterval); 
            }
        }, 15000);
    },

    clearAll(ctx) {
        ctx.commit('setCurrentEvent', null);
        ctx.commit('setBubble', null);
        ctx.commit('setRoomId', null);
        window.localStorage.setItem('cart', JSON.stringify([]));
        router.replace('/eventOver');
    }
}
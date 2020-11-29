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
                        ctx.commit('setCurrentEvent', event.data());
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
        router.replace('/eventOver');
    }
}
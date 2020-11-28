import * as firebase from '../../firebase';
import router from '../../router/index';

export default {
    async loadEvents(ctx, payload) {
        const currentTime = (new Date()).getTime();
        ctx.commit('setCurrentTime', currentTime);
        try {
            const result = await firebase.eventsCollection.where('roomId', '==', payload).where('start', '<=', currentTime).orderBy('start', 'asc').limit(1).get();
            if (!result.empty) {
                result.forEach(event => {
                    const fetchedEvent = event.data();
                    if (fetchedEvent.end >= currentTime) {
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
        const checkExperationInterval = setInterval(() => {
            if (currentEvent && currentEvent.end < (new Date().getTime())) {
                ctx.commit('setCurrentEvent', null);
                ctx.commit('setBubble', null);
                ctx.commit('setRoomId', null);
                clearInterval(checkExperationInterval);
                router.replace('/eventOver');
            }
        }, 15000);
    }
}
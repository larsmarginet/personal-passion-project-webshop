import * as firebase from '../../firebase';

export default {
    async loadEvents(ctx, payload) {
        const currentTime = (new Date()).getTime() + 100000;
        ctx.commit('setCurrentTime', currentTime);
        try {
            const result = await firebase.eventsCollection.where('roomId', '==', payload).where('start', '<=', currentTime).orderBy('start', 'asc').limit(1).get();
            if (result) {
                result.forEach(event => {
                    const fetchedEvent = event.data();
                    if (fetchedEvent.end >= currentTime) {
                        ctx.commit('setCurrentEvent', event.data());
                    } else {
                        ctx.commit('setCurrentEvent', null)
                    }
                });
            }
        } catch (error) {
            console.error(error);
            ctx.commit('setCurrentEvent', null);
        }
    }
}
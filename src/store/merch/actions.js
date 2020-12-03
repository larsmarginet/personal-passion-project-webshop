import * as firebase from '../../firebase';

export default {
    async loadMerch(ctx) {
        ctx.commit('setLoading', true);
        ctx.commit('setError', null);
        try {
            await firebase.eventsCollection.doc(ctx.rootGetters['events/currentEvent'].id).collection('merch').onSnapshot(snapshot => {
                let merch = [];
                snapshot.forEach(item => {
                    const merchItem = item.data();
                    merchItem.id = item.id;
                    merchItem.price = (Math.round(merchItem.price * 100) / 100).toFixed(2);
                    merch.push(merchItem);
                });
                ctx.commit('setMerch', merch);
            })
        } catch (error) {
            ctx.commit('setError', error);
        }
        ctx.commit('setLoading', false);
    },

    async getMerchById(ctx, payload) {
        ctx.commit('setLoading', true);
        ctx.commit('setError', null);
        try {
            await firebase.eventsCollection.doc(ctx.rootGetters['events/currentEvent'].id).collection('merch').doc(payload).onSnapshot(async snapshot => {
                const currentMerch = snapshot.data();
                currentMerch.id = snapshot.id;
                currentMerch.images = [];
                // fetch images
                const result = await firebase.eventsCollection.doc(ctx.rootGetters['events/currentEvent'].id).collection('merch').doc(payload).collection('images').orderBy('pos', 'asc').get();
                result.forEach(img => currentMerch.images.push(img.data()));
                ctx.commit('setCurrentItem', currentMerch);
            });
        } catch (error) {
            ctx.commit('setError', error);
        }
        ctx.commit('setLoading', false);
    },

    clearError(ctx) {
        ctx.commit('setError', null);
    }
}
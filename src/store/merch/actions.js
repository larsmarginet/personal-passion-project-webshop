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
            await firebase.eventsCollection.doc(ctx.rootGetters['events/currentEvent'].id).collection('merch').doc(payload).onSnapshot(snapshot => {
                console.log(snapshot.data());
            })
        } catch (error) {
            ctx.commit('setError', error);
        }
        ctx.commit('setLoading', false);
    }
}
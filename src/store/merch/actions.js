import * as firebase from '../../firebase';

export default {
    async loadMerch(ctx) {
        ctx.commit('setError', null);
        ctx.commit('setLoading', true);
        try {
            // wont work, check for all merch id's in event! --> loop
            const result = await firebase.merchCollection.where('bandId', '==', ctx.rootGetters['events/currentEvent'].bandId).get();
            const merch = [];
            result.forEach(item => {
                const merchItem = item.data();
                merchItem.id = item.id;
                merchItem.quantity = 0;
                merch.push(merchItem);
            });
            ctx.commit('setMerch', merch);
        } catch (error) {
            ctx.commit('setError', error);
        }
        ctx.commit('setLoading', false);
    }
}
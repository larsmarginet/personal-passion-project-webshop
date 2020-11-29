import * as firebase from '../../firebase';

export default {
    async loadMenu(ctx) {
        ctx.commit('setError', null);
        ctx.commit('setLoading', true);
        try {
            const result = await firebase.menuCollection.where('venueId', '==', ctx.rootGetters['events/currentEvent'].venueId).where('active', '==', true).get();
            const menu = [];
            result.forEach(item => {
                const drink = item.data();
                drink.id = item.id;
                drink.quantity = 0;
                menu.push(drink);
            });
            ctx.commit('setMenu', menu);
        } catch (error) {
            ctx.commit('setError', error);
        }
        ctx.commit('setLoading', false);
    }
}
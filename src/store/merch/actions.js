import * as firebase from '../../firebase';

export default {
    async loadMerch(ctx) {
        ctx.commit('setLoading', true);
        ctx.commit('setError', null);
        try {
            const currentTime = (new Date()).getTime();
            // listen to updates on the event (because the stock for the event changes in the event collection, not the merch collection)
            await firebase.eventsCollection.where('roomId', '==', ctx.rootGetters['events/roomId']).where('end', '>=', currentTime).onSnapshot(snapshot => {
                snapshot.forEach(async event => {
                    const fetchedEvent = event.data();
                    if (fetchedEvent.start <= currentTime) {
                        const merch = [];
                        await Promise.all(fetchedEvent.merch.map(async item => {
                            if (item.quantity > 0) {
                                let merchItem;
                                const result = await firebase.merchCollection.doc(item.id).get();
                                merchItem = result.data();
                                merchItem.id = result.id;
                                merchItem.stock = item.quantity;
                                merchItem.price = (Math.round(merchItem.price * 100) / 100).toFixed(2);
                                const image = await firebase.merchCollection.doc(item.id).collection('images').where('pos', '==', 0).get();
                                image.forEach(img => merchItem.image = img.data());
                                merch.push(merchItem);
                            }
                        }));
                        ctx.commit('setMerch', merch);
                    }
                })
            });
        } catch (error) {
            ctx.commit('setError', error);
        }
        ctx.commit('setLoading', false);
    },
}
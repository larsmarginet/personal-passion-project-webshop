import * as firebase from "../../firebase";

export default {
    setCart(ctx, payload) {
        ctx.commit('setCart', payload);
    },

    addToCart(ctx, payload) {
        const cart = ctx.getters.cart;
        const alreadyExists = cart.find(item => item.id === payload.id && item.selectedOption === payload.selectedOption);
        if (alreadyExists) {
            ctx.commit('updateCartItem', payload);
        } else {
            ctx.commit('addItemToCart', payload);
        }
    },

    deleteItem(ctx, payload) {
        ctx.commit('deleteItem', payload);
    },

    async placeMenuOrders(ctx, payload) {
        ctx.commit('setError', null);
        ctx.commit('setLoading', true);
        try {
            await firebase.eventsCollection.doc(ctx.rootGetters['events/currentEvent'].id).collection('venueOrders').add({
                eventId: ctx.rootGetters['events/currentEvent'].id,
                orders: payload,
                created: (new Date()).getTime(),
                bubble: ctx.rootGetters['events/bubble'],
                status: 'uncompleted'
            });
        } catch(error) {
            ctx.commit('setError', error);
        }
        ctx.commit('setLoading', false);
    },

    async placeMerchOrders(ctx, payload) {
        ctx.commit('setError', null);
        ctx.commit('setLoading', true);
        try {
            const orders = [];
            let signed = false;
            payload.forEach(order => {
                // as soon as one order needs to be signed, signed will be true
                if (!signed) signed = order.signed;
                orders.push({
                    id: order.id,
                    quantity: order.orderQuantity,
                    name: order.name,
                    image: order.image.image,
                    option: order.selectedOption,
                    category: order.category,
                    price: parseFloat(order.price),
                    signed: order.signed
                });
            });

            // step 1: push order
            await firebase.eventsCollection.doc(ctx.rootGetters['events/currentEvent'].id).collection('bandOrders').add({
                eventId: ctx.rootGetters['events/currentEvent'].id,
                orders,
                signed,
                created: (new Date()).getTime(),
                bubble: ctx.rootGetters['events/bubble'],
                status: 'uncompleted',
            });

             // step 2: update signedAmount if necessary
            if (signed) {
                let amount = 0;
                orders.forEach(order => order.signed ? amount += order.quantity : amount += 0);
                const result = await firebase.eventsCollection.doc(ctx.rootGetters['events/currentEvent'].id).get();
                const currentEvent = result.data();
                await firebase.eventsCollection.doc(ctx.rootGetters['events/currentEvent'].id).update({
                    signedAmount: currentEvent.signedAmount + amount
                });
            }
            
            // step 3: decrement stock for items in event (+ if there are options: option stock)
            // step 3.1: decrement stock && qty in current event
            // I could write this block in the else statement in step 3.2, but I'm not doing this, 
            // because the update for this event has absolute priority over the other events
            // (user are engaging with this data at the moment, while other events wont be touched for many hours or days)
            await firebase.db.runTransaction(async (transaction) => {
                orders.forEach(async order => {
                    const result = await transaction.get(firebase.eventsCollection.doc(ctx.rootGetters['events/currentEvent'].id).collection('merch').doc(order.id));
                    const item = result.data();
                    const options = item.options;
                    if (order.option) {
                        const index = item.options.findIndex(option => option.option === order.option);
                        options[index].stock = options[index].stock - order.quantity;
                        options[index].quantity = options[index].quantity - order.quantity;
                    }
                    await firebase.eventsCollection.doc(ctx.rootGetters['events/currentEvent'].id).collection('merch').doc(order.id).update({
                        quantity: item.quantity - order.quantity,
                        stock: item.stock - order.quantity,
                        options
                    });
                });
            });

            //step 3.2. decrement stock (&& set qty to stock IF qty > new stock)
            await firebase.db.runTransaction(async (transaction) => {
                payload.forEach(async order => {
                    const events = await firebase.eventsCollection.where('bandId', '==', order.bandId).get();
                    events.forEach(async event => {
                        if (event.id !== ctx.rootGetters['events/currentEvent'].id) {
                            const result = await transaction.get(firebase.eventsCollection.doc(event.id).collection('merch').doc(order.id));
                            if (result.exists) {
                                const item = result.data();
                                const options = item.options;
                                if (order.selectedOption) {
                                    const index = item.options.findIndex(option => option.option === order.selectedOption);
                                    options[index].stock = options[index].stock - order.orderQuantity;
                                    if (options[index].quantity + order.orderQuantity >= options[index].stock) options[index].quantity = options[index].stock;
                                }
                                const stock = item.stock - order.orderQuantity;
                                let quantity = item.quantity;
                                if (quantity + order.orderQuantity >= stock) quantity = stock;
                                await firebase.eventsCollection.doc(event.id).collection('merch').doc(order.id).update({
                                    quantity,
                                    stock,
                                    options
                                });
                            }
                        }
                    });
                });
            });

            // step 4: decrement general stock
            await firebase.db.runTransaction(async (transaction) => {
                orders.forEach(async order => {
                    const result = await transaction.get(firebase.merchCollection.doc(order.id));
                    const item = result.data();
                    const options = item.options;
                    if (order.option) {
                        const index = item.options.findIndex(option => option.option === order.option);
                        options[index].stock = options[index].stock - order.quantity;
                    }
                    await firebase.merchCollection.doc(order.id).update({
                        stock: item.stock - order.quantity,
                        options
                    });
                });
            });
            ctx.commit('setCart', []);
            window.localStorage.setItem('cart', JSON.stringify([]));
        } catch(error) {
            ctx.commit('setError', error);
        }
        ctx.commit('setLoading', false);
    },

    clearError(ctx) {
        ctx.commit('setError', null);
    }
}
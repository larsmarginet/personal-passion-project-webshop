import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default {
    namespaced: true,
    state: {
        cart: [],
        error: null,
        loading: false,
    },
    mutations,
    actions,
    getters
}
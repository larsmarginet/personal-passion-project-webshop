import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default {
    namespaced: true,
    state: {
        currentTime: null,
        currentEvent: null,
        bubble: null,
    },
    mutations,
    actions,
    getters
}
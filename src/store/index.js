import Vue from 'vue';
import Vuex from 'vuex';
import events from './events/index';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadingComponent: false,
  },
  mutations: {
    setLoadingComponent(state, payload) {
      state.loadingComponent = payload;
    }
  },
  actions: {
    setLoadingComponent(ctx, payload) {
      ctx.commit('setLoadingComponent', payload);
    }
  },
  getters: {
    loadingComponent(state) {
      return state.loadingComponent;
    }
  },
  modules: {
    events
  }
})

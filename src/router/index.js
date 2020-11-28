import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/band'
  },
]

const router = new VueRouter({
    mode: "history",
    routes
});

router.beforeEach((to, _, next) => {
    store.dispatch('setLoadingComponent', true);
    // const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
    // const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
    // setMetaData(nearestWithTitle, nearestWithMeta);
    if (to.query.bubble && to.query.roomId) {
        const {bubble, roomId} = to.query;
        window.localStorage.setItem("bubble", bubble);
        window.localStorage.setItem("roomId", roomId);
        store.dispatch('events/loadEvents', roomId);
        store.commit('events/setBubble', bubble);
        next();
    } else if (store.getters['events/currentEvent'] && store.getters['events/bubble']) {
        next();
    } else if (window.localStorage.getItem("bubble") && window.localStorage.getItem("event")) {
        store.commit('events/setBubble', window.localStorage.getItem("bubble"));
        store.commit('events/setCurrentEvent', window.localStorage.getItem("event"));
        next();
    } else if (window.localStorage.getItem("bubble") && window.localStorage.getItem("roomId")) {
        store.commit('events/setBubble', window.localStorage.getItem("bubble"));
        store.dispatch('events/loadEvents', window.localStorage.getItem("roomId"));
        next();
    } else {
        next('/noEvent')
    } 
});

// const setMetaData = (title, meta) =>  {
//   if(title) document.title = `concery - ${title.meta.title}`;
//   // remove existing meta tags
//   Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));
//   if(meta) {
//     meta.meta.metaTags.map(tagDef => {
//       const tag = document.createElement('meta');
//       Object.keys(tagDef).forEach(key => {
//         tag.setAttribute(key, tagDef[key]);
//       });
//       tag.setAttribute('data-vue-router-controlled', '');
//       return tag;
//     }).forEach(tag => document.head.appendChild(tag));
//   }
// }

export default router;

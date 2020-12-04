import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/index';
import * as metaData from '../helpers/metaData';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { 
      title: metaData.home.title,
      description: metaData.home.description,
      requiresAuth: true 
    },
    component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue')
  },
  {
    path: '/home',
    redirect: '/'
  },
  {
    path: '/menu',
    name: 'Menu',
    meta: {
      title: metaData.menu.title,
      description: metaData.menu.description,
      requiresAuth: true 
    },
    component: () => import(/* webpackChunkName: "Menu" */ '../views/Menu.vue')
  },
  {
    path: '/merch',
    name: 'Merch',
    meta: {
      title: metaData.merch.title,
      description: metaData.merch.description,
      requiresAuth: true 
    },
    component: () => import(/* webpackChunkName: "Merch" */ '../views/Merch.vue')
  },
  {
    path: '/merch/cart',
    name: 'MerchCart',
    meta: {
      title: metaData.cart.title,
      description: metaData.cart.description,
      requiresAuth: true 
    },
    component: () => import(/* webpackChunkName: "MerchCart" */ '../views/MerchCart.vue')
  },
  {
    path: '/merch/:id',
    name: 'MerchDetail',
    props: true,
    meta: {
      title: metaData.merch.title,
      description: metaData.merch.description,
      requiresAuth: true 
    },
    component: () => import(/* webpackChunkName: "MerchDetail" */ '../views/MerchDetail.vue')
  },
  {
    path: '/noEvent',
    name: 'NoEvent',
    meta: {
      title: metaData.noEvent.title,
      description: metaData.noEvent.description,
    },
    component: () => import(/* webpackChunkName: "NoEvent" */ '../views/NoEvent.vue')
  },
  {
    path: '/eventOver',
    name: 'EventOver',
    meta: {
      title: metaData.eventOver.title,
      description: metaData.eventOver .description,
    },
    component: () => import(/* webpackChunkName: "EventOver" */ '../views/EventOver.vue')
  },
  {
    path: '*',
    meta: {
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "NotFound" */ '../views/NotFound.vue'),
  }
]

const router = new VueRouter({
    mode: "history",
    routes
});

router.beforeEach(async (to, _, next) => {
    store.dispatch('setLoadingComponent', true);
    const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
    const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
    const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
    setMetaData(nearestWithTitle, nearestWithMeta);
    if (requiresAuth) {
      if (to.query.bubble && to.query.roomId) {
            const { bubble, roomId } = to.query;
            window.localStorage.setItem('cart', JSON.stringify([]));
            store.dispatch('events/loadEvents', roomId);
            store.commit('events/setBubble', bubble);
            store.commit('events/setRoomId', roomId);
            next();
        } else if (store.getters['events/currentEvent'] && store.getters['events/bubble']) {
            next();
        } else if (await JSON.parse(window.localStorage.getItem("bubble")) !== null && await JSON.parse(window.localStorage.getItem("event") !== null)) {
            store.commit('events/setBubble', await JSON.parse(window.localStorage.getItem("bubble")));
            store.commit('events/setCurrentEvent', await JSON.parse(window.localStorage.getItem("event")));
            store.commit('events/setRoomId', await JSON.parse(window.localStorage.getItem("roomId")));
            next();
        } else if (await JSON.parse(window.localStorage.getItem("bubble")) !== null && await JSON.parse(window.localStorage.getItem("roomId") !== null)) {
            store.commit('events/setBubble', await JSON.parse(window.localStorage.getItem("bubble")));
            store.dispatch('events/loadEvents', await JSON.parse(window.localStorage.getItem("roomId")));
            next();
        } else {
            next('/noEvent');
        } 
    } else {
        next();
    }
});

const setMetaData = (title, meta) =>  {
  if(title) document.title = `concery - ${title.meta.title}`;
  // remove existing meta tags
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));
  if(meta) {
    meta.meta.metaTags.map(tagDef => {
      const tag = document.createElement('meta');
      Object.keys(tagDef).forEach(key => {
        tag.setAttribute(key, tagDef[key]);
      });
      tag.setAttribute('data-vue-router-controlled', '');
      return tag;
    }).forEach(tag => document.head.appendChild(tag));
  }
}

export default router;

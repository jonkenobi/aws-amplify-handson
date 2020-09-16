import Vue from 'vue';
import Router from 'vue-router';
import AI from '../AI.vue';
import Chat from '../Chat.vue';
import Analytics from '../Analytics.vue';
import WebPush from '../WebPush.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/ai',
      name: 'ai',
      component: AI
    },
    {
      path: '/chat',
      name: 'chat',
      component: Chat
    },
    {
      path: '/analytics',
      name: 'analytics',
      component: Analytics
    },
    {
      path: '/webpush',
      name: 'webpush',
      component: WebPush
    }
  ]
});

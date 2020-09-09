import Vue from 'vue';
import Router from 'vue-router';
import AI from '../components/AI.vue';
import Chat from '../components/Chat.vue';
import Analytics from '../components/Analytics.vue';
import WebPush from '../components/WebPush.vue';

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

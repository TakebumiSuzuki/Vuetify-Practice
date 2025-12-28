import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../components/AppMain.vue'),
  },
  {
    path: '/edit/:id',
    name: 'TicketEdit',
    component: () => import('../components/TicketEdit.vue'),
    props: true,
  },
  {
    path: '/:pathMatch(.*)*', // すべてのパスにマッチする正規表現
    name: 'NotFound',
    component: () => import('../components/NotFound.vue'), // 404用コンポーネントを用意
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});

import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/layout/web.vue'),
    children: [
        {
          path: '/',
          component: () => import('../views/home/index.vue'),
        },
        {
            path: '/demo',
            component: () => import('../views/demo/index.vue'),
        },
        {
            path: "*",
            name: '404',
            component: () => import('../views/404/index.vue'),
        }
    ]
  },
];

const router = new VueRouter({
//   mode: 'history',
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
    return next()
})

export default router;

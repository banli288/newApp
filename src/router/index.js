import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", redirect: "/home" },
  {
    path: "/home",
    component: () => import("@/views/home/index.vue"),
    meta: { showTabBar: true },
  },
  {
    path: "/message",
    component: () => import("@/views/message/index.vue"),
    meta: { showTabBar: true },
  },
  {
    path: "/cart",
    component: () => import("@/views/cart/index.vue"),
    meta: { showTabBar: true },
  },
  {
    path: "/user",
    component: () => import("@/views/user/index.vue"),
    meta: { showTabBar: true },
  },
  { path: "/login", component: () => import("@/views/login/index.vue") },
  { path: "/goods/:id", component: () => import("@/views/goods/index.vue") },
  { path: "/order", component: () => import("@/views/order/index.vue") },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

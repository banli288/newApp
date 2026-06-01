import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", redirect: "/home" },
  {
    path: "/home",
    component: () => import("@/views/home/index.vue"),
    meta: { showTabBar: true },
    children: [
      {
        path: "category",
        component: () => import("@/views/home/category/index.vue"),
      },
      {
        path: "follow",
        component: () => import("@/views/home/follow/index.vue"),
      },
      { path: "live", component: () => import("@/views/home/live/index.vue") },
      {
        path: "",
        component: () => import("@/views/home/recommend/index.vue"),
      },
    ],
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
  {
    path: "/card",
    component: () => import("@/views/card/index.vue"),
  },
  {
    path: "/category2",
    component: () => import("@/views/category2/index.vue"),
  },
  {
    path: "/allOrder",
    component: () => import("@/views/allOrder/index.vue"),
  },
  {
    path: "/orderPay",
    component: () => import("@/views/orderPay/index.vue"),
  },
  {
    path: "/unReceive",
    component: () => import("@/views/unReceive/index.vue"),
  },
  {
    path: "/receiveGoods",
    component: () => import("@/views/receiveGoods/index.vue"),
  },
  {
    path: "/evaluate",
    component: () => import("@/views/evaluate/index.vue"),
  },
  {
    path: "/set",
    component: () => import("@/views/set/index.vue"),
  },
  {
    path: "/collect",
    component: () => import("@/views/collect/index.vue"),
  },
  {
    path: "/address",
    component: () => import("@/views/address/index.vue"),
  },
  {
    path: "/edit",
    component: () => import("@/views/edit/index.vue"),
  },
  {
    path: "/close",
    component: () => import("@/views/close/index.vue"),
  },
  {
    path: "/chat",
    component: () => import("@/views/chat/index.vue"),
  },
  { path: "/login", component: () => import("@/views/login/index.vue") },
  { path: "/goods/:id", component: () => import("@/views/goods/index.vue") },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

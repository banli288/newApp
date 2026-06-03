import { createRouter, createWebHistory } from 'vue-router'
import BasicLayout from '../layout/BasicLayout.vue'

const routes = [
  {
    path: '/',
    component: BasicLayout,
    redirect: '/product',
    children: [
      {
        path: 'product',
        name: 'Product',
        component: () => import('../views/product/index.vue'),
        meta: { title: '商品管理', icon: 'ShoppingBag' },
      },
      {
        path: 'category',
        name: 'Category',
        component: () => import('../views/category/index.vue'),
        meta: { title: '分类管理', icon: 'Menu' },
      },
      {
        path: 'carousel',
        name: 'Carousel',
        component: () => import('../views/carousel/index.vue'),
        meta: { title: '轮播图管理', icon: 'Picture' },
      },
      {
        path: 'liveroom',
        name: 'LiveRoom',
        component: () => import('../views/liveroom/index.vue'),
        meta: { title: '直播间管理', icon: 'VideoCamera' },
      },
      {
        path: 'post',
        name: 'Post',
        component: () => import('../views/post/index.vue'),
        meta: { title: '帖子管理', icon: 'Document' },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

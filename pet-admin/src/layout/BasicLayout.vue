<template>
  <el-container style="height: 100vh">
    <el-aside width="240px" style="background-color: #304156">
      <div style="height: 60px; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 18px; font-weight: bold">
        宠物商城后台
      </div>
      <el-menu
        :default-active="route.path"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
        router
      >
        <el-menu-item v-for="item in menuItems" :key="item.path" :index="item.path">
          <el-icon><component :is="item.icon" /></el-icon>
          <template #title>{{ item.title }}</template>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="display: flex; align-items: center; border-bottom: 1px solid #eee; font-size: 18px; font-weight: 600">
        {{ currentTitle }}
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  ShoppingBag,
  Menu,
  Picture,
  VideoCamera,
  Document,
} from '@element-plus/icons-vue'

const route = useRoute()

const menuItems = [
  { path: '/product', title: '商品管理', icon: ShoppingBag },
  { path: '/category', title: '分类管理', icon: Menu },
  { path: '/carousel', title: '轮播图管理', icon: Picture },
  { path: '/liveroom', title: '直播间管理', icon: VideoCamera },
  { path: '/post', title: '帖子管理', icon: Document },
]

const currentTitle = computed(() => {
  const item = menuItems.find((m) => m.path === route.path)
  return item?.title || '后台管理'
})
</script>

<style scoped>
.el-menu {
  border-right: none;
}
</style>

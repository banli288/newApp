<template>
  <router-view />
  <TabBar v-if="$route.meta.showTabBar" :fixed="true" />
</template>

<script setup>
import TabBar from "@/components/TabBar.vue";
</script>

<style>
#app {
  padding-bottom: 50px; /* TabBar 的高度 */
}
:deep(.van-tabbar) {
  position: fixed !important;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>

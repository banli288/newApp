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
</style>
<template>
  <router-view />
  <TabBar v-if="$route.meta.showTabBar" />
</template>

<script setup>
import TabBar from "@/components/TabBar.vue";
</script>

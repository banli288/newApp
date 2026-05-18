<template>
  <div class="nav">
    <span
      v-for="(tab, index) in tabs"
      :key="index"
      @click="activeIndex = index"
      :class="{ active: activeIndex === index }"
    >
      {{ tab }}</span
    >
  </div>
</template>

<script setup>
import { ref } from "vue";
//导航栏
const tabs = ["直播", "关注", "分类", "推荐"];
const activeIndex = ref(3);
</script>

<style>
.nav {
  height: 50px;
  background-color: rgb(255 118 20);
  display: flex;
  align-items: center;
}
.nav span {
  flex: 1;
  text-align: center;
  color: #fff;
  padding: 8px 0;
  font-size: 20px;
  margin: 0 10px;
}
.nav span.active {
  color: rgb(226, 101, 12);
  background-color: rgb(255, 168, 105);
}
</style>

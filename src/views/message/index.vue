<template>
  <div class="nav">
    <p>消息</p>
  </div>
  <!-- //tab栏切换 -->
  <van-tabs v-model:active="active">
    <van-tab title="私信">私信</van-tab>
    <van-tab title="系统通知">系统通知</van-tab>
  </van-tabs>
</template>

<script setup>
import { ref } from "vue";

const active = ref(0);
</script>

<style>
.nav {
  font-size: 20px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(255 118 20);
}
.nav p {
  padding: 10px 0;
}
.van-tabs__line {
  color: rgb(226, 101, 12) !important;
  background-color: red;
}
</style>

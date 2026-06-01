<template>
  <van-tabbar
    v-model="active"
    active-color="#ff870f "
    :fixed="fixed"
    route
    height="100px"
    >>
    <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item to="/message" icon="apps-o">消息</van-tabbar-item>
    <van-tabbar-item to="/cart" icon="shopping-cart-o">购物车</van-tabbar-item>
    <van-tabbar-item to="/user" icon="user-o">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
  fixed: {
    type: Boolean,
    default: false,
  },
});
const active = ref(0);
</script>

<style>
.van-tabbar-item {
  padding: 20px 0;
}
</style>

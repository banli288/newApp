<template>
  <div class="nav">
    <p>购物车</p>
  </div>
  <div>
    <van-checkbox v-model="checked">复选框</van-checkbox>
  </div>
</template>

<script setup>
import { ref } from "vue";
const checked = ref(true);
</script>

<style scoped>
.nav {
  font-size: 20px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(255 118 20);
  color: aliceblue;
}
.nav p {
  padding: 10px 0;
}
</style>
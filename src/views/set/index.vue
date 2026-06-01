<template>
  <div class="set">
    <div class="nav">
      <div class="nav-left">
        <van-icon name="arrow-left" size="25px" @click="router.back()" />
        <p>设置</p>
      </div>
      <div class="nav-right">
        <van-icon name="ellipsis" size="25px" />
      </div>
    </div>
    <div class="cardList">
      <p class="title">账号与安全</p>
      <div class="card">
        <p>账号与安全</p>
        <van-icon name="arrow" />
      </div>
      <div class="card">
        <p>支付设置</p>
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="cardList">
      <p class="title">功能</p>
      <div class="card">
        <p>通用功能</p>
        <van-icon name="arrow" />
      </div>
      <div class="card">
        <p>消息通知</p>
        <van-icon name="arrow" />
      </div>
      <div class="card">
        <p>隐私设置</p>
        <van-icon name="arrow" />
      </div>
      <div class="card">
        <p>模式切换</p>
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="cardList">
      <p class="title">关于</p>
      <div class="card">
        <p>帮助与反馈</p>
        <van-icon name="arrow" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<style scoped>
.nav {
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  padding: 15px;
}
.nav p {
  font-size: 20px;
}
.nav-left {
  display: flex;
  align-items: center;
  gap: 15px;
}
.cardList {
  background-color: white;
}
.card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0;
  font-size: 17px;
}
.cardList {
  margin-bottom: 10px;
  padding: 10px 15px;
}
.title {
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 10px;
}
</style>

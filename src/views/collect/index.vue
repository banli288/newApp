<template>
  <div class="collect">
    <div class="order">
      <div class="order-left">
        <van-icon name="arrow-left" size="25px" @click="router.back()" />
        <div>我的收藏<span>(11)</span></div>
      </div>
      <div class="order-right">
        <van-icon name="search" size="25px" />
        <p>管理</p>
        <div><van-icon name="ellipsis" size="25px" /></div>
      </div>
    </div>
    <div class="orderCard">
      <div class="card">
        <div class="card-left">
          <img
            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
            alt=""
          />
          <div class="info">
            <p>多功能分装瓶</p>
            <p>宠物商家<van-icon name="arrow" /></p>
            <p>￥123</p>
          </div>
        </div>
        <div class="card-right">
          <p>123人收藏</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<style scoped>
.order {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background-color: white;
}

.order-left {
  font-size: 20px;
  gap: 10px;
}
.order-right {
  gap: 20px;
}
.order-right p {
  font-size: 18px;
}
.order-right div:first-child {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.order-left,
.order-right {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.orderCard {
  background-color: white;
  padding: 15px;
  margin-bottom: 15px;
}
.cardName {
  font-weight: 600;
}
.card {
  margin: 10px 0;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
.card-left {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}
.card-right {
  display: flex;
  height: 100px;
  align-items: flex-end;
}
.card img {
  width: 100px;
  height: 100px;
  border-radius: 10px;
}
.info p {
  margin-bottom: 10px;
}
.info p:first-child {
  font-weight: 600;
  font-size: 16px;
}
.info p:nth-child(2) {
  font-size: 13px;
  color: darkgrey;
}
.info p:last-child {
  font-weight: 500;
  font-size: 16px;
  color: #ff870f;
}
</style>

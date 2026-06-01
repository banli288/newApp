<template>
  <div>
    <div class="swipe-wrapper">
      <van-swipe :autoplay="3000" lazy-render>
        <van-swipe-item v-for="image in images" :key="image">
          <img :src="image" />
        </van-swipe-item>
      </van-swipe>
      <div class="overlay">
        <div class="over-left">
          <van-icon name="arrow-left" size="40px" />
        </div>
        <div class="over-right">
          <div><van-icon name="share-o" size="35px" /></div>
          <div><van-icon name="cart-o" size="35px" /></div>
          <div><van-icon name="more-o" size="35px" /></div>
        </div>
      </div>
    </div>
    <div class="priceIntroduce">
      <div class="price">
        <div class="price-left">
          <p>￥5999</p>
          <p>￥6999</p>
        </div>
        <div class="price-right">
          <p>已售50+</p>
        </div>
      </div>
      <div class="introduce">阿珂京东卡就是看见的凯撒大帝卡仕达大量的</div>
      <div class="service">
        <div class="service-left">
          <van-icon name="gold-coin-o" size="25px" />
          <p>极速退款 不支持7天无理由</p>
        </div>
        <div class="service-right">
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="service">
        <div class="service-left">
          <van-icon name="logistics" size="25px" />预计后天发货，最晚10天内发货
        </div>
        <div class="service-right">
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="service">
        <div class="service-left">
          <van-icon name="newspaper-o" size="25px" />动物性别 动物品种 免疫驱虫
          血统证书
        </div>
        <div class="service-right">
          <van-icon name="arrow" />
        </div>
      </div>
      <van-action-bar>
        <van-action-bar-icon icon="chat-o" text="客服" color="#ee0a24" />
        <van-action-bar-icon icon="shop-o" text="店铺" />
        <van-action-bar-icon icon="star" text="已收藏" color="#ff5000" />
        <van-action-bar-button type="warning" text="加入购物车" />
        <van-action-bar-button type="danger" text="立即购买" />
      </van-action-bar>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const images = ref([
  "https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg",
  "https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg",
]);
</script>

<style scoped>
.swipe-wrapper {
  position: relative;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  /* height: 100%; */
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  padding: 0 10px;
}
.over-left {
  background-color: darkgray;
  opacity: 0.8;
  border-radius: 10px;
}
.over-right {
  display: flex;
  gap: 10px;
}
.over-right div {
  background-color: darkgray;
  border-radius: 5px;
  opacity: 0.8;
}
.price {
  height: 70px;
  width: 100%;
  background-color: #ff7d32;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px 0;
}
.price-left {
  color: white;
  display: flex;
  align-items: center;
  gap: 10px;
  height: 100%;
}
.price-left p:first-child {
  font-size: 30px;
}
.price-left p:last-child {
  font-size: 25px;
  color: darkred;
  opacity: 0.5;
  text-decoration: line-through;
}
.price-right {
  font-size: 20px;
}
.introduce {
  background-color: white;
  padding: 15px 15px;
  display: flex;
  align-items: center;
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 10px;
}
.service {
  padding: 5px 15px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.service div {
  padding: 10px 0;
}
.service-left {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
}
</style>

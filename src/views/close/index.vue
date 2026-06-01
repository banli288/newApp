<template>
  <div class="close">
    <div class="nav">
      <van-icon name="arrow-left" size="25px" @click="router.back()" />
      <p>订单</p>
    </div>
    <div class="van-hairline--top"></div>
    <div class="address">
      <van-icon name="location-o" size="25px" color=" #ff8001" />
      <div class="info">
        <span>姓名</span>
        <span>12321323423</span>
        <p>湖南省湘潭市雨湖区硕大的卡德加卡德加</p>
      </div>
      <button>修改</button>
    </div>
    <div class="orderCard">
      <div class="cardName">宠物之家<van-icon name="arrow" /></div>
      <div class="card">
        <div class="card-left">
          <img
            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
            alt=""
          />
          <div class="info">
            <p>多功能分装瓶</p>
            <p>旅行分装瓶</p>
            <p>极速退款 不支持七天无理由退款</p>
          </div>
        </div>
        <div class="card-right">
          <p>￥123</p>
          <p>x1</p>
        </div>
      </div>
      <div class="pay">
        应付
        <span>￥123</span>
      </div>
      <div class="button">
        <button>联系商家</button>
      </div>
    </div>
    <div class="payWay">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-weixinzhifu"></use>
      </svg>
      <p>微信支付</p>
    </div>
    <div class="payWay">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zhifubaozhifu"></use>
      </svg>
      <p>支付宝</p>
    </div>
    <div class="payWay">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-huabei"></use>
      </svg>
      <p>花呗</p>
    </div>
    <div class="orderNumber">
      <p>订单编号:342342242424</p>
      <p>复制</p>
    </div>
    <div class="bottom">
      <p>￥123</p>
      <button>去支付</button>
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
  gap: 30px;
  padding: 15px;
}
.nav p {
  font-size: 20px;
}
.address {
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  margin-bottom: 10px;
}
.address button {
  background-color: #ffe3c6;
  color: #ff8001;
  padding: 6px;
  border: 0;
  border-radius: 4px;
}
.info {
  margin-left: 8px;
  font-size: 18px;
}
.info p {
  margin-top: 5px;
}
.address > .van-icon,
.address > button {
  flex-shrink: 0;
}
.info {
  flex: 1;
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
  flex-direction: column;
  align-items: flex-end;
}
.card-right p:first-child {
  font-weight: 600;
  margin-bottom: 10px;
}
.card-right p:last-child {
  color: darkgrey;
}
.card img {
  width: 100px;
  height: 100px;
  border-radius: 10px;
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
  font-size: 15px;
  color: #ff870f;
}

.pay {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 10px 0;
  font-size: 19px;
}
.pay span {
  color: red;
}
.button button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px #ff870f;
  padding: 8px;
  border-radius: 5px;
  background-color: rgb(255, 244, 228);
}
.icon {
  width: 35px;
  height: 35px;
}
.payWay {
  display: flex;
  align-items: center;
  justify-content: left;
  padding: 15px;
  background-color: white;
  margin-bottom: 5px;
}
.payWay p {
  font-size: 19px;
  margin-left: 15px;
}
.orderNumber {
  padding: 18px;
  background-color: white;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.bottom {
  background-color: white;
  bottom: 0;
  position: absolute;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: right;
  padding: 15px;
}
.bottom p {
  color: #ff8001;
  font-size: 30px;
}
.bottom button {
  background-color: #ffe3c6;
  border-radius: 10px;
  border: 0;
  padding: 15px;
  margin-left: 45px;
  font-size: 25px;
}
</style>

<template>
  <div class="orderPay">
    <div class="order">
      <div class="order-left">
        <van-icon name="arrow-left" @click="router.back()" />
        <van-search
          v-model="value"
          placeholder="搜索订单"
          @search="onSearch"
          @cancel="onCancel"
        />
      </div>
      <div class="order-right">
        <div>
          <van-icon name="apps-o" size="20px" />
          <p>管理</p>
        </div>
        <div><van-icon name="ellipsis" size="25px" /></div>
      </div>
    </div>
    <div class="all">
      <p>待付款</p>
      <van-divider style="border-color: #eee; margin: 1px" />
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
      <div class="state">请在29:59:59内完成付款</div>
      <div class="pay">
        实付款
        <span>￥123</span>
      </div>
      <div class="button">
        <div class="button-left">更多</div>
        <div class="button-right">
          <button>修改地址</button>
          <button>继续付款</button>
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
:deep(.van-search__content) {
  border: 2px solid #ff870f;
  border-radius: 20px;
}
:deep(.van-search) {
  background: none;
  width: 280px;
}
.order {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background-color: white;
}
.order-left,
.order-right {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.order-left {
  font-size: 25px;
}
.order-right {
  gap: 20px;
}
.order-right p {
  font-size: 13px;
}
.order-right div:first-child {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.all {
  padding: 0 15px;
  font-size: large;
  background-color: white;
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
  font-size: 13px;
  color: #ff870f;
}
.state {
  background-color: #f0f0f0;
  border-radius: 5px;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
}
.state-left,
.state-right {
  display: flex;
  align-items: center;
  gap: 5px;
}
.state-left {
  font-weight: 600;
}
.state-right {
  color: rgb(141, 141, 141);
}
.pay {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 10px 0;
}
.button {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.button-right button {
  margin-left: 10px;
  border: 0;
  padding: 8px;
  border-radius: 5px;
  font-size: small;
}
.button-right button:last-child {
  background-color: #ffe3c6;
  color: #ff8001;
  font-weight: 600;
}
</style>

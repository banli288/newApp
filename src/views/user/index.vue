<template>
  <div class="login">
    <div class="userBack">
      <div class="userImage">
        <img src="https://picsum.photos/id/64/200/200" alt="avatar" />
      </div>
      <div class="userMessage">
        <p>{{ userMessage.name }}</p>
        <p>id:{{ userMessage.balance }}</p>
      </div>
    </div>
    <div class="userOrder">
      <div class="order1" @click="router.push('/allOrder')">
        <span>订单</span>
        <span>全部订单<van-icon name="arrow" /></span>
      </div>
      <div class="order2">
        <div @click="router.push('/orderPay')">
          <van-icon name="pending-payment" color="#fb6500" size="30" />
          <p>待付款</p>
        </div>
        <div @click="router.push('/unReceive')">
          <van-icon name="send-gift-o" color="#f8881e" size="30" />
          <p>待收货</p>
        </div>
        <div @click="router.push('/receiveGoods')">
          <van-icon name="gift-card-o" color="#fea82f" size="30" />
          <p>已收货</p>
        </div>
        <div @click="router.push('/evaluate')">
          <van-icon name="star-o" color="#fed72d" size="30" />
          <p>评价</p>
        </div>
      </div>
      <div class="order3">
        <div @click="router.push('/collect')">
          <van-icon name="like" color="#fb6500" size="25" />
          <p>我的收藏</p>
        </div>
        <div><van-icon name="arrow" /></div>
      </div>
      <div class="order3">
        <div @click="router.push('/address')">
          <van-icon name="location" color="#fb6500" size="25" />
          <p>收货地址</p>
        </div>
        <div><van-icon name="arrow" /></div>
      </div>
      <div class="order3">
        <div @click="router.push('/set')">
          <van-icon name="setting" color="#fb6500" size="25" />
          <p>设置</p>
        </div>
        <div><van-icon name="arrow" /></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { getUserInfo } from "../../api/user";
import { onMounted, ref } from "vue";

const router = useRouter();
const userMessage = ref({});
onMounted(async () => {
  userMessage.value = await getUserInfo();
});
</script>

<style scoped>
.userBack {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 380px;
  background: linear-gradient(50deg, #f7be15, #fb6500);
}
.userImage {
  background-color: white;
  width: 120px;
  height: 120px;
  border-radius: 50px;
  overflow: hidden;
}
.userImage img {
  border-radius: 50px;
  padding: 5px;
}
.userMessage {
  color: white;
}
.order1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 20px;
  background-color: white;
  margin: 10px 0;
}
.order1 span:first-child {
  font-weight: 600;
  font-size: larger;
}
.order1 span:last-child {
  color: #fb6500;
}
.order2 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 15px;
  background-color: white;
  margin-bottom: 10px;
}
.order2 div {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.order3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  margin-bottom: 10px;
  padding: 15px 15px;
}
.order3 p {
  margin-left: 15px;
  font-size: larger;
}
.order3 div:first-child {
  display: flex;
  align-items: center;
}
</style>

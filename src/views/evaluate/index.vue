<template>
  <div class="evaluate">
    <div class="order">
      <div class="order-left">
        <van-icon name="arrow-left" size="20px" @click="router.back()" />
        <span>评价</span>
      </div>
      <div class="order-right">
        <div>
          <!-- <van-icon name="ellipsis" size="25px" /> -->
          <van-icon name="ellipsis" size="25px" @click="showPopup" />
          <van-popup
            v-model:show="showTop"
            position="bottom"
            :style="{ height: '30%' }"
          >
            <div
              class="content"
              style="
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 20px;
                padding: 20px;
              "
            >
              <div
                class="logo"
                v-for="item in iconList"
                :key="item.id"
                @click="router.push(item.path)"
              >
                <div class="bg">
                  <van-icon :name="item.icon" size="30px"></van-icon>
                </div>
                {{ item.name }}
              </div>
              <div></div>
            </div>
          </van-popup>
        </div>
      </div>
    </div>
    <div class="userTitle">
      <div>
        <img
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
          alt=""
        />
      </div>
      <van-divider vertical :style="{ borderColor: '#ff870f' }" />
      <div><span>待评价</span><span>5</span></div>
      <van-divider vertical :style="{ borderColor: '#ff870f' }" />
      <div><span>已评价</span><span>7</span></div>
    </div>
    <div class="evt">
      <van-tabs v-model:active="active">
        <van-tab title="待评价">
          <div class="evt-card">
            <div class="cardName">宠物之家</div>
            <div class="card">
              <div class="card-left">
                <img
                  src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
                  alt=""
                />
                <div class="info">
                  <p>多功能分装瓶</p>
                  <p>旅行分装瓶</p>
                </div>
              </div>
              <div class="card-right">
                <button>去评价</button>
              </div>
            </div>
            <div class="state">五星评价</div>
          </div>
        </van-tab>
        <van-tab title="已评价">
          <div class="evaluateCard">
            <div class="had-evaluate">
              <p>4月5日</p>
              <p>
                评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价
              </p>
            </div>
            <div class="message">
              <div class="message-left">
                <img
                  src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
                  alt=""
                />
              </div>
              <div class="message-right">
                <p>
                  旅行111111111111111111111111111111111111111111111111分装瓶旅行分装瓶旅行分装瓶旅行分装瓶旅行分装瓶旅行分装瓶
                </p>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
      <!-- <p>待评价</p>
      <p>已评价</p> -->
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
const router = useRouter();

const showTop = ref(false);
const showPopup = () => {
  showTop.value = true;
};

const iconList = [
  {
    id: 1,
    icon: "chat-o",
    name: "消息",
    path: "/message",
  },
  {
    id: 2,
    icon: "wap-home-o",
    name: "回到首页",
    path: "/home",
  },
  {
    id: 3,
    icon: "smile-o",
    name: "我的淘宝",
    path: "/user",
  },
  {
    id: 4,
    icon: "cart-o",
    name: "购物车",
    path: "/cart",
  },
  {
    id: 5,
    icon: "notes-o",
    name: "我的订单",
    path: "/allOrder",
  },
  {
    id: 6,
    icon: "service-o",
    name: "官方客服",
    path: "/service",
  },
];
</script>

<style scoped>
.order {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background-color: white;
  position: sticky;
  z-index: 100;
  top: 0;
}
.order-left {
  display: flex;
  align-items: center;
}
.order-left span {
  font-size: 20px;
  font-weight: 600;
  margin: 0 15px;
}
.userTitle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  padding: 15px 45px;
  margin-bottom: 8px;
}
.userTitle span {
  margin-right: 5px;
}
.userTitle img {
  height: 50px;
  width: 50px;
  border-radius: 40px;
}
/* .evt {
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 12px;
} */
.evt-card {
  background-color: white;
  padding: 15px;
  margin-bottom: 15px;
}
.cardName {
  font-weight: 400;
  font-size: 15px;
  margin-bottom: 15px;
}
.card {
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.card-left {
  display: flex;
  align-items: center;
  gap: 10px;
}
.card-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.card-right button {
  background-color: #ffe3c6;
  color: #ff8001;
  border: 0;
  padding: 6px;
  border-radius: 4px;
}
.card img {
  width: 60px;
  height: 60px;
  border-radius: 10px;
}
.info p:first-child {
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 10px;
}
.info p:last-child {
  font-size: 13px;
  color: darkgrey;
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
.evaluateCard {
  background-color: white;
  padding: 15px;
  margin-bottom: 15px;
}
.message {
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
}
.message-left {
  flex-shrink: 0;
}

.message-left img {
  width: 60px;
  height: 60px;
  border-radius: 10px;
}
.message-right {
  color: darkgray;
  font-size: 13px;
}
.had-evaluate p:first-child {
  margin-bottom: 10px;
  color: #ff8001;
}
.content .bg {
  background: #ff8001;
  height: 50px;
  width: 50px;
  border-radius: 25px;
}

.logo {
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 20px;
}
.bg {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

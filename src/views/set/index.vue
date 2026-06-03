<template>
  <div class="set">
    <div class="nav">
      <div class="nav-left">
        <van-icon name="arrow-left" size="25px" @click="router.back()" />
        <p>设置</p>
      </div>
      <div class="nav-right">
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
    path: "",
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

<template>
  <div class="logistic">
    <div class="order">
      <div class="order-left">
        <van-icon name="arrow-left" @click="router.back()" />
      </div>
      <div class="order-right">
        <div>
          <van-icon name="service-o" size="22px" />
          <p>客服</p>
        </div>
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
            </div>
          </van-popup>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";

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

.order-right {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.order-left {
  font-size: 25px;
}
.order-right {
  gap: 30px;
}
.order-right p {
  font-size: 15px;
}
.order-right div:first-child {
  display: flex;
  gap: 10px;
  align-items: center;
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
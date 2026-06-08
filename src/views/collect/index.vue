<template>
  <div class="collect">
    <div class="order">
      <div class="order-left">
        <van-icon name="arrow-left" size="25px" @click="router.back()" />
        <div>
          我的收藏<span>({{ collectList.length }})</span>
        </div>
      </div>
      <div class="order-right">
        <van-icon name="search" size="25px" />
        <p @click="getManage">{{ manage ? "完成" : "管理" }}</p>
        <div>
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
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        loading-text="正在加载中"
        @load="onLoad"
      >
        <div
          class="orderCard"
          @click="goCard(item.product.id)"
          v-for="item in collectList"
          :key="item.id"
        >
          <div class="card">
            <van-checkbox v-if="manage" v-model="item.checked"></van-checkbox>
            <div class="card-left">
              <img :src="item.product.images" alt="" />
              <div class="info">
                <p>{{ item.product.name }}</p>
                <p>{{ item.product.description }}</p>
                <p>￥{{ item.product.price }}</p>
              </div>
            </div>
            <div class="card-right">
              <p>123人收藏</p>
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
    <div v-if="manage" class="delete">
      <van-checkbox v-model="checkedList">全选</van-checkbox>
      <button @click="deleteCheck">删除</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref, onMounted, computed } from "vue";
import { getUserFav, deleteUserFav } from "../../api/user";

const manage = ref(false);
const router = useRouter();
const showTop = ref(false);
const collectList = ref([]);
const page = ref(1);
const limit = 10;
const loading = ref(false);
const finished = ref(false);
const checked = ref(false);

const getManage = () => {
  manage.value = !manage.value;
};

const goCard = (id) => {
  router.push(`/card/${id}`);
};

const checkedList = computed({
  get() {
    if (!collectList.value.length) false;
    return collectList.value.every((item) => item.checked);
  },
  set(value) {
    collectList.value.forEach((item) => {
      item.checked = value;
    });
  },
});

onMounted(async () => {
  const res = await getUserFav(page.value, limit);
  collectList.value.push(...res);
  loading.value = false;
  if (res.length < limit) {
    finished.value = true;
  } else {
    page.value++;
  }
});
const deleteCheck = async () => {
  const deleteList = [];
  collectList.value.forEach((item) => {
    if (item.checked) {
      deleteList.push(item.id);
    }
  });
  if (deleteList.length === 0) return;
  const allDeleteRequest = deleteList.map((id) => deleteUserFav(id));
  await Promise.all(allDeleteRequest);

  collectList.value = await getUserFav();
};

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
  font-size: 20px;
  gap: 10px;
}
.order-left span {
  margin-left: 10px;
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
  align-items: center;
  gap: 10px;
  /* justify-content: space-between; */
}

.card-left {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  flex: 1;
}
.card-right {
  position: absolute;
  right: 10px;
  display: flex;
  height: 100px;
  align-items: flex-end;
  flex-shrink: 0;
  font-size: 15px;
}
.card img {
  width: 100px;
  height: 100px;
  border-radius: 10px;
  flex-shrink: 0;
}
.info {
  min-width: 0;
}
.info p {
  margin-bottom: 10px;
  text-overflow: ellipsis;
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
.delete {
  background-color: white;
  height: 60px;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
}
.delete :deep(.van-checkbox__label) {
  color: #ff8001;
  font-size: large;
}
.delete button {
  background-color: #ff8001;
  border: 0;
  padding: 8px 12px;
  border-radius: 8px;
  color: white;
}
</style>

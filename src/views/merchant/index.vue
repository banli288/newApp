<template>
  <div class="merchant">
    <div class="title">
      <div class="order">
        <div class="order-left">
          <van-icon name="arrow-left" @click="router.back()" />
          <van-search placeholder="搜索宝贝" />
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
      <div class="cardList">
        <div class="cardName">
          <div class="card-left">
            <img :src="merchantData.logo" alt="" />
            <div>
              <p>{{ merchantData.name }}</p>
              <p>粉丝{{ merchant.fans }}</p>
            </div>
          </div>
          <div class="card-right">
            <button
              :class="{ followed: merchant.isFollowed }"
              @click="follow(merchant)"
            >
              <span>{{ merchant.isFollowed ? "已关注" : "+关注" }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="name">宝贝</div>
    <div class="goods">
      <div class="sort">
        <div class="sort-left">
          <p class="active">综合</p>
          <p>销量</p>
          <p>价格</p>
        </div>
        <div class="sort-right" @click="changeIcon">
          <van-icon name="apps-o" v-if="isIcon" />
          <van-icon name="list-switch" v-else="!isIcon" />
        </div>
      </div>
      <div class="waterFall">
        <WaterFall :List="imageList" />
      </div>
      <div class="bottom">
        <p class="active">首页</p>
        <p @click="router.push('/chat')">客服</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { getImageList } from "../../api/home";
import { getMerchantDetail } from "../../api/home";
import WaterFall from "../../components/WaterFall.vue";

const router = useRouter();
const route = useRoute();
const showTop = ref(false);
const isIcon = ref(true);
const imageList = ref([]);
const merchantData = ref({});

const merchantId = route.params.id;

onMounted(async () => {
  const res = await getImageList();
  imageList.value = res.items;
});

onMounted(async () => {
  merchantData.value = await getMerchantDetail(merchantId);
});

const changeIcon = () => {
  isIcon.value = !isIcon.value;
};
const showPopup = () => {
  showTop.value = true;
};

const follow = (shop) => {
  shop.isFollowed = !shop.isFollowed;
  if (shop.isFollowed) {
    shop.fans += 1;
  } else {
    shop.fans -= 1;
  }
};

const merchant = ref({
  id: 1,
  shopName: "萌宠乐园",
  isFollowed: false,
  avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
  fans: 12800,
});

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
:deep(.van-search__content) {
  border: 0;
  border-radius: 20px;
  background-color: white;
}
:deep(.van-search) {
  background: none;
  width: 300px;
}
.order {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
}
.title {
  background: linear-gradient(180deg, #feb873, #ffffff);
}

.order-left {
  font-size: 25px;
  gap: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
.cardList {
  /* background-color: white; */
  margin-bottom: 5px;
  margin: 0 5px;
  border-radius: 10px;
}
.cardName {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px 10px 10px;
}
.card-left img {
  width: 50px;
  height: 50px;
  border-radius: 10px;
}

.card-left {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
}
.card-left p:first-child {
  font-size: 17px;
  font-weight: 600;
}
.card-left p:nth-child(2) {
  font-size: 15px;
  color: gray;
}
.card-right button {
  background-color: #ff7d32;
  border: 1px solid rgb(255, 255, 255);
  width: 60px;
  height: 30px;
  border-radius: 10px;
  color: white;
}

.card-right button.followed {
  background-color: white;
  border: 1px solid #ff7d32;
  color: black;
}
.name {
  background-color: white;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 17px;
  margin-bottom: 5px;
}
.sort {
  background-color: white;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 15px;
}
.sort-left {
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 30px;
}
.bottom {
  background-color: white;
  height: 50px;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 19px;
  /* font-weight: bold; */
  padding: 15px 10px;
}
.active {
  color: #ff8001;
}
</style>

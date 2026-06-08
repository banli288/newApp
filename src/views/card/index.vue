<template>
  <div v-if="chooseData.id">
    <div class="swipe-wrapper">
      <van-swipe :autoplay="3000" lazy-render>
        <van-swipe-item
          style="height: 500px"
          v-for="img in chooseData.images"
          :key="chooseData.id"
        >
          <img :src="img" />
        </van-swipe-item>
      </van-swipe>

      <div class="overlay">
        <div class="over-left">
          <van-icon name="arrow-left" size="40px" @click="router.back()" />
        </div>
        <div class="over-right">
          <div>
            <van-icon name="share-o" size="35px" @click="showForward" />
          </div>
          <div>
            <van-icon name="cart-o" size="35px" @click="router.push('/cart')" />
          </div>
          <div>
            <van-icon name="more-o" size="35px" @click="showPopup" />
          </div>
        </div>
      </div>
    </div>
    <div class="priceIntroduce">
      <div class="price">
        <div class="price-left">
          <p>￥{{ chooseData.price }}</p>
          <p>￥6999</p>
        </div>
        <div class="price-right">
          <p>已售50+</p>
        </div>
      </div>
      <div class="introduce">
        <p>{{ chooseData.name }}</p>
        <p>{{ chooseData.description }}</p>
      </div>
      <div class="service">
        <div class="service-left" @click="showSevenDay">
          <van-icon name="gold-coin-o" size="25px" />
          <p>极速退款 7天无理由退货</p>
        </div>
        <div class="service-right">
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="service">
        <div class="service-left" @click="showDispatch">
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
      <van-action-bar style="height: 70px">
        <van-action-bar-icon
          @click="router.push('/chat')"
          icon="chat-o"
          text="客服"
          color="#ee0a24"
        />
        <van-action-bar-icon
          @click="goMerchant(chooseData.merchantId)"
          icon="shop-o"
          text="店铺"
        />
        <div>
          <van-action-bar-icon
            v-if="isIcon"
            @click="collect"
            icon="star"
            text="已收藏"
            color="#ff5000"
          />
          <van-action-bar-icon
            v-else="!isIcon"
            @click="collect"
            icon="star-o"
            text="收藏"
            color="#ff5000"
          />
        </div>
        <van-action-bar-button
          type="warning"
          text="加入购物车"
          @click="postCardIn"
        />
        <van-action-bar-button
          type="danger"
          text="立即购买"
          @click="showPurchase"
        />
      </van-action-bar>
    </div>
  </div>
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
  <van-popup
    v-model:show="Forward"
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
      <div class="logo" v-for="item in forwardList" :key="item.id">
        <div class="bg" style="background-color: white">
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="item.icon"></use>
          </svg>
        </div>
        {{ item.name }}
      </div>
      <div></div>
    </div>
  </van-popup>
  <van-popup
    v-model:show="SevenDay"
    position="bottom"
    :style="{ height: '30%' }"
  >
    <div class="content">
      <div>
        <van-icon name="guide-o" class="vanIcon" /><span>极速退款</span>
      </div>
      <p>满足相应条件时，信誉良好的用户在退货寄出后，享受极速退款到账。</p>
    </div>
    <van-divider />

    <div class="content">
      <div>
        <van-icon name="certificate" class="vanIcon" /><span
          >7天无理由退换</span
        >
      </div>
      <p>满足相应条件(活体/破损/使用不支持)时，消费者可申请"7天无理由退换货"</p>
    </div>
  </van-popup>
  <van-popup
    v-model:show="dispatch"
    position="bottom"
    :style="{ height: '30%' }"
  >
    <div class="content">
      <div>
        <van-icon name="logistics" class="vanIcon" /><span>预计后天发货</span>
      </div>
      <p>
        下单后，您的订单会在十天之内发货，若未在十天之内发货，消费者将会收到至少10元无门槛代金券
      </p>
    </div>
    <van-divider />

    <div class="content">
      <div><van-icon name="cash-o" class="vanIcon" /><span>全场包邮</span></div>
      <p>所有商品包邮</p>
    </div>
  </van-popup>
  <van-popup
    v-model:show="purchase"
    position="bottom"
    :style="{ height: '80%' }"
  >
    <div class="content-title"><p>极速退款 七天无理由退货</p></div>
    <div class="content-address">
      <van-icon name="location-o" size="20px" />
      <p>名字</p>
      <p class="address">地址</p>
      <van-icon name="edit" size="20px" />
      <van-icon name="arrow" size="20px" />
    </div>
    <div class="cardImg">
      <img src="" alt="" />
      <div class="cardImg-right">
        <div class="info">
          <span>￥</span>
          <span>222</span>
        </div>
        <div><van-stepper v-model="value" /></div>
      </div>
    </div>
    <van-divider />
    <div class="ctg-title">
      <div class="ctg-title-left">
        <p>分类</p>
        <p>（2）</p>
      </div>
      <div class="ctg-title-right" v-if="isList" @click="isList = !isList">
        <van-icon name="apps-o" />
        <p>大图</p>
      </div>
      <div class="ctg-title-right" v-else="!isList" @click="isList = !isList">
        <van-icon name="coupon-o" />
        <p>列表</p>
      </div>
    </div>
    <div class="special">
      <img src="" alt="" />
      <p>商品名字</p>
      <p>￥6999</p>
    </div>
  </van-popup>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { getProductDetail } from "../../api/user";
import { postCart } from "../../api/cart";

const router = useRouter();
const route = useRoute();

const dataId = route.params.id;
const chooseData = ref({});
const isIcon = ref(true);
const showTop = ref(false);
const Forward = ref(false);
const SevenDay = ref(false);
const dispatch = ref(false);
const purchase = ref(false);
const address = ref({});
const isList = ref(true);

const showPurchase = () => {
  purchase.value = true;
};
const showDispatch = () => {
  dispatch.value = true;
};
const showSevenDay = () => {
  SevenDay.value = true;
};
const showForward = () => {
  Forward.value = true;
};
const showPopup = () => {
  showTop.value = true;
};

const collect = () => {
  isIcon.value = !isIcon.value;
};

const goMerchant = (id) => {
  router.push(`/merchant/${id}`);
};

const postCardIn = async () => {
  await postCart(chooseData.value.id, 1, chooseData.value.merchantId);
};

onMounted(async () => {
  chooseData.value = await getProductDetail(dataId);
});

// onMounted(async () => {
//   chooseData.value = await getProductDetail(dataId);
// });
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
const forwardList = [
  {
    id: 1,
    icon: "#icon-weixin",
    name: "微信",
  },
  {
    id: 2,
    icon: "#icon-zhifubaozhifu",
    name: "支付宝",
  },
  {
    id: 3,
    icon: "#icon-QQ",
    name: "QQ",
  },
  {
    id: 4,
    icon: "#icon-lianjie",
    name: "分享链接",
  },
];
</script>

<style scoped>
.swipe-wrapper {
  position: relative;
}
.swipe-wrapper img {
  height: 100%;
  width: 100%;
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
  /* display: flex; */
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 10px;
}
.introduce p:last-child {
  margin-top: 10px;
  font-size: 18px;
  font-weight: normal;
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
:deep(.van-action-bar-icon__icon) {
  font-size: 25px;
}

.content {
  padding: 15px 20px;
}
.content div:first-child {
  font-weight: 600;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: left;
}
.content span {
  font-size: 18px;
}
.vanIcon {
  color: #ff7d32;
  font-weight: bold;
  font-size: 20px;
  margin-right: 5px;
}
.content-title {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background: linear-gradient(180deg, #ffce96, white);
  color: #f95b00;
}
.content-address {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 8px;
  font-size: 16px;
  font-weight: bold;
}
.content-address .address {
  flex: 1;
}
.cardImg {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px 15px;
}
.cardImg-right {
  display: flex;
  height: 80px;
  /* align-items: flex-start; */
  flex-direction: column;
  justify-content: space-between;
}
.cardImg-right span:first-child {
  color: #ff7d32;
}
.cardImg-right span:nth-child(2) {
  color: #ff7d32;
  font-size: 23px;
}
.cardImg img {
  background-color: #ffce96;
  height: 80px;
  width: 80px;
}
.ctg-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  font-size: 17px;
}
.ctg-title-right {
  display: flex;
  align-items: center;
  gap: 5px;
}
.ctg-title-left {
  gap: 5px;
  display: flex;
  align-items: center;
}
.special {
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 5px 10px;
  border-radius: 7px;
  gap: 10px;
  margin: 15px;
  background-color: rgb(218, 218, 218);
}
.special img {
  height: 25px;
  width: 25px;
  background-color: #ffce96;
}
</style>

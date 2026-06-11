<template>
  <div class="follow">
    <div class="cardList" v-for="shop in shopList" :key="shop.id">
      <div class="cardName">
        <div class="goods-card-left" @click="goMerchant(shop.merchant.id)">
          <img :src="shop.merchant.logo" alt="" />
          <div>
            <p>{{ shop.merchant.name }}</p>
            <p>粉丝{{ shop.fans }}</p>
          </div>
        </div>
        <div class="goods-card-right">
          <button :class="{ followed: shop.isFollowed }" @click="follow(shop)">
            <span>{{ shop.isFollowed ? "已关注" : "+关注" }}</span>
          </button>
        </div>
      </div>
    </div>
    <van-back-top
      style="background-color: #ff870f"
      class="custom"
      right="15vw"
      bottom="10vh"
    ></van-back-top>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { getUserfollow } from "../../../api/user";

const router = useRouter();
const shopList = ref([]);

onMounted(async () => {
  const res = await getUserfollow();
  shopList.value = res.items;
});

const goMerchant = (id) => {
  router.push(`/merchant/${id}`);
  // console.log(id);
};
const follow = (shop) => {
  shop.isFollowed = !shop.isFollowed;
  if (shop.isFollowed) {
    shop.fans += 1;
  } else {
    shop.fans -= 1;
  }
};
</script>

<style scoped>
.cardList {
  background-color: white;
  margin: 5px;
  border-radius: 10px;
  height: 300px;
}
.cardName {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px 10px 10px;
}
.goods-card-left img {
  width: 60px;
  height: 60px;
  border-radius: 30px;
}

.goods-card-left {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
}
.goods-card-right button {
  background-color: #ff7d32;
  border: 1px solid rgb(255, 255, 255);
  width: 60px;
  height: 30px;
  border-radius: 10px; /* 描边粗细、样式、颜色 */
  color: white;
}
/* .goods-card-right button span {
  color: white;
} */
.goods-card-right button.followed {
  background-color: white;
  border: 1px solid #ff7d32;
  color: black;
}
</style>

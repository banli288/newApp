<template>
  <div class="follow">
    <div class="cardList" v-for="shop in shopList" :key="shop.id">
      <div class="cardName">
        <div class="goods-card-left" @click="router.push('/merchant')">
          <img :src="shop.avatar" alt="" />
          <div>
            <p>{{ shop.shopName }}</p>
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
import { ref } from "vue";

const router = useRouter();

const follow = (shop) => {
  shop.isFollowed = !shop.isFollowed;
  if (shop.isFollowed) {
    shop.fans += 1;
  } else {
    shop.fans -= 1;
  }
};

const shopList = ref([
  {
    id: 1,
    shopName: "萌宠乐园",
    isFollowed: false,
    avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
    fans: 12800,
    products: [
      {
        id: 101,
        name: "英短蓝猫",
        desc: "纯种英短，疫苗齐全，性格温顺",
        price: 1200,
        image: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
      },
      {
        id: 102,
        name: "布偶猫",
        desc: "赛级布偶，毛量丰厚，亲人粘人",
        price: 3500,
        image: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
      },
      {
        id: 103,
        name: "美短虎斑",
        desc: "花纹漂亮，体质好，不挑食",
        price: 1100,
        image: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
      },
    ],
  },
  {
    id: 2,
    shopName: "汪星人之家",
    isFollowed: false,
    avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/dog.jpg",
    fans: 8600,
    products: [
      {
        id: 201,
        name: "金毛寻回犬",
        desc: "3个月大，驱虫已做，活泼好动",
        price: 800,
        image: "https://fastly.jsdelivr.net/npm/@vant/assets/dog.jpg",
      },
      {
        id: 202,
        name: "柯基犬",
        desc: "短腿柯基，呆萌可爱，适合家养",
        price: 1500,
        image: "https://fastly.jsdelivr.net/npm/@vant/assets/dog.jpg",
      },
      {
        id: 203,
        name: "泰迪犬",
        desc: "卷毛泰迪，不掉毛，聪明伶俐",
        price: 600,
        image: "https://fastly.jsdelivr.net/npm/@vant/assets/dog.jpg",
      },
    ],
  },
  {
    id: 3,
    shopName: "小宠世界",
    isFollowed: false,
    avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
    fans: 5200,
    products: [
      {
        id: 301,
        name: "暹罗猫",
        desc: "粘人小话痨，适合陪伴",
        price: 900,
        image: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
      },
      {
        id: 302,
        name: "哈士奇",
        desc: "拆家小能手，精力旺盛",
        price: 1000,
        image: "https://fastly.jsdelivr.net/npm/@vant/assets/dog.jpg",
      },
      {
        id: 303,
        name: "萨摩耶",
        desc: "微笑天使，毛白如雪，性格温顺",
        price: 1800,
        image: "https://fastly.jsdelivr.net/npm/@vant/assets/dog.jpg",
      },
    ],
  },
  {
    id: 4,
    shopName: "猫咪森林",
    isFollowed: false,
    avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
    fans: 21500,
    products: [
      {
        id: 401,
        name: "橘猫",
        desc: "大橘为重，能吃能睡，亲人",
        price: 300,
        image: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
      },
      {
        id: 402,
        name: "缅因猫",
        desc: "体型巨大，毛发浓密，性格温和",
        price: 5000,
        image: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
      },
      {
        id: 403,
        name: "无毛猫",
        desc: "斯芬克斯，不掉毛，适合过敏体质",
        price: 4200,
        image: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
      },
    ],
  },
  {
    id: 5,
    shopName: "犬舍联盟",
    isFollowed: false,
    avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/dog.jpg",
    fans: 16300,
    products: [
      {
        id: 501,
        name: "拉布拉多",
        desc: "导盲犬同款，智商高，服从性强",
        price: 1300,
        image: "https://fastly.jsdelivr.net/npm/@vant/assets/dog.jpg",
      },
      {
        id: 502,
        name: "边牧",
        desc: "智商第一，飞盘高手，需要大空间",
        price: 2000,
        image: "https://fastly.jsdelivr.net/npm/@vant/assets/dog.jpg",
      },
      {
        id: 503,
        name: "比熊犬",
        desc: "棉花糖造型，不掉毛，适合公寓",
        price: 1600,
        image: "https://fastly.jsdelivr.net/npm/@vant/assets/dog.jpg",
      },
    ],
  },
  {
    id: 6,
    shopName: "爬宠驿站",
    isFollowed: false,
    avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
    fans: 3800,
    products: [
      {
        id: 601,
        name: "守宫",
        desc: "豹纹守宫，好养活，适合新手",
        price: 200,
        image: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
      },
      {
        id: 602,
        name: "仓鼠",
        desc: "银狐仓鼠，小巧可爱，笼子即可养",
        price: 50,
        image: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
      },
      {
        id: 603,
        name: "龙猫",
        desc: "毛丝鼠，手感极佳，胆小温顺",
        price: 800,
        image: "https://fastly.jsdelivr.net/npm/@vant/assets/dog.jpg",
      },
    ],
  },
]);
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

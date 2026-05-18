<template>
  <!-- //导航栏 -->
  <NavBar />
  <van-search
    v-model="value"
    placeholder="搜索喜欢的宠物或商家"
    @search="onSearch"
    @cancel="onCancel"
  />
  <!-- //轮播图 -->
  <van-swipe :autoplay="3000" indicator-color="#ee0a24" lazy-render>
    <van-swipe-item v-for="image in images" :key="image">
      <img :src="image" />
    </van-swipe-item>
  </van-swipe>
  <!-- //瀑布流 -->
  <div class="waterfallTop">
    <p>为你推荐</p>
  </div>
  <div class="waterfall">
    <div class="item" v-for="item in imageList" :key="item.id">
      <img :src="item.image" />
      <p>{{ item.name }}</p>
      <div class="item-span">
        <span>￥{{ item.price }}</span>
        <span>已售{{ item.sales }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import NavBar from "../../components/NavBar.vue";

//搜索栏
const value = ref("");
const onSearch = (val) => showToast(val);
const onCancel = () => showToast("取消");
//轮播图
const images = [
  "https://picsum.photos/id/237/400/200", // 黑狗
  "https://picsum.photos/id/40/400/200", // 猫
  "https://picsum.photos/id/1074/400/200", // 狗
  "https://picsum.photos/id/1084/400/200", // 猫
];
//瀑布流
const imageList = ref([
  {
    id: 1,
    name: "英短蓝猫 幼猫",
    price: "1200",
    sales: "328",
    image: "https://picsum.photos/id/40/200/250",
  },
  {
    id: 2,
    name: "金毛寻回犬 3个月",
    price: "800",
    sales: "512",
    image: "https://picsum.photos/id/237/200/300",
  },
  {
    id: 3,
    name: "布偶猫 赛级",
    price: "3500",
    sales: "89",
    image: "https://picsum.photos/id/1084/200/280",
  },
  {
    id: 4,
    name: "柯基犬 短腿",
    price: "1500",
    sales: "276",
    image: "https://picsum.photos/id/1074/200/220",
  },
  {
    id: 5,
    name: "暹罗猫 粘人",
    price: "900",
    sales: "198",
    image: "https://picsum.photos/id/1025/200/260",
  },
  {
    id: 6,
    name: "哈士奇 幼犬",
    price: "1000",
    sales: "445",
    image: "https://picsum.photos/id/1062/200/300",
  },
  {
    id: 7,
    name: "美短虎斑",
    price: "1100",
    sales: "167",
    image: "https://picsum.photos/id/1074/200/200",
  },
  {
    id: 8,
    name: "泰迪犬 卷毛",
    price: "600",
    sales: "623",
    image: "https://picsum.photos/id/1025/200/240",
  },
]);
</script>

<style scoped>
/* //导航栏 */

.van-search__content {
  border: 2px solid #ff870f;
  border-radius: 20px;
}
/* //轮播图 */
.van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #f6ebdb;
  padding: 0 15px;
}
/* //瀑布流 */
.waterfallTop {
  margin-left: 10px;
  padding: 5px 0;
  font-size: 20px;
  color: #ff870f;
}
.waterfall {
  columns: 2; /* 两列 */
  column-gap: 8px; /* 列间距 */
  padding: 5px 10px;
}
.item {
  break-inside: avoid; /* 防止卡片被拆到两列 */
  margin-bottom: 8px;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
}
.item img {
  width: 100%;
}
.item .item-span {
  display: flex;
  align-items: center;
}
.item-span span {
  flex: 1;
  justify-content: space-between;
  margin-left: 5px;
}
.item span:first-child {
  color: #ff870f;
  font-size: 20px;
}
.item p {
  margin-left: 5px;
}
</style>

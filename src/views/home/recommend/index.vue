<template>
  <!-- //轮播图 -->
  <van-swipe :autoplay="3000" indicator-color="#ee0a24" lazy-render>
    <van-swipe-item v-for="image in images" :key="image.id">
      <img :src="image.image" />
    </van-swipe-item>
  </van-swipe>
  <!-- //瀑布流 -->
  <div class="waterfallTop">
    <p>为你推荐</p>
  </div>
  <WaterFall :List="imageList" />
</template>

<script setup>
import { onMounted, ref } from "vue";
import WaterFall from "../../../components/WaterFall.vue";
import { getGoodList } from "@/api/home.js";
//轮播图
const images = ref([]);
onMounted(async () => {
  images.value = await getGoodList();
});
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
/* //轮播图 */
.van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  /* background-color: white; */
  padding: 0 15px;
}
/* //瀑布流 */
.waterfallTop {
  margin: 5px 5px 0;
  padding: 10px 10px;
  font-size: 20px;
  background-color: rgb(255, 228, 205);
  border-radius: 10px 10px 0 0;
}
</style>

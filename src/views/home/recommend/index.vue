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
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      loading-text="正在加载中"
      @load="onLoad"
    >
      <WaterFall :List="imageList" />
    </van-list>
  </van-pull-refresh>
  <van-back-top
    style="background-color: #ff870f"
    class="custom"
    right="15vw"
    bottom="10vh"
  ></van-back-top>
</template>

<script setup>
import { onMounted, ref } from "vue";
import WaterFall from "../../../components/WaterFall.vue";
import { getGoodList, getImageList } from "@/api/home.js";
//轮播图
const images = ref([]);
const imageList = ref([]);
const page = ref(1);
const limit = 10;
const finished = ref(false);
const loading = ref(false);

onMounted(async () => {
  images.value = await getGoodList();
});

//瀑布流
const onLoad = async () => {
  const res = await getImageList(page.value, limit);
  imageList.value.push(...res.items);
  loading.value = false;
  if (res.length < limit) {
    finished.value = ture;
  } else {
    page.value++;
  }
};
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

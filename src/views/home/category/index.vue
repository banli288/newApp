<template>
  <div class="category">
    <div class="categoryList">
      <div class="category-single" v-for="item in tabs" :key="item.id">
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="item.icon"></use>
        </svg>
        <p>{{ item.name }}</p>
      </div>
    </div>
    <div class="categoryAll">
      <p>全部宝贝</p>
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
    </div>
  </div>
</template>

<script setup>
import NavBar from "../../../components/NavBar.vue";
import WaterFall from "../../../components/WaterFall.vue";
import { getGoodList, getImageList } from "@/api/home.js";
import { useCounterStore } from "@/stores/counter";
import { ref } from "vue";

const { tabs } = useCounterStore();
const imageList = ref([]);
const page = ref(1);
const limit = 10;
const finished = ref(false);
const loading = ref(false);

//瀑布流
const onLoad = async () => {
  const res = await getImageList(page.value, limit);
  imageList.value.push(...res);
  loading.value = false;
  if (res.length < limit) {
    finished.value = ture;
  } else {
    page.value++;
  }
};
</script>

<style scoped>
.icon {
  height: 30px;
  width: 30px;
}
.categoryList {
  display: flex;
  flex-wrap: wrap;
  background-color: white;
  margin: 8px 5px;
  border-radius: 10px;
}
.category-single {
  width: 25%;
  padding: 15px 30px;
}
.categoryAll {
  background-color: white;
  height: 40px;
  margin: 0 5px;
  border-radius: 10px 10px 0 0;
}
.categoryAll p {
  font-size: larger;
  padding: 5px 15px;
}
</style>

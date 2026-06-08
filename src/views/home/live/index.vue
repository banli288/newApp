<template>
  <div class="live">
    <div class="liveCard" v-for="item in imageList" :key="item.id">
      <img :src="item.merchant.logo" alt="" />
      <div class="card1">
        <p>直播中</p>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zhibozhong3-copy-copy-copy"></use>
        </svg>
      </div>
      <div class="card2">@{{ item.merchant.name }}</div>
      <div class="card3">{{ item.title }}</div>
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
// import WaterFall from "../../../components/WaterFall.vue";
import { onMounted, ref } from "vue";
import { getLiveList } from "../../../api/home";

const imageList = ref([]);

onMounted(async () => {
  imageList.value = await getLiveList();
});
</script>

<style scoped>
.live {
  margin: 5px 5px;
  columns: 2;
  column-gap: 5px;
}
.liveCard {
  background-color: rgb(253, 236, 215);
  /* margin: 10px 0; */
  margin-bottom: 6px;
  padding: 8px;
  border-radius: 10px;
}
.liveCard img {
  height: 280px;
  background-color: rgb(245, 223, 205);
}
.icon {
  height: 30px;
  width: 30px;
}
.liveCard .card1 {
  color: #ff7d32;
  font-weight: 500;
  display: flex;
  align-items: center;
}
.liveCard .card2 {
  font-weight: 600;
}
.liveCard .card3 {
  font-size: small;
}
</style>

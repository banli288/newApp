<template>
  <div class="live">
    <div class="liveCard" v-for="item in imageList" :key="item.id">
      <img src="" alt="" />
      <div class="card1">
        <p>直播中</p>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zhibozhong3-copy-copy-copy"></use>
        </svg>
      </div>
      <div class="card2">@{{ item.shopName }}</div>
      <div class="card3">{{ item.desc }}</div>
    </div>
  </div>
</template>

<script setup>
// import WaterFall from "../../../components/WaterFall.vue";
import { ref } from "vue";

const imageList = ref([
  {
    id: 1,
    shopName: "萌宠乐园",

    desc: "英短蓝猫专场！纯种疫苗齐全，快来挑选~",
    viewers: 12800,
  },
  {
    id: 2,
    shopName: "汪星人之家",

    desc: "金毛幼犬开播！驱虫已做，活泼亲人~",
    viewers: 35600,
  },
  {
    id: 3,
    shopName: "猫咖日记",

    desc: "布偶猫专场！赛级品质，毛量惊人~",
    viewers: 8900,
  },
  {
    id: 4,
    shopName: "犬舍联盟",

    desc: "柯基专场来啦！小短腿萌化你的心~",
    viewers: 21000,
  },
  {
    id: 5,
    shopName: "小宠世界",

    desc: "暹罗猫直播！粘人小话痨等你带回家~",
    viewers: 6700,
  },
  {
    id: 6,
    shopName: "宠物优选",

    desc: "拉布拉多专场！导盲犬同款，聪明听话~",
    viewers: 15200,
  },
  {
    id: 7,
    shopName: "猫咪森林",

    desc: "橘猫专场！大橘为重，能吃能睡~",
    viewers: 4300,
  },
  {
    id: 8,
    shopName: "爱宠生活",

    desc: "泰迪犬直播！卷毛不掉毛，聪明伶俐~",
    viewers: 9800,
  },
]);
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

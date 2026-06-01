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
      <WaterFall :List="imageList" />
    </div>
  </div>
</template>

<script setup>
import NavBar from "../../../components/NavBar.vue";
import WaterFall from "../../../components/WaterFall.vue";
import { useCounterStore } from "@/stores/counter";
import { ref } from "vue";

const { tabs } = useCounterStore();

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

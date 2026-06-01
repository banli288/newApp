<template>
  <div class="category">
    <div class="title">
      <van-icon name="arrow-left" size="30px" color="white" />
      <p>分类</p>
      <van-icon name="search" size="30px" color="white" />
    </div>
    <div class="ctg">
      <div class="ctg-left">
        <van-sidebar v-model="active">
          <van-sidebar-item
            v-for="item in tabs"
            :key="item.id"
            :title="item.name"
          />
        </van-sidebar>
      </div>
      <div class="ctg-right">
        <!-- <scroll-view scroll-y class="right-content">
          <view v-for="sub in tabs" :key="sub.id">
           
          </view>
        </scroll-view> -->
        <!-- <p>{{ tabs[active].name }}</p> -->
        <div v-for="item in tabs" :key="item.id">
          <img
            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
            alt=""
          />
          <p>{{ item.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from "@/stores/counter";
import { ref } from "vue";

const active = ref(0);

const { tabs } = useCounterStore();
</script>

<style  scoped>
:deep(.van-sidebar-item--select) {
  background-color: #fce4cb;
}
:deep(.van-sidebar-item--select:before) {
  background-color: white;
}
:deep(.van-sidebar) {
  --van-sidebar-width: 100px;
  --van-sidebar-item-height: 60px;
  --van-sidebar-font-size: 26px;
  --van-sidebar-padding: 50px 20px;
}

.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  background-color: #ff870f;
}
.title p {
  font-size: 35px;
  color: white;
  font-weight: 500;
}
.ctg {
  display: flex;
  justify-content: left;
}
.ctg-left {
  background-color: white;
}
.ctg-left p {
  font-size: 30px;
  margin: 10px 15px;
}
.ctg-right {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  background-color: white;
  margin: 6px 12px 6px 6px;
  border-radius: 10px;
  padding: 15px 20px;
  align-items: start;
}
.ctg-right div {
  display: flex;
  align-items: center;
  /* justify-content: center; */
  flex-direction: column;
}
.ctg-right div p {
  font-size: 20px;
  margin-top: 10px;
}
.ctg-right img {
  display: block;
  width: 100%;
  border-radius: 10px;
}
</style>
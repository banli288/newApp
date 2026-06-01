<template>
  <div class="adress">
    <div class="order">
      <div class="order-left">
        <van-icon name="arrow-left" size="25px" @click="router.back()" />
        <div>收货地址</div>
      </div>
      <div class="order-right">
        <van-icon name="search" size="25px" />
        <p>管理</p>
        <p>新增地址</p>
      </div>
    </div>
    <div class="card">
      <div class="card-left">
        <div>
          <sapn>湖南省</sapn>
          <sapn>湘潭市</sapn>
          <sapn>岳塘区</sapn>
          <sapn>宝塔街道</sapn>
        </div>
        <div><span>建鑫社区</span> <span>2栋</span></div>
        <div><span>姓名</span> <span>1242452545</span></div>
      </div>
      <div class="card-right">
        <van-icon name="records-o" size="20px" @click="router.push('/edit')" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<style scoped>
.order {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background-color: white;
}

.order-left {
  font-size: 20px;
  gap: 10px;
}
.order-right {
  gap: 20px;
}
.order-right p {
  font-size: 18px;
}
.order-right p:last-child {
  color: #ff870f;
}
.order-left,
.order-right {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  padding: 15px;
  margin-bottom: 3px;
}
.card-left div:first-child {
  color: gray;
  font-size: 15px;
  margin-bottom: 6px;
}
.card-left div:nth-child(2) {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 6px;
}
</style>

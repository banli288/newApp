<template>
  <div class="chat">
    <div class="nav">
      <van-icon name="arrow-left" size="25px" @click="router.back()" />
      <p>商家</p>
    </div>
    <div class="content-left">
      <div class="time">5月23日10:14</div>
      <div class="Merchant">
        <img src="https://picsum.photos/id/40/200/250" alt="" />

        <div class="message">
          <p>2132333333333333</p>
        </div>
      </div>
    </div>
    <div class="content-right">
      <div class="time">5月23日10:14</div>
      <div class="buyer">
        <div class="msg">的方式地方都是粉丝的方式的</div>
        <img src="https://picsum.photos/id/40/200/250" alt="" />
      </div>
    </div>
    <div class="keyword">
      <van-icon name="bag-o" size="25px" />
      <van-search v-model="value" />
      <van-icon name="add-o" size="25px" />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<style scoped>
.nav {
  font-size: 20px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: left;
  background-color: white;
  padding: 15px;
  position: sticky; /* 滚动到顶部时自动吸住 */
  top: 0;
  z-index: 100;
}
.nav p {
  padding: 10px 0;
  font-weight: 600;
  margin-left: 30px;
}
.time {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px;
  color: grey;
}

.Merchant {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 15px;
}

.Merchant img {
  height: 50px;
  width: 50px;
  border-radius: 10px;
  flex-shrink: 0;
}
.mc {
  color: grey;
}
.message {
  background-color: rgb(250, 244, 237);
  border-radius: 10px;
  padding: 15px;
  margin-left: 10px;
}

.buyer {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  margin: 0 15px;
}
.buyer img {
  height: 50px;
  width: 50px;
  border-radius: 10px;
  flex-shrink: 0;
}
.msg {
  background-color: rgb(250, 244, 237);
  border-radius: 10px;
  padding: 15px;
  margin-right: 10px;
}
.keyword {
  background-color: white;
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px 15px;
}
:deep(.van-search) {
  width: 300px;
}
</style>

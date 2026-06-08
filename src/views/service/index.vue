<template>
  <div class="chat">
    <div class="nav">
      <van-icon name="arrow-left" size="25px" @click="router.back()" />
      <p>官方客服</p>
      <van-icon
        name="wap-home-o"
        size="25px"
        @click="router.push('/home/recommend')"
      />
    </div>
    <div class="content-left">
      <div class="time">5月23日10:14</div>
      <div class="Merchant">
        <img src="" alt="" />
        <div class="info">
          <p class="mc">官方客服</p>
          <div class="message">
            <p>请问有什么需要帮助的吗？</p>
          </div>
        </div>
      </div>
    </div>
    <div class="content-right">
      <div class="time">5月23日10:14</div>
      <div class="buyer">
        <div class="msg">防辐射地方都是vs的</div>
        <img src="" alt="" />
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
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { getMessage } from "../../api/message";
const router = useRouter();
// const merchantId = route.query.merchantId;

// const chatList = ref([]);
// const chatInfo = ref({});

// onMounted(async () => {
//   const res = await getMessage(merchantId);
//   chatList.value = res.messages;
//   chatInfo.value = res.merchants;
// });
</script>

<style scoped>
.nav {
  font-size: 20px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  padding: 15px;
  position: sticky; /* 滚动到顶部时自动吸住 */
  top: 0;
  z-index: 100;
}
.nav p {
  padding: 10px 0;
  font-weight: 600;
}
.time {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px;
  color: grey;
}
.info {
  margin-left: 10px;
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
}
.new {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
}
.card {
  margin-top: 10px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
}
.card img {
  height: 80px;
  width: 80px;
  border-radius: 10px;
  flex-shrink: 0;
}
.introduce {
  margin-left: 10px;
}
.introduce p:first-child {
  font-weight: 600;
}
.introduce p:nth-child(2) {
  color: grey;
  font-size: 15px;
}
.introduce p:last-child {
  color: rgb(255 118 20);
  font-size: 19px;
  margin-top: 15px;
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

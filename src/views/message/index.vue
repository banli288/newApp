<template>
  <div class="message-page">
    <div class="nav">
      <p>消息</p>
    </div>
    <!-- //tab栏切换 -->
    <van-tabs v-model:active="active" sticky :offset-top="50">
      <van-tab title="私信">
        <van-cell-group>
          <van-cell
            v-for="item in messageList"
            :key="item.id"
            @click="router.push('/chat')"
          >
            <van-swipe-cell>
              <div class="container">
                <van-badge :content="item.unreadCount">
                  <div class="child" />
                  <van-image
                    round
                    width="4rem"
                    height="4rem"
                    src="item.merchantLogo"
                  />
                </van-badge>
                <div class="goods-card">
                  <div class="goods-card-left">
                    <p>{{ item.merchantName }}</p>
                    <p>{{ item.lastMessage }}</p>
                  </div>
                  <div class="goods-card-right">
                    <p>{{ item.lastMessageTime }}</p>
                  </div>
                </div>
              </div>

              <template #right>
                <van-button
                  square
                  text="删除"
                  type="danger"
                  class="delete-button"
                ></van-button>
              </template>
            </van-swipe-cell>
          </van-cell>
        </van-cell-group>
      </van-tab>
      <van-tab title="系统通知">
        <van-cell-group>
          <van-cell
            v-for="item in notifyList"
            :key="item.id"
            @click="router.push('/notify')"
          >
            <div class="notify">
              <div class="notify-left">
                <p>{{ item.title }}</p>
                <p>{{ item.content }}</p>
              </div>
              <div class="notify-right">
                <!-- <p>{{ item.time }}</p> -->
              </div>
            </div>
          </van-cell>
        </van-cell-group>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { getMessage, getNotification, postMessage } from "../../api/message";

const router = useRouter();
const active = ref(0);

const messageList = ref([]);
onMounted(async () => {
  messageList.value = await getMessage();
});

const notifyList = ref([]);
onMounted(async () => {
  notifyList.value = await getNotification();
});
</script>

<style scoped>
.message-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  /* overflow: hidden; */
}

.message-page .van-tabs {
  flex: 1;
  overflow-y: auto;
}

.nav {
  font-size: 20px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(255 118 20);
  color: aliceblue;
  position: sticky; /* 滚动到顶部时自动吸住 */
  top: 0;
  z-index: 100;
}

.nav p {
  padding: 10px 0;
}
.van-tabs__line {
  color: rgb(226, 101, 12) !important;
  background-color: red;
}

.delete-button {
  height: 100%;
}
.van-cell {
  margin: 10px;
  padding: 10px 0;
}
.container {
  display: flex;
  align-items: center;
}

.goods-card {
  display: flex;
  text-align: left;
  line-height: 50px;
  height: 85px;
  width: 100%;
  margin-left: 5px;
  background-color: white;
  justify-content: space-between;
}
.goods-card-right {
  flex-shrink: 0;
  margin-right: 20px;
}
.goods-card-right p {
  text-align: center;
}
.goods-card-left {
  flex: 1;
}
.goods-card-left p {
  margin: -8px 11px;
}
.goods-card-left p:first-child {
  font-weight: 600;
  font-size: large;
  color: black;
}
.notify {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.notify-left {
  flex: 1;
  text-align: left;
}
.notify-left p:first-child {
  font-weight: 600;
  font-size: large;
  color: black;
}
.notify-right {
  flex-shrink: 0;
  text-align: right;
  margin-right: 20px;
}
</style>

<template>
  <div class="message-page">
    <div class="nav">
      <p>消息</p>
    </div>
    <!-- //tab栏切换 -->
    <van-tabs v-model:active="active">
      <van-tab title="私信">
        <van-cell-group>
          <van-cell v-for="item in messageList" :key="item.id">
            <van-swipe-cell>
              <div class="container">
                <van-badge :content="item.unread">
                  <div class="child" />
                  <van-image
                    round
                    width="4rem"
                    height="4rem"
                    src="item.avatar"
                  />
                </van-badge>
                <div class="goods-card">
                  <div class="goods-card-left">
                    <p>{{ item.name }}</p>
                    <p>{{ item.lastMessage }}</p>
                  </div>
                  <div class="goods-card-right">
                    <p>{{ item.time }}</p>
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
          <van-cell v-for="item in notifyList" :key="item.id">
            <div class="notify">
              <div class="notify-left">
                <p>{{ item.title }}</p>
                <p>{{ item.content }}</p>
              </div>
              <div class="notify-right">
                <p>{{ item.time }}</p>
              </div>
            </div>
          </van-cell>
        </van-cell-group>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup>
import { ref } from "vue";

const active = ref(0);

const messageList = ref([
  {
    id: 1,
    name: "华为官方旗舰店",
    avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
    lastMessage: "亲，您的订单已发货，请注意查收~",
    time: "12:30",
    unread: 3,
  },
  {
    id: 2,
    name: "小米之家",
    avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
    lastMessage: "感谢您的好评，期待下次光临！",
    time: "昨天",
    unread: 0,
  },
  {
    id: 3,
    name: "Nike运动旗舰店",
    avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
    lastMessage: "这款鞋有42码的库存吗？",
    time: "昨天",
    unread: 1,
  },
  {
    id: 4,
    name: "三只松鼠旗舰店",
    avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
    lastMessage: "满199减50活动进行中，快来选购吧！",
    time: "周一",
    unread: 0,
  },
  {
    id: 5,
    name: "优衣库官方店",
    avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
    lastMessage: "您咨询的羽绒服已补货，尺码齐全",
    time: "05/15",
    unread: 5,
  },
  {
    id: 6,
    name: "苹果授权专营店",
    avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
    lastMessage: "iPhone 16 Pro Max 预约成功",
    time: "05/14",
    unread: 0,
  },
]);

const notifyList = ref([
  {
    id: 1,
    title: "订单发货通知",
    content: "您的订单 #20260515001 已发货，预计3天内送达",
    time: "12:45",
    unread: true,
  },
  {
    id: 2,
    title: "优惠券到账",
    content: "恭喜获得满200减30优惠券，有效期至05/31",
    time: "10:20",
    unread: true,
  },
  {
    id: 3,
    title: "退款成功",
    content: "订单 #20260510008 退款 ¥99.00 已原路返回",
    time: "昨天",
    unread: false,
  },
  {
    id: 4,
    title: "活动提醒",
    content: "618年中大促即将开启，提前加购享优先发货",
    time: "昨天",
    unread: false,
  },
  {
    id: 5,
    title: "账号安全",
    content: "检测到新设备登录，如非本人操作请及时修改密码",
    time: "05/15",
    unread: false,
  },
  {
    id: 6,
    title: "会员升级",
    content: "恭喜升级为黄金会员，享专属95折优惠",
    time: "05/14",
    unread: false,
  },
]);
</script>

<style scoped>
.message-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
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

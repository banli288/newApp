<template>
  <div class="title">
    <div class="nav">
      <span
        v-for="tab in tabs"
        :key="tab.id"
        @click="tabChange(tab.id, tab.path)"
        :class="{ active: activeIndex === tab.id }"
      >
        {{ tab.name }}</span
      >
    </div>
    <div>
      <!-- //导航栏 -->
      <van-search
        v-model="value"
        placeholder="搜索喜欢的宠物或商家"
        @search="onSearch"
        @cancel="onCancel"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
//导航栏
const tabs = [
  { id: 1, name: "直播", path: "live" },
  { id: 2, name: "关注", path: "follow" },
  { id: 3, name: "分类", path: "category" },
  { id: 4, name: "推荐", path: "" },
];
const activeIndex = ref(4);
const tabChange = (index, path) => {
  activeIndex.value = index;

  router.push("/home/" + path);
  //返回顶部
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
//搜索栏
const value = ref("");
const onSearch = (val) => showToast(val);
const onCancel = () => showToast("取消");
</script>

<style>
/* //导航栏 */

.van-search__content {
  border: 2px solid #ff870f;
  border-radius: 20px;
}
.nav {
  height: 50px;
  background-color: rgb(255 118 20);
  display: flex;
  align-items: center;
}
.title {
  position: sticky; /* 滚动到顶部时自动吸住 */
  top: 0;
  z-index: 100;
}

.nav span {
  flex: 1;
  text-align: center;
  color: #fff;
  padding: 8px 0;
  font-size: 20px;
  margin: 0 10px;
}
.nav span.active {
  color: aliceblue;
  background-color: rgb(255, 168, 105);
}
</style>

<template>
  <div class="edit">
    <div class="nav">
      <van-icon name="arrow-left" size="25px" @click="router.back()" />
      <p>地址编辑</p>
    </div>
    <van-address-edit
      :area-list="areaList"
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { showToast } from "vant";
import { useRouter } from "vue-router";

const router = useRouter();

const searchResult = ref([]);
const onSave = () => showToast("save");
const onDelete = () => showToast("delete");
const onChangeDetail = (val) => {
  if (val) {
    searchResult.value = [
      {
        name: "黄龙万科中心",
        address: "杭州市西湖区",
      },
    ];
  } else {
    searchResult.value = [];
  }
};
</script>

<style scoped>
.nav {
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 30px;
  padding: 15px;
}
.nav p {
  font-size: 20px;
}
</style>

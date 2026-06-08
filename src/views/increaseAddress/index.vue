<template>
  <div class="increaseAddress">
    <div class="order">
      <van-icon name="arrow-left" size="25px" @click="router.back()" />
      <div>新增地址</div>
    </div>
    <div class="field">
      <van-field v-model="text" label="姓名" />
      <van-field v-model="tel" type="tel" label="手机号" />
    </div>
    <div class="new">
      <van-field
        v-model="fieldValue"
        is-link
        readonly
        label="地区"
        placeholder="请选择所在地区"
        @click="show = true"
      />
      <van-popup v-model:show="show" round position="bottom">
        <van-cascader
          v-model="cascaderValue"
          title="请选择所在地区"
          :options="options"
          @close="show = false"
          @finish="onFinish"
        />
      </van-popup>
    </div>
    <div class="field">
      <van-field v-model="detailAddress" type="tel" label="详细地址" />
    </div>

    <div class="button"><button @click="a">保存</button></div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref, onMounted, computed, onUnmounted } from "vue";
import { useCascaderAreaData } from "@vant/area-data";
import { defineNewAddressStore } from "../../stores/user";
import { getUserAddress, postUserAddress } from "../../api/user";
import bus from "../../utils/eventBus";

const router = useRouter();
const show = ref(false);
const fieldValue = ref("");
const cascaderValue = ref("");
const options = useCascaderAreaData();
const text = ref("");
const tel = ref("");
const detailAddress = ref("");
const newAddress = ref({});
const addressDataList = ref([]);

const a = async () => {
  router.back();
  newAddress.value.name = text.value;
  newAddress.value.phone = tel.value;
  newAddress.value.address = `${fieldValue.value}${detailAddress.value}`;
  await postUserAddress(newAddress.value);
  // console.log(newAddress.value);
};
onMounted(async () => {
  bus.on("brotherData", (data) => {
    addressDataList.value = data;
  });
  addressDataList.value = await getUserAddress();
});
onUnmounted(() => {
  bus.off("brotherData");
});
const onFinish = ({ selectedOptions }) => {
  show.value = false;
  fieldValue.value = selectedOptions.map((option) => option.text).join("/");
};
</script>

<style scoped>
.order {
  display: flex;
  align-items: center;
  justify-content: left;
  padding: 15px;
  background-color: white;
  gap: 15px;
  font-size: 18px;
}
:deep(.van-field) {
  margin-bottom: 1px;
}
.button {
  display: flex;
  align-items: center;
  justify-content: center;
}
.button button {
  background-color: #ff8001;
  border: 0;
  color: white;
  height: 45px;
  width: 380px;
  margin-top: 15px;
  border-radius: 20px;
  font-size: 17px;
}
.field :deep(.van-field) {
  font-size: 17px;
  padding: 15px;
}
:deep(.van-field__label) {
  font-size: 17px;
}
</style>

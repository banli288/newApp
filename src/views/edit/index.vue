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
      :address-info="addressInfo"
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { showToast } from "vant";
import { useRouter } from "vue-router";
import { areaList } from "@vant/area-data";
import { defineNewAddressStore } from "../../stores/user";
import { patchUserAddress } from "../../api/user";

const router = useRouter();
const defineNewAddress = defineNewAddressStore();
const searchResult = ref([]);

const oldAddress = defineNewAddress.shareData;

const str = oldAddress.address ?? "";

const addressInfo = computed(() => {
  if (typeof str !== "string" || !str) {
    console.log(121);
    return { province: "", city: "", district: "", addressDetail: "" };
  }
  const regex =
    /^(?<province>[^省]+省|.+自治区|北京|上海|天津|重庆)?(?<city>[^市]+市|[^自治州]+自治州|[^盟]+盟|.*地区|.*行政单位)?(?<district>[^县]+县|[^市]+市|[^区]+区|[^镇]+镇|[^乡]+乡|.+场|.+旗)?(?<detail>.*)$/;
  const match = str.match(regex);
  if (match && match.groups) {
    return {
      name: oldAddress.name,
      tel: oldAddress.phone,
      province: match.groups.province || "",
      city: match.groups.city || "",
      district: match.groups.district || "",
      addressDetail: match.groups.detail.trim(),
    };
  }
  return { province: "", city: "", district: "", addressDetail: "" };
});

// addressInfo = { ...addressInfo, name: oldAddress.name, tel: oldAddress.phone };

const onSave = async (content) => {
  const patchData = {
    name: content.name,
    phone: content.tel,
    address: `${content.province}${content.city}${content.district}${content.addressDetail}`,
    isDefault: content.isDefault,
  };
  const id = oldAddress.id;
  if (!id) {
    showToast("id地址不存在");
    return;
  }
  await patchUserAddress(id, patchData);
  showToast("修改成功");
};
const onDelete = () => showToast("已删除");
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
:deep(.van-button--primary) {
  background-color: #ff8001;
  border: 0;
}
</style>

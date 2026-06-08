<template>
  <div class="address">
    <div class="order">
      <div class="order-left">
        <van-icon name="arrow-left" size="25px" @click="router.back()" />
        <div>收货地址</div>
      </div>
      <div class="order-right">
        <van-icon name="search" size="25px" />
        <p @click="getManage">{{ manage ? "完成" : "管理" }}</p>
        <p @click="router.push('/increaseAddress')">新增地址</p>
      </div>
    </div>
    <div class="address-list">
      <div class="card" v-for="item in addressList" :key="item.id">
        <van-checkbox
          style="flex-shrink: 0"
          v-if="manage"
          v-model="item.checked"
        ></van-checkbox>
        <div class="card-left">
          <div>
            <span>{{ item.name }}</span> <span>{{ item.phone }}</span>
          </div>
          <div>
            <span>{{ item.address }}</span>
          </div>
          <!-- <div><span>建鑫社区</span> <span>2栋</span></div> -->
        </div>
        <div class="card-right">
          <van-icon name="records-o" size="20px" @click="editAddress(item)" />
        </div>
      </div>
      <div v-if="manage" class="delete">
        <van-checkbox v-model="checkedList">全选</van-checkbox>
        <button @click="deleteCheck">删除</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import {
  getUserAddress,
  deleteUserAddress,
  postUserAddress,
} from "../../api/user";
import { ref, onMounted, computed } from "vue";
import { defineNewAddressStore } from "../../stores/user";
import bus from "../../utils/eventBus";

console.log("[EventBus Debug]", typeof bus, bus);

const router = useRouter();
const addressList = ref([]);
const manage = ref(false);
const checked = ref(false);
const defineNewAddress = defineNewAddressStore();

bus.emit("brotherData", addressList.value);
// console.log("[Pre-Emit Check]", {
//   busType: typeof bus,
//   hasEmit: typeof bus?.emit === "function",
//   dataType: typeof addressList,
// });

// };
const editAddress = (item) => {
  router.push("/edit");
  console.log(item);
  defineNewAddress.updateData(item);
};
const getManage = () => {
  manage.value = !manage.value;
};

onMounted(async () => {
  addressList.value = await getUserAddress();
});

const checkedList = computed({
  get() {
    if (!addressList.value.length) false;
    return addressList.value.every((item) => item.checked);
  },
  set(value) {
    // console.log(111);
    // console.log(addressList.value);

    addressList.value.forEach((item) => {
      item.checked = value;
    });
  },
});
const deleteCheck = async () => {
  const deleteList = [];
  addressList.value.forEach((item) => {
    if (item.checked) {
      deleteList.push(item.id);
    }
  });
  if (deleteList.length === 0) return;
  const allDeleteRequest = deleteList.map((id) => deleteUserAddress(id));
  await Promise.all(allDeleteRequest);

  addressList.value = await getUserAddress();
};
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
  gap: 10px;
  background-color: white;
  padding: 15px 20px;
  margin-bottom: 3px;
}
.card-left {
  min-width: 0;
  flex: 1;
}
.card-left div:first-child {
  font-size: 18px;
  margin-bottom: 10px;
  font-weight: 600;
}
.card-left span {
  margin-right: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.card-left div:nth-child(2) {
  font-size: 15px;
  margin-bottom: 6px;
}
.card-right {
  position: absolute;
  right: 10px;
}
.delete {
  background-color: white;
  height: 60px;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
}
.delete :deep(.van-checkbox__label) {
  color: #ff8001;
  font-size: large;
}
.delete button {
  background-color: #ff8001;
  border: 0;
  padding: 8px 12px;
  border-radius: 8px;
  color: white;
}
.address-list {
  padding-bottom: 60px;
}
</style>

import { defineStore } from "pinia";
import { ref } from "vue";

export const defineNewAddressStore = defineStore("address", () => {
  const shareData = ref([]);

  const updateData = (newData) => {
    shareData.value = newData;
  };

  const logistics_status = {
    created: '已下单',
    picked: '已揽收',
    in_transit: '运输中',
    arrived: '派送中'
  }
  return {
    shareData,
    updateData,
    logistics_status
  };
});

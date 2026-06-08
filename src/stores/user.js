import { defineStore } from "pinia";
import { ref } from "vue";

export const defineNewAddressStore = defineStore("address", () => {
  const shareData = ref([]);

  const updateData = (newData) => {
    shareData.value = newData;
  };

  return {
    shareData,
    updateData,
  };
});

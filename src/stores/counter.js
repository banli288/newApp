import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  const tabs = ref([
    { id: 1, name: "猫咪", icon: "#icon-maomi-copy" },
    { id: 2, name: "狗狗", icon: "#icon-gougou" },
    { id: 3, name: "小鸟", icon: "#icon-niao" },
    { id: 4, name: "鱼苗", icon: "#icon-yu" },
    { id: 5, name: "鼠鼠", icon: "#icon-shushu" },
    { id: 6, name: "兔子", icon: "#icon-tuzi" },
    { id: 7, name: "鸡鸭", icon: "#icon-xiaoji" },
    { id: 8, name: "其他", icon: "#icon-qita" },
  ]);
  return {
    tabs
  }
}
)
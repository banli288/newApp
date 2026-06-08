<template>
  <div>
    父组件
    <p>子组件传过来的数据：{{ newData }}</p>
    <son :farData="father" @update="receive" v-model="far" />
  </div>
</template>

<script setup>
import { provide, ref } from "vue";
import son from "./son/index.vue";

const father = ref("父亲");
const far = ref("双向绑定666");
const grand = ref("传给孙子的数据");
const newData = ref();

// provide('')

const receive = (data) => {
  newData.value = data;
};
</script>

<style scoped>
div {
  width: 200px;
  height: 200px;
  /* background-color: pink; */
}
</style>

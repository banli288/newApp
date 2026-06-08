<template>
  <div>
    子组件:
    <p>父组件传过来的数据：{{ farData }}</p>
    <p>双向绑定：{{ REF }}</p>
    <button @click="updateData">action</button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const son = ref(12);
const props = defineProps({
  farData: String,
});
const REF = defineModel();

const emit = defineEmits(["update"]);
const updateData = () => {
  emit("update", son);
};
</script>

<style scoped>
div {
  width: 300px;
  height: 300px;
  background-color: aquamarine;
}
</style>

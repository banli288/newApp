<template>
  <van-search
    v-model="value"
    :placeholder="placeholder"
    shape="round"
    background="transparent"
    @search="$emit('search', value)"
  />
</template>

<script setup>
import { ref } from "vue";

defineProps({
  placeholder: {
    type: String,
    default: "搜索商品",
  },
});

defineEmits(["search"]);

const value = ref("");
</script>

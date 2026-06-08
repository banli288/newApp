<template>
  <div class="waterfall">
    <div
      class="item"
      v-for="item in List"
      :key="item.id"
      @click="routerCard(item.id)"
    >
      <img :src="item.images" />
      <p>{{ item.name }}</p>
      <div class="item-span">
        <span>￥{{ item.price }}</span>
        <span>已售{{ item.sales }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
defineProps({
  List: {
    type: Array,
    required: true,
  },
});

const routerCard = (id) => {
  router.push(`/card/${id}`);
};
</script>

<style scoped>
.waterfall {
  columns: 2; /* 两列 */
  column-gap: 8px; /* 列间距 */
  padding: 5px 10px;
  background-color: white;
  margin: 0 5px;
}
.item {
  break-inside: avoid; /* 防止卡片被拆到两列 */
  margin-bottom: 8px;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
}
.item img {
  width: 100%;
}
.item .item-span {
  display: flex;
  align-items: center;
}
.item-span span {
  flex: 1;
  justify-content: space-between;
  margin-left: 5px;
}
.item span:first-child {
  color: #ff870f;
  font-size: 20px;
}
.item p {
  margin-left: 5px;
}
</style>

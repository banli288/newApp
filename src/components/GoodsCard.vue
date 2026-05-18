<template>
  <div class="goods-card" @click="$router.push(`/goods/${goods.id}`)">
    <img class="goods-img" :src="goods.image" :alt="goods.name" />
    <div class="goods-info">
      <div class="goods-name">{{ goods.name }}</div>
      <div class="goods-price">
        <span class="price">¥{{ goods.price }}</span>
        <span class="original-price" v-if="goods.originalPrice">¥{{ goods.originalPrice }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  goods: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.goods-card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
}
.goods-img {
  width: 100%;
  height: 170px;
  object-fit: cover;
}
.goods-info {
  padding: 8px;
}
.goods-name {
  font-size: 14px;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.goods-price {
  margin-top: 6px;
}
.price {
  font-size: 16px;
  font-weight: bold;
  color: #ee0a24;
}
.original-price {
  font-size: 12px;
  color: #999;
  text-decoration: line-through;
  margin-left: 6px;
}
</style>

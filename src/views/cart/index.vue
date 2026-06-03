<template>
  <div class="nav">
    <p>购物车</p>
  </div>
  <div class="check-all" @click="isManage = !isManage">
    <van-icon name="apps-o" />
    <span>{{ isManage ? "完成" : "管理" }}</span>
  </div>
  <div class="background">
    <div class="cartList" v-for="shop in cartData" :key="shop.merchantId">
      <p class="cartTitle">
        <van-checkbox
          v-model="shop.checked"
          @change="onShopCheck(shop)"
          checked-color="rgb(255 118 20)"
        >
          <span>{{ shop.merchantName }}</span>
        </van-checkbox>
      </p>
      <div class="cart" v-for="item in shop.items" :key="item.id">
        <van-checkbox
          v-model="item.checked"
          @change="onItemCheck(shop)"
          checked-color="rgb(255 118 20)"
        >
          <van-card
            :title="item.product.name"
            :desc="item.product.description"
            :price="item.product.price"
            :thumb="item.product.images"
          >
            <template #footer>
              <van-stepper
                v-model="item.quantity"
                theme="round"
                button-size="22"
                disable-input
              />
            </template>
          </van-card>
        </van-checkbox>
      </div>
    </div>
    <div class="submit">
      <van-submit-bar
        v-if="!isManage"
        :price="totalPrice"
        button-text="提交订单"
        @submit="router.push('/close')"
        style="bottom: 50px"
      >
        <van-checkbox v-model="isAllChecked">全选</van-checkbox>
        <template #tip>
          你的收货地址不支持配送, <span @click="onClickLink">修改地址</span>
        </template>
      </van-submit-bar>
      <van-submit-bar
        v-else
        button-text="删除"
        @submit="onDelete"
        style="bottom: 50px"
        class="cart-submit-bar"
      >
        <van-checkbox v-model="isAllChecked">全选</van-checkbox>
      </van-submit-bar>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { getCartList, postCart, patchCart, deleteCart } from "../../api/cart";

const checked = ref(true);
const router = useRouter();
const cartData = ref([]);
const isManage = ref(false);

const isAllChecked = computed({
  get() {
    if (!cartData.value.length) return false;
    return cartData.value.every(
      (shop) => shop.checked && shop.items.every((item) => item.checked)
    );
  },
  set(value) {
    cartData.value.forEach((shop) => {
      shop.checked = value;
      shop.items.forEach((item) => {
        item.checked = value;
      });
    });
  },
});

const onShopCheck = (shop) => {
  shop.items.forEach((item) => {
    item.checked = shop.checked;
  });
};
const onItemCheck = (shop) => {
  shop.checked = shop.items.every((item) => item.checked);
};
const totalPrice = computed(() => {
  let total = 0;
  cartData.value.forEach((shop) => {
    shop.items.forEach((item) => {
      if (item.checked) {
        total += item.product.price * item.quantity;
      }
    });
  });
  return Math.round(total * 100);
});

onMounted(async () => {
  cartData.value = await getCartList();
});

const onDelete = async () => {
  const selectCart = [];
  cartData.value.forEach((shop) => {
    shop.items.forEach((item) => {
      if (item.checked) selectCart.push(item.id);
    });
  });
  // console.log("要删除的ID:", selectCart);

  if (selectCart.length === 0) return;
  //删除接口
  const deleteManage = selectCart.map((id) => deleteCart(id));
  await Promise.all(deleteManage);
};
</script>

<style scoped>
.nav {
  font-size: 20px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(255 118 20);
  color: aliceblue;
  position: sticky; /* 滚动到顶部时自动吸住 */
  top: 0;
  z-index: 100;
}
.nav p {
  padding: 10px 0;
}
span {
  margin-left: 8px;
}
.check-all {
  background-color: white;
  padding-left: 10px;
  height: 50px;
  padding: 12px 15px;
  font-size: large;
  font-weight: 500;
  color: rgb(249, 112, 14);
}
.cart {
  width: 410px;
  /* background-color: rgb(252, 239, 220); */
  margin: 0 10px;
  padding: 0 10px;
}

.cardList {
  margin: 0 10px;
}
.backgound {
  background-color: rgb(239, 165, 67);
}
.cartTitle {
  padding: 0 5px;
  background-color: rgb(252, 239, 220);
  border-radius: 10px;
  margin: 10px 15px 0;
}
:deep(.van-checkbox) {
  /* width: 100%; */
  /* margin-left: 15px; */
  padding: 10px 0;
}
:deep(.van-checkbox__label) {
  width: 100%;
  margin-left: 0;
}
:deep(.van-card) {
  width: 100%;
  box-sizing: border-box;
  /* background-color: rgb(247, 232, 211); */
}
:deep(.van-card__footer) {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
/* .submit :deep(.van-checkbox) {
  margin-left: 16px;
} */
:deep(.cart-submit-bar .van-checkbox) {
  margin-right: 240px;
}
</style>

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
          <span @click="goMerchant(shop.merchantId)">{{
            shop.merchantName
          }}</span>
        </van-checkbox>
      </p>
      <div class="cart" v-for="item in shop.items" :key="item.id">
        <!-- <van-checkbox
          v-model="item.checked"
          @change="onItemCheck(shop)"
          checked-color="rgb(255 118 20)"
        >
          <van-card
            :title="item.product.name"
            :desc="item.product.description"
            :price="item.product.price"
            :thumb="item.product.images[0]"
            @click="goCard(item.product.id)"
          >
            <template #footer>
              <van-stepper
                v-model="item.quantity"
                theme="round"
                button-size="22"
                disable-input
                @change="(value) => onPatch(item.id, value)"
              />
            </template>
          </van-card>
        </van-checkbox> -->
        <div class="checkBox">
          <van-checkbox
            v-model="item.checked"
            @change="onItemCheck(shop)"
            checked-color="rgb(255 118 20)"
          ></van-checkbox>
          <img
            :src="item.product.images[0]"
            @click="goCard(item.product.id)"
            alt=""
          />
          <div class="info" @click="goCard(item.product.id)">
            <p>{{ item.product.name }}</p>
            <p>{{ item.product.description }}</p>
            <p>￥{{ item.product.price }}</p>
          </div>
          <div class="stepper">
            <van-stepper
              v-model="item.quantity"
              @change="(value) => onPatch(item.id, value)"
              button-size="22"
              theme="round"
              disable-input
            />
          </div>
        </div>
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
  <div style="height: 60px"></div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { getCartList, postCart, patchCart, deleteCart } from "../../api/cart";

function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

const checked = ref(true);
const router = useRouter();
const route = useRouter();
const cartData = ref([]);
const isManage = ref(false);

// const postData = route.params.id;
// console.log(postData);

const goMerchant = (id) => {
  router.push(`/merchant/${id}`);
};

const goCard = (id) => {
  router.push(`/card/${id}`);
};

onMounted(async () => {
  cartData.value = await getCartList();
});

const isAllChecked = computed({
  get() {
    if (!cartData.value.length) return false;
    return cartData.value.every(
      (shop) => shop.checked && shop.items.every((item) => item.checked),
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
  cartData.value = await getCartList();
};

const onPatch = debounce(async (id, quantity) => {
  await patchCart(id, quantity);
}, 300);
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
  margin: 0 8px;
}

.cartTitle {
  padding: 0 5px;
  background-color: rgb(252, 239, 220);
  border-radius: 10px 10px 0 0;
  margin: 8px 8px 0;
}
.checkBox {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 5px;
  background-color: white;
  margin-bottom: 2px;
}
.checkBox img {
  width: 80px;
  height: 80px;
  border-radius: 20px;
}
.info {
  flex: 1;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.info p:first-child {
  font-weight: bold;
}
.info p:nth-child(2) {
  font-size: small;
  color: gray;
}
.info p:last-child {
  color: rgb(249, 112, 14);
}
:deep(.van-checkbox) {
  padding: 10px 0;
}
:deep(.van-checkbox__label) {
  width: 100%;
  margin-left: 0;
}
</style>

import request from "@/utils/request";

export function getCartList() {
  return request({
    url: "/cart",
    method: "get",
  });
}

export function deleteCart(id) {
  return request({
    url: `/cart/${id}`,
    method: "delete",
  });
}
export function postCart(productId, quantity = 1, merchantId) {
  return request({
    url: `/cart`,
    method: "post",
    data: { productId, quantity, merchantId },
  });
}
export function patchCart(id, quantity) {
  return request({
    url: `/cart/${id}`,
    method: "patch",
    data: { quantity },
  });
}

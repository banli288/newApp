import request from "@/utils/request";

//get
export function getUserInfo() {
  return request({
    url: "/user/info",
    method: "get",
  });
}
export function getUserAddress() {
  return request({
    url: "/user/addresses",
    method: "get",
  });
}
export function getUserOrder() {
  return request({
    url: "/user/orders",
    method: "get",
  });
}
export function getUserFav(page = 1, limit = 10) {
  return request({
    url: "/user/favorites",
    method: "get",
    params: { page: 1, limit: 10 },
  });
}
export function getProductDetail(id) {
  return request({
    url: `/home/products/${id}`,
    method: "get",
  });
}

//post
export function postUserAddress(data) {
  return request({
    url: "/user/addresses",
    method: "post",
    data,
  });
}
export function postUserOrder() {
  return request({
    url: "/user/orders",
    method: "post",
  });
}
export function postUserFav() {
  return request({
    url: "/user/favorites",
    method: "post",
  });
}
//patch
export function patchUserAddress(id, data) {
  return request({
    url: `/user/addresses/${id}`,
    method: "patch",
    data,
  });
}
//delete
export function deleteUserAddress(id) {
  return request({
    url: `/user/addresses/${id}`,
    method: "delete",
  });
}
export function deleteUserFav(id) {
  return request({
    url: `/user/favorites/${id}`,
    method: "delete",
  });
}

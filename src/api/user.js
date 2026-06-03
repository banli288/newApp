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
export function getUserFav() {
  return request({
    url: "/user/favorites",
    method: "get",
  });
}
//post
export function postUserAddress() {
  return request({
    url: "/user/addresses",
    method: "post",
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
export function patchUserAddress(id) {
  return request({
    url: "/user/addresses/{id}",
    method: "patch",
  });
}
//delete
export function deleteUserAddress(id) {
  return request({
    url: "/user/addresses/{id}",
    method: "delete",
  });
}
export function deleteUserFav(id) {
  return request({
    url: "/user/favorites/{id}",
    method: "delete",
  });
}

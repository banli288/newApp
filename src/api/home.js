import request from "@/utils/request";

export function getGoodList() {
  return request({
    url: "/home/carousels",
    method: "get",
  });
}

export function getImageList(page = 1, limit = 10) {
  return request({
    url: "/home/products",
    method: "get",
    params: { page: 1, limit: 10 },
  });
}

export function getCategory() {
  return request({
    url: "/home/categories",
    method: "get",
  });
}

export function getLiveList() {
  return request({
    url: "/home/live-rooms",
    method: "get",
  });
}

export function getPostList() {
  return request({
    url: "/home/posts",
    method: "get",
  });
}
export function getMerchantDetail(id) {
  return request({
    url: `/home/merchants/${id}`,
    method: "get",
  });
}

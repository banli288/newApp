import request from "@/utils/request";

export function getMessage() {
  return request({
    url: "/message/list",
    method: "get",
  });
}
export function getNotification() {
  return request({
    url: "/message/notifications",
    method: "get",
  });
}
export function postMessage() {
  return request({
    url: "/message",
    method: "post",
  });
}
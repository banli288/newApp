import request from "@/utils/request";

export const getMessage = () => request.get("/message/list");

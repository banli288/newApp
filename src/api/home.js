import request from "@/utils/request";

export const getGoodList = () => request.get("/home/carousels");

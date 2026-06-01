import request from "@/utils/request";

export const getCartList = () => request.get("/cart");

export const deleteCart = () => request.delete("/cart/{id}");

export const postCart = () => request.post("/cart");

export const patchCart = () => request.patch("/cart");

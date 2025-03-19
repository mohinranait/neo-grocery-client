import { instance } from "@/hooks/useAxios";

/**
 * @api {get} Get all orders method
*/
export const getAllOrders = async () => {
    const {data} = await instance.get(`/orders`);
    return data;
}
import { Order } from "@/common/types/orders/order";

export const ordersListReq = async (): Promise<Order[]> => {
  const response = await fetch( "/api/orders", {
    credentials: 'include'
  } );
  const orders = await response.json();

  return orders;
};
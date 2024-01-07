import { Order } from "@/common/types/orders/order";
import { notFound } from "next/navigation";

export const fetchOrderByIdReq = async ( orderId: string ): Promise<Order> => {
  if ( typeof window === 'undefined' ) {
    const response = await fetch( `http://orders-srv.default.svc.cluster.local:3000/api/orders/${ orderId }` );
    const jsonRes = await response.json();

    if ( Array.isArray( jsonRes.errors ) ) {
      console.log(jsonRes.errors);
      return notFound();
    }

    return jsonRes as Order;
  }

  const response = await fetch( `/api/tickets/${ orderId }` );
  const jsonRes = await response.json();

  if ( Array.isArray( jsonRes.errors ) ) {
    return notFound();
  }

  return jsonRes as Order;
};
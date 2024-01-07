import OrderDetails from '@/components/orders/OrderDetails';
import { Suspense } from 'react';

interface OrderShowPageParams {
  params: {
    orderId: string;
  };
}

export default function OrderShowPage({ params }: OrderShowPageParams) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderDetails orderId={params.orderId} />
    </Suspense>
  );
}

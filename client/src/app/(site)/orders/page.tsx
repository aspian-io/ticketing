'use client';

import ListSkeleton from '@/components/common/ListSkeleton';
import OrdersList from '@/components/orders/OrdersList';
import { ordersListReq } from '@/fetch/orders/ordersListReq';
import { Suspense } from 'react';

export default function OrdersShowPage() {
  return (
    <Suspense fallback={<ListSkeleton />}>
      <OrdersList fetchOrders={ordersListReq} />
    </Suspense>
  );
}

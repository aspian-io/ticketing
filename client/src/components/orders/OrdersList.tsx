'use client';

import { Order, OrderStatus } from '@/common/types/orders/order';
import { Card, CardBody, CardFooter, Chip, Divider } from '@nextui-org/react';
import React, { FC, useEffect, useState } from 'react';

interface OrdersListProps {
  fetchOrders: () => Promise<Order[]>;
}

const OrdersList: FC<OrdersListProps> = ({ fetchOrders }) => {
  const [orders, setOrders] = useState<Order[]>();

  useEffect(() => {
    (async () => {
      const res = await fetchOrders();
      setOrders(res);
    })();
  }, [fetchOrders]);

  return (
    <>
      {orders &&
        orders.map((order) => (
          <Card key={order.id} className="mb-3">
            <CardBody className="flex flex-row w-full font-bold pb-7">
              <div className="w-1/2">{order.ticket.title}</div>
              <div className="flex justify-end w-1/2">
                Price:
                <span className="font-normal">&nbsp;{order.ticket.price}$</span>
              </div>
            </CardBody>
            <Divider />
            <CardFooter className="flex justify-end">
              {order.status === OrderStatus.Created && (
                <Chip color="secondary" radius='sm'>Created</Chip>
              )}
              {order.status === OrderStatus.AwaitingPayment && (
                <Chip color="warning" radius='sm'>Awaiting Payment</Chip>
              )}
              {order.status === OrderStatus.Complete && (
                <Chip color="success" radius='sm'>Completed</Chip>
              )}
              {order.status === OrderStatus.Cancelled && (
                <Chip color="danger" radius='sm'>Cancelled</Chip>
              )}
            </CardFooter>
          </Card>
        ))}
    </>
  );
};

export default OrdersList;

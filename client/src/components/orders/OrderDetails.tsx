'use client';

import { useSession } from '@/app/hooks/auth/useSession';
import { Order } from '@/common/types/orders/order';
import { ServerErrors } from '@/common/types/server-errors';
import { stripePaymentReq } from '@/fetch/orders/stripePaymentReq';
import paths from '@/paths';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React, { FC, useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';

interface OrderDetailsProps {
  orderId: string;
}

const OrderDetails: FC<OrderDetailsProps> = ({ orderId }) => {
  const { user } = useSession();
  const [order, setOrder] = useState<Order>();
  const [timeLeft, setTimeLeft] = useState<{
    minutes: number;
    seconds: number;
  }>();
  const [errors, setErrors] = useState<ServerErrors>([]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/orders/${orderId}`);
      const jsonRes = await response.json();

      if (Array.isArray(jsonRes.errors)) {
        return router.push('/404');
      }

      setOrder(jsonRes);
    })();
  }, [orderId, router]);

  useEffect(() => {
    const findTimeLeft = () => {
      if (order) {
        const secondsLeft =
          (new Date(order.expiresAt).getTime() - new Date().getTime()) / 1000;
        const mins = Math.floor(secondsLeft / 60);
        const secs = Math.floor(secondsLeft % 60);

        setTimeLeft({ minutes: mins, seconds: secs });
      }
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [order]);

  return (
    <div className="flex justify-center w-full min-h-72">
      <Card className="w-full">
        <CardHeader className="font-bold text-2xl">
          {order?.ticket.title}
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-col justify-between">
          <div>
            <span className="font-bold me-2">Price: </span>
            {order?.ticket.price}USD
          </div>

          {timeLeft && timeLeft.seconds > 0 && (
            <div className="text-violet-700 font-bold">
              {timeLeft.minutes}:{timeLeft.seconds} until the order expires
            </div>
          )}
          {timeLeft && timeLeft.seconds < 0 && (
            <div className="text-violet-700 font-bold">
              The order has been expired
            </div>
          )}
        </CardBody>
        <Divider />
        <CardFooter>
          {timeLeft && timeLeft.seconds > 0 && order && user && (
            <StripeCheckout
              token={async (token) => {
                try {
                  await stripePaymentReq(token, order.id);
                } catch (error) {
                  return setErrors([{ message: 'Something went wrong' }]);
                }
                router.push(paths.orders());
              }}
              stripeKey={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!}
              amount={order.ticket.price * 100}
              email={user.email}
            />
          )}
          {errors?.length > 0 && (
            <div className="bg-rose-200 text-rose-600 px-4 py-2 border-rose-300 border-1.5 rounded-lg mt-4 shadow-md text-sm">
              <ul className="list-disc list-inside">
                {errors.map((error, idx) => {
                  return <li key={idx}>{error.message}</li>;
                })}
              </ul>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default OrderDetails;

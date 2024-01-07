'use client';

import { ServerErrors } from '@/common/types/server-errors';
import React, { FC, useState } from 'react';
import FormButton from '../common/FormButton';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

interface PurchaseTicketFormProps {
  ticketId: string;
}

const PurchaseTicketForm: FC<PurchaseTicketFormProps> = ({ ticketId }) => {
  const [errors, setErrors] = useState<ServerErrors>([]);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    let orderId: string;
    try {
      const { data: order } = await axios.post(
        '/api/orders',
        { ticketId },
        {
          withCredentials: true,
        }
      );

      console.log('Order id is: ', order.id);
      orderId = order.id;
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMsgs = error.response?.data.errors.map(
          (err: any) => err.message
        );
        const errorObj = [{ message: errorMsgs }];
        setErrors(errorObj);
        return;
      }

      setErrors([{ message: 'Something went wrong. Please try again later.' }]);
      return;
    }

    router.push(`/orders/${orderId}`);
  }

  return (
    <form onSubmit={onSubmit}>
      <FormButton color="secondary" size="md">
        Purchase
      </FormButton>
      {errors?.length > 0 && (
        <div className="bg-rose-200 text-rose-600 px-4 py-2 border-rose-300 border-1.5 rounded-lg mt-5 shadow-md text-sm w-full">
          <ul className="list-disc list-inside">
            {errors.map((error, idx) => {
              return <li key={idx}>{error.message}</li>;
            })}
          </ul>
        </div>
      )}
    </form>
  );
};

export default PurchaseTicketForm;

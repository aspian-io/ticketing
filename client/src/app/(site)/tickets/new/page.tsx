'use client';

import { ServerErrors } from '@/common/types/server-errors';
import CreateTicketForm from '@/components/tickets/CreateTicketForm';
import { createTicketRequest } from '@/fetch/tickets/createTicketReq';
import paths from '@/paths';
import { redirect } from 'next/navigation';
import { useState } from 'react';

export default function NewTicketPage() {
  const [errors, setErrors] = useState<ServerErrors>([]);

  async function formAction(formData: FormData) {
    const title = formData.get('title') as string;
    const price = parseFloat(formData.get('price') as string);

    if (isNaN(price)) return;

    const { errors } = await createTicketRequest(title, price.toFixed(2));
    if (errors?.length) {
      setErrors(errors);
      return;
    }

    redirect(paths.home());
  }
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <div className="mb-7 text-center">
        <h1 className="font-semibold tracking-tight text-2xl">
          Create a New Ticket
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Fill in the form below to create a new ticket.
        </p>
      </div>
      <CreateTicketForm action={formAction} errors={errors} />
    </div>
  );
}

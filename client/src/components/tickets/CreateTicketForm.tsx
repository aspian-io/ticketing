'use client';

import { ServerErrors } from '@/common/types/server-errors';
import paths from '@/paths';
import { Button, Input } from '@nextui-org/react';
import Link from 'next/link';
import { FC } from 'react';
import FormButton from '../common/FormButton';

interface CreateTicketFormProps {
  action: (formData: FormData) => void;
  errors: ServerErrors;
}

const CreateTicketForm: FC<CreateTicketFormProps> = ({ action, errors }) => {
  return (
    <form
      className="flex flex-col justify-center items-center w-full max-w-lg"
      action={action}
    >
      {errors?.length > 0 && (
        <div className="bg-rose-200 text-rose-600 px-4 py-2 border-rose-300 border-1.5 rounded-lg mb-5 shadow-md text-sm w-full">
          <ul className="list-disc list-inside">
            {errors.map((error, idx) => {
              return <li key={idx}>{error.message}</li>;
            })}
          </ul>
        </div>
      )}
      <Input
        isClearable
        name="title"
        id="title"
        size="sm"
        type="text"
        label="Title"
        variant="bordered"
        className="w-full"
      />
      <Input
        isClearable
        name="price"
        id="price"
        size="sm"
        type="number"
        label="Price"
        variant="bordered"
        className="w-full mt-5"
      />
      <FormButton size="lg" radius="sm" className="mt-5 w-full" color="primary">
        Save
      </FormButton>
      <Link href={paths.home()} className="mt-3 w-full">
        <Button
          type="button"
          size="lg"
          radius="sm"
          className="w-full"
          color="primary"
          variant="bordered"
        >
          Cancel
        </Button>
      </Link>
    </form>
  );
};

export default CreateTicketForm;

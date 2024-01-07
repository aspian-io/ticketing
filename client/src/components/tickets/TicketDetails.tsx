import { Ticket } from '@/common/types/tickets/ticket';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from '@nextui-org/react';
import React, { FC } from 'react';
import FormButton from '../common/FormButton';
import PurchaseTicketForm from './PurchaseTicketForm';


interface TicketDetailsProps {
  ticketId: string;
  fetchTicket: (ticketId: string) => Promise<Ticket>;
}

const TicketDetails: FC<TicketDetailsProps> = async ({
  fetchTicket,
  ticketId,
}) => {
  const ticket = await fetchTicket(ticketId);
  return (
    <div className="flex justify-center w-full min-h-72">
      <Card className="w-full">
        <CardHeader className="font-bold text-2xl">{ticket.title}</CardHeader>
        <Divider />
        <CardBody className="flex flex-row">
          <span className="font-bold me-2">Price: </span>
          {ticket.price}USD
        </CardBody>
        <Divider />
        <CardFooter>
          <PurchaseTicketForm ticketId={ticket.id} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default TicketDetails;

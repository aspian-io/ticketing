import { Ticket } from '@/common/types/tickets/ticket';
import paths from '@/paths';
import { Button, Card, CardBody, CardFooter, Divider } from '@nextui-org/react';
import Link from 'next/link';
import React, { FC } from 'react';

interface TicketListProps {
  fetchTickets: () => Promise<Ticket[]>;
}
export const dynamic = 'force-dynamic';
const TicketList: FC<TicketListProps> = async ({ fetchTickets }) => {
  const tickets = await fetchTickets();
  const ticketList = tickets.map((ticket) => (
    <Card key={ticket.id} className="mb-3">
      <CardBody className="flex flex-row w-full font-bold pb-7">
        <div className="w-1/2">{ticket.title}</div>
        <div className="flex justify-end w-1/2">
          Price:<span className="font-normal">&nbsp;{ticket.price}USD</span>
        </div>
      </CardBody>
      <Divider />
      <CardFooter className="flex justify-end">
        <Link href={paths.ticketDetails()} as={`/tickets/${ticket.id}`}>
          <Button type="button" color="secondary" size="sm">
            Details & buy
          </Button>
        </Link>
      </CardFooter>
    </Card>
  ));
  return <>{ticketList}</>;
};

export default TicketList;

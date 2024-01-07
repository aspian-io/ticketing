import TicketDetails from '@/components/tickets/TicketDetails';
import { getSingleTicketReq } from '@/fetch/tickets/getSingleTicketReq';
import { Suspense } from 'react';

interface TicketShowPageParams {
  params: {
    ticketId: string;
  };
}

export default function TicketShowPage({ params }: TicketShowPageParams) {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <TicketDetails
        fetchTicket={getSingleTicketReq}
        ticketId={params.ticketId}
      />
    </Suspense>
  );
}

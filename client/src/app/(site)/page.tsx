import ListSkeleton from '@/components/common/ListSkeleton';
import TicketList from '@/components/tickets/TicketList';
import { ticketListReq } from '@/fetch/tickets/ticketListReq';
import { Suspense } from 'react';

export default async function Home() {
  return (
    <Suspense fallback={<ListSkeleton />}>
      <TicketList fetchTickets={ticketListReq} />
    </Suspense>
  );
}

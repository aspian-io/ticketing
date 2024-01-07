import { Ticket } from "@/common/types/tickets/ticket";

export const ticketListReq = async (): Promise<Ticket[]> => {
  let tickets: Ticket[];
  if ( typeof window === 'undefined' ) {
    const response = await fetch( "http://tickets-srv.default.svc.cluster.local:3000/api/tickets", { cache: 'no-cache' } );
    tickets = await response.json();

    return tickets;
  }

  const response = await fetch( "/api/tickets", { cache: 'no-cache' } );
  tickets = await response.json();

  return tickets;
};
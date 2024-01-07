import { Ticket } from "@/common/types/tickets/ticket";
import { notFound } from "next/navigation";

export const getSingleTicketReq = async ( ticketId: string ): Promise<Ticket> => {
  if ( typeof window === 'undefined' ) {
    const response = await fetch( `http://tickets-srv.default.svc.cluster.local:3000/api/tickets/${ ticketId }` );
    const jsonRes = await response.json();

    if ( Array.isArray( jsonRes.errors ) ) {
      return notFound();
    }

    return jsonRes as Ticket;
  }

  const response = await fetch( `/api/tickets/${ ticketId }` );
  const jsonRes = await response.json();

  if ( Array.isArray( jsonRes.errors ) ) {
    return notFound();
  }

  return jsonRes as Ticket;
};
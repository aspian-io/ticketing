import { ServerErrors } from "@/common/types/server-errors";
import { Ticket } from "@/common/types/tickets/ticket";
import axios, { AxiosError } from "axios";

interface RequestReturnType {
  ticket?: Ticket;
  errors?: ServerErrors;
}

export const createTicketRequest = async ( title: string, price: string ): Promise<RequestReturnType> => {
  
  try {

    const res = await axios.post<Ticket>(
      '/api/tickets',
      { title, price },
      {
        withCredentials: true,
      }
    );

    return { errors: undefined, ticket: res.data };
  } catch ( error ) {
    if ( error instanceof AxiosError ) {
      const errorMsgs = error.response?.data.errors.map( ( err: any ) => err.message );
      console.log(errorMsgs);
      return { errors: [ { message: errorMsgs } ], ticket: undefined };
    }

    return { errors: [ { message: 'Something went wrong. Please try again later.' } ], ticket: undefined };
  }
};
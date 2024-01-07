"use client";

import paths from "@/paths";
import axios, { AxiosError } from "axios";
import { redirect } from "next/navigation";
import { Token } from "react-stripe-checkout";

interface Payment {
  id: string;
}

export const stripePaymentReq = async ( token: Token, orderId: string ): Promise<any> => {

  try {

    await axios.post<Payment>(
      '/api/payments',
      { token: token.id, orderId },
      {
        withCredentials: true,
      }
    );
  } catch ( error ) {
    if ( error instanceof AxiosError ) {
      const errorMsgs = error.response?.data.errors.map( ( err: any ) => err.message );
      console.log( errorMsgs );
      return { errors: [ { message: errorMsgs } ], ticket: undefined };
    }

    return { errors: [ { message: 'Something went wrong. Please try again later.' } ], ticket: undefined };
  }
};
"use client";

import { User } from "@/common/types/auth/user";
import { ServerErrors } from "@/common/types/server-errors";
import axios, { AxiosError } from "axios";

type AuthResponseType = User | ServerErrors;

interface RequestReturnType {
  user?: User;
  errors?: ServerErrors;
}

export const SignupRequest = async ( email: string, password: string ): Promise<RequestReturnType> => {
  try {
    const res = await axios.post<AuthResponseType>(
      '/api/users/signup',
      { email, password },
      {
        withCredentials: true,
      }
    );

    if ( Array.isArray( res.data ) ) {
      return { errors: res.data, user: undefined };
    }

    return { errors: undefined, user: res.data };
  } catch ( error ) {
    if ( error instanceof AxiosError ) {
      const errorMsgs = error.response?.data.errors.map( ( err: any ) => err.message );
      return { errors: [ { message: errorMsgs } ], user: undefined };
    }

    return { errors: [ { message: 'Something went wrong. Please try again later.' } ], user: undefined };
  }
};
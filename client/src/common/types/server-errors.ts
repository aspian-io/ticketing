interface ServerError {
  message: string;
  field?: string;
}

export type ServerErrors = ServerError[];
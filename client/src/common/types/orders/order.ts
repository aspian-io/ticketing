export interface Order {
  id: string;
  userId: string;
  status: string;
  expiresAt: string;
  ticket: {
    title: string;
    price: number;
    version: number;
    id: string;
  };
  version: number;
}

export enum OrderStatus {
  /**
   * When the order has been created, but the ticket it 
   * is trying to order has not been reserved.
   */
  Created = 'created',

  /**
   * The ticket the order is trying to reserve has already 
   * been reserved, or whe the user has cancelled the order.
   * The order expires the payment.
   */
  Cancelled = 'cancelled',

  /**
   * The order has successfully reserved the ticket
   */
  AwaitingPayment = 'awaiting:payment',

  /**
   * The order has reserved the ticket and the user 
   * had provided payment successfully
   */
  Complete = 'complete'
}
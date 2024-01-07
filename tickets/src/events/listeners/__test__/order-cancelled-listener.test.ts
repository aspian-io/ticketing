import { Types } from "mongoose";
import { Ticket } from "../../../models/ticket";
import { natsWrapper } from "../../../nats-wrapper";
import { OrderCancelledListener } from "../order-cancelled-listener";
import { OrderCancelledEvent } from "@aspianet/ticketing-common-package";

const setup = async () => {
  const listener = new OrderCancelledListener( natsWrapper.client );

  const orderId = new Types.ObjectId().toHexString();
  const ticket = Ticket.build( {
    title: 'concert',
    price: 20,
    userId: new Types.ObjectId().toHexString(),
  } );
  ticket.set( { orderId } );
  await ticket.save();

  const data: OrderCancelledEvent[ 'data' ] = {
    id: new Types.ObjectId().toHexString(),
    version: 0,
    ticket: {
      id: ticket.id,
    }
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  };

  return { ticket, listener, data, msg, orderId };
};

it( 'updates the ticket, publishes an event, and acks the message', async () => {
  const { ticket, listener, data, msg, orderId } = await setup();
  await listener.onMessage( data, msg );

  const updatedTicket = await Ticket.findById( ticket.id );
  expect( updatedTicket!.orderId ).not.toBeDefined();
  expect( msg.ack ).toHaveBeenCalled();
  expect( natsWrapper.client.publish ).toHaveBeenCalled();
} );
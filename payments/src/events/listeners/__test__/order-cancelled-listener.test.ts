import { OrderCancelledEvent, OrderStatus } from "@aspianet/ticketing-common-package";
import { natsWrapper } from "../../../nats-wrapper";
import { OrderCancelledListener } from "../order-cancelled-listener";
import { Types } from "mongoose";
import { Order } from "../../../models/order";

const setup = async () => {
  const listener = new OrderCancelledListener( natsWrapper.client );
  const order = Order.build( {
    id: new Types.ObjectId().toHexString(),
    status: OrderStatus.Created,
    price: 10,
    userId: new Types.ObjectId().toHexString(),
    version: 0
  } );
  await order.save();

  const data: OrderCancelledEvent[ 'data' ] = {
    id: order.id,
    version: 1,
    ticket: {
      id: new Types.ObjectId().toHexString(),
    }
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  };

  return { listener, data, msg, order };
};

it( 'updates the status of the order', async () => {
  const { listener, data, msg, order } = await setup();
  await listener.onMessage( data, msg );

  const updateOrder = await Order.findById( order.id );

  expect( updateOrder!.status ).toEqual( OrderStatus.Cancelled );
} );

it( 'acks the message', async () => {
  const { listener, data, msg } = await setup();
  await listener.onMessage( data, msg );

  expect( msg.ack ).toHaveBeenCalled();
} );
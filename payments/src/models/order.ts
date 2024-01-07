import { OrderStatus } from "@aspianet/ticketing-common-package";
import { Document, Model, Schema, model } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface OrderAttrs {
  id: string;
  version: number;
  userId: string;
  price: number;
  status: OrderStatus;
}

interface OrderDoc extends Document {
  version: number;
  userId: string;
  price: number;
  status: OrderStatus;
}

interface OrderModel extends Model<OrderDoc> {
  build ( attrs: OrderAttrs ): OrderDoc;
  findByEvent ( event: { id: string, version: number; } ): Promise<OrderDoc | null>;
}

const orderSchema = new Schema( {
  userId: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    transform ( doc, ret ) {
      ret.id = ret._id;
      delete ret._id;
    }
  }
} );

orderSchema.statics.build = ( attrs: OrderAttrs ) => {
  return new Order( {
    _id: attrs.id,
    version: attrs.version,
    price: attrs.price,
    userId: attrs.userId,
    status: attrs.status
  } );
};

orderSchema.statics.findByEvent = ( event: { id: string, version: number; } ) => {
  return Order.findOne( {
    _id: event.id,
    version: event.version - 1
  } );
};

orderSchema.set( 'versionKey', 'version' );
orderSchema.plugin( updateIfCurrentPlugin );

const Order = model<OrderDoc, OrderModel>( 'Order', orderSchema );

export { Order };
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  validateRequest,
  NotAuthorizedError,
  requireAuth,
  NotFoundError,
  BadRequestError
} from '@aspianet/ticketing-common-package';
import { Ticket } from '../models/ticket';
import { TicketUpdatedPublisher } from '../events/publishers/ticket-updated-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

const validationSchema = [
  body( 'title' )
    .not()
    .isEmpty()
    .withMessage( 'Title is required' ),
  body( 'price' )
    .isFloat( { gt: 0 } )
    .withMessage( 'Price must be greater than 0' )
];

router.put( '/api/tickets/:id', requireAuth, validationSchema, validateRequest, async ( req: Request, res: Response ) => {
  const ticket = await Ticket.findById( req.params.id );
  if ( !ticket ) throw new NotFoundError();
  if ( ticket.orderId ) throw new BadRequestError( 'Cannot edit a reserved ticket' );
  if ( ticket.userId !== req.currentUser!.id ) {
    throw new NotAuthorizedError();
  }

  ticket.set( {
    title: req.body.title,
    price: req.body.price
  } );
  await ticket.save();
  await new TicketUpdatedPublisher( natsWrapper.client ).publish( {
    id: ticket.id,
    title: ticket.title,
    price: ticket.price,
    userId: ticket.userId,
    version: ticket.version
  } );

  res.send( ticket );
} );

export { router as updateTicketRouter };
import request from 'supertest';
import { app } from '../../app';
import { Types } from 'mongoose';
import { natsWrapper } from '../../nats-wrapper';
import { Ticket } from '../../models/ticket';

it( 'returns a 404 if the provided id does not exists', async () => {
  const id = new Types.ObjectId().toHexString();
  await request( app )
    .put( `/api/tickets/${ id }` )
    .set( 'Cookie', signin() )
    .send( {
      title: 'asfsadf',
      price: 20
    } )
    .expect( 404 );
} );

it( 'returns a 401 if the user is not authenticated', async () => {
  const id = new Types.ObjectId().toHexString();
  await request( app )
    .put( `/api/tickets/${ id }` )
    .send( {
      title: 'asfsadf',
      price: 20
    } )
    .expect( 401 );
} );

it( 'returns a 401 if the user does not own the ticket', async () => {
  const response = await request( app )
    .post( '/api/tickets' )
    .set( 'Cookie', signin() )
    .send( {
      title: 'test title',
      price: 20
    } );

  await request( app )
    .put( `/api/tickets/${ response.body.id }` )
    .set( 'Cookie', signin() )
    .send( {
      title: 'updated test title',
      price: 220
    } )
    .expect( 401 );
} );

it( 'returns a 400 if the user provides an invalid title or price', async () => {
  const cookie = signin();

  const response = await request( app )
    .post( '/api/tickets' )
    .set( 'Cookie', cookie )
    .send( {
      title: 'test title',
      price: 20
    } );

  await request( app )
    .put( `/api/tickets/${ response.body.id }` )
    .set( 'Cookie', cookie )
    .send( {
      title: '',
      price: 20
    } )
    .expect( 400 );

  await request( app )
    .put( `/api/tickets/${ response.body.id }` )
    .set( 'Cookie', cookie )
    .send( {
      title: 'test title',
      price: -10
    } )
    .expect( 400 );
} );

it( 'updates the ticket provided valid inputs', async () => {
  const cookie = signin();

  const response = await request( app )
    .post( '/api/tickets' )
    .set( 'Cookie', cookie )
    .send( {
      title: 'test title',
      price: 20
    } );

  await request( app )
    .put( `/api/tickets/${ response.body.id }` )
    .set( 'Cookie', cookie )
    .send( {
      title: 'updated test title',
      price: 100
    } )
    .expect( 200 );

  const ticketResponse = await request( app )
    .get( `/api/tickets/${ response.body.id }` )
    .send();

  expect( ticketResponse.body.title ).toEqual( 'updated test title' );
  expect( ticketResponse.body.price ).toEqual( 100 );

} );

it( 'publishes an event', async () => {
  const cookie = signin();

  const response = await request( app )
    .post( '/api/tickets' )
    .set( 'Cookie', cookie )
    .send( {
      title: 'test title',
      price: 20
    } );

  await request( app )
    .put( `/api/tickets/${ response.body.id }` )
    .set( 'Cookie', cookie )
    .send( {
      title: 'updated test title',
      price: 100
    } )
    .expect( 200 );

  expect( natsWrapper.client.publish ).toHaveBeenCalled();
} );

it( 'rejects updates if a ticket is reserved', async () => {
  const cookie = signin();

  const response = await request( app )
    .post( '/api/tickets' )
    .set( 'Cookie', cookie )
    .send( {
      title: 'test title',
      price: 20
    } );

  const ticket = await Ticket.findById( response.body.id );
  ticket!.set( { orderId: new Types.ObjectId().toHexString() } );
  await ticket!.save();

  await request( app )
    .put( `/api/tickets/${ response.body.id }` )
    .set( 'Cookie', cookie )
    .send( {
      title: 'updated test title',
      price: 100
    } )
    .expect( 400 );
} );
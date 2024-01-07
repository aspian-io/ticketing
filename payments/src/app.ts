import express from 'express';
import 'dotenv/config';
import { json } from 'body-parser';
import 'express-async-errors';
import cookieSession from 'cookie-session';
// Error Handler Importing
import { errorHandler, NotFoundError, currentUser } from '@aspianet/ticketing-common-package';
// Routes Importing
import { createChargeRouter } from './routes/new';

const app = express();
app.set( 'trust proxy', true );
app.use( json() );
app.use( cookieSession( {
  signed: false,
  secure: process.env.NODE_ENV !== 'test'
} ) );
app.use( currentUser );

// Routes
app.use( createChargeRouter );

// Error Handler Middleware
app.all( '*', async ( req, res ) => {
  throw new NotFoundError();
} );
app.use( errorHandler );

export { app };
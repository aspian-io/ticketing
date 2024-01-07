import express from 'express';
import { json } from 'body-parser';
import 'express-async-errors';
import cookieSession from 'cookie-session';
// Error Handler Importing
import { errorHandler, NotFoundError, currentUser } from '@aspianet/ticketing-common-package';
// Routes Importing
import { deleteOrderRouter } from './routes/delete';
import { indexOrderRouter } from './routes';
import { newOrderRouter } from './routes/new';
import { showOrderRouter } from './routes/show';

const app = express();
app.set( 'trust proxy', true );
app.use( json() );
app.use( cookieSession( {
  signed: false,
  secure: process.env.NODE_ENV !== 'test'
} ) );
app.use( currentUser );

// Routes
app.use( deleteOrderRouter );
app.use( indexOrderRouter );
app.use( newOrderRouter );
app.use( showOrderRouter );

// Error Handler Middleware
app.all( '*', async ( req, res ) => {
  throw new NotFoundError();
} );
app.use( errorHandler );

export { app };
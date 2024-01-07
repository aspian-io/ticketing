import express from 'express';
import { json } from 'body-parser';
import 'express-async-errors';
import cookieSession from 'cookie-session';
// Error Handler Importing
import { errorHandler, NotFoundError, currentUser } from '@aspianet/ticketing-common-package';
// Routes Importing
import { createTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/show';
import { indexTicketRouter } from './routes';
import { updateTicketRouter } from './routes/update';

const app = express();
app.set( 'trust proxy', true );
app.use( json() );
app.use( cookieSession( {
  signed: false,
  secure: process.env.NODE_ENV !== 'test'
} ) );
app.use( currentUser );

// Routes
app.use( createTicketRouter );
app.use( showTicketRouter );
app.use( indexTicketRouter );
app.use( updateTicketRouter );

// Error Handler Middleware
app.all( '*', async ( req, res ) => {
  throw new NotFoundError();
} );
app.use( errorHandler );

export { app };
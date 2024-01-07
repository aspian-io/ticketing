import express from 'express';
import { json } from 'body-parser';
import 'express-async-errors';
import cookieSession from 'cookie-session';
// Error Handler Importing
import { errorHandler, NotFoundError } from '@aspianet/ticketing-common-package';
// Routes Importing
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';

const app = express();
app.set( 'trust proxy', true );
app.use( json() );
app.use( cookieSession( {
  signed: false,
  secure: process.env.NODE_ENV !== 'test'
} ) );

// Routes
app.use( currentUserRouter );
app.use( signinRouter );
app.use( signoutRouter );
app.use( signupRouter );

// Error Handler Middleware
app.all( '*', async ( req, res ) => {
  throw new NotFoundError();
} );
app.use( errorHandler );

export { app };
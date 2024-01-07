import { app } from './app';
import mongoose from 'mongoose';

// Server Bootstrap 
const start = async () => {
  // Environment variables type guards
  if ( !process.env.JWT_KEY ) throw new Error( 'JWT_KEY must be defined' );
  if ( !process.env.MONGO_URI ) throw new Error( 'MONGO_URI must be defined' );

  // Mongoose connection to MongoDB
  try {
    await mongoose.connect( process.env.MONGO_URI );
    console.log( 'Connected to MongoDb!' );
  } catch ( error ) {
    console.log( error );
  }

  // Express server listening port
  app.listen( 3000, () => {
    console.log( 'Listening on port 3000!' );
  } );
};

start();
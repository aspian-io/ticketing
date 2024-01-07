import { OrderCreatedListener } from './events/listeners/order-created-listener';
import { natsWrapper } from './nats-wrapper';

// Server Bootstrap 
const start = async () => {
  // Environment variables type guards
  if ( !process.env.NATS_CLIENT_ID ) throw new Error( 'NATS_CLIENT_ID must be defined' );
  if ( !process.env.NATS_URL ) throw new Error( 'NATS_URL must be defined' );
  if ( !process.env.NATS_CLUSTER_ID ) throw new Error( 'NATS_CLUSTER_ID must be defined' );
  if ( !process.env.REDIS_HOST ) throw new Error( 'REDIS_HOST must be defined' );


  try {
    // Connecting to NATS
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    natsWrapper.client.on( 'close', () => {
      console.log( 'NATS connection closed!' );
      process.exit();
    } );
    process.on( 'SIGINT', () => natsWrapper.client.close() );
    process.on( 'SIGTERM', () => natsWrapper.client.close() );

    // Listening to incoming events
    new OrderCreatedListener( natsWrapper.client ).listen();

  } catch ( error ) {
    console.log( error );
  }
};

start();
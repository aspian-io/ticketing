import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { Types } from 'mongoose';
import jwt from 'jsonwebtoken';

declare global {
  var signin: ( id?: string ) => string[];
}

// Fake version of NATS wrapper
jest.mock( '../nats-wrapper.ts' );

let mongo: any;
beforeAll( async () => {
  // ENV Variables for Testing
  process.env.JWT_KEY = 'asdfasdf';

  // MongoDB Memory Server
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect( mongoUri );
} );

beforeEach( async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();
  for ( let collection of collections ) {
    await collection.deleteMany( {} );
  }
} );

afterAll( async () => {
  if ( mongo ) {
    await mongo.stop();
  }
  await mongoose.connection.close();
} );

global.signin = ( id?: string ) => {
  const payload = {
    id: id || new Types.ObjectId().toHexString(),
    email: 'test@test.com'
  };

  const token = jwt.sign( payload, process.env.JWT_KEY! );
  const session = { jwt: token };
  const sessionJSON = JSON.stringify( session );
  const base64 = Buffer.from( sessionJSON ).toString( 'base64' );

  return [ `session=${ base64 }` ];
};
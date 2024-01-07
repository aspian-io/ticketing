import { Schema, Model, model, Document } from 'mongoose';
import { Password } from '../services/password';

// Create new User interface
interface UserAttrs {
  email: string;
  password: string;
}

// User Model properties interface
interface UserModel extends Model<UserDoc> {
  build ( attrs: UserAttrs ): UserDoc;
}

// User Document properties interface
interface UserDoc extends Document {
  email: string;
  password: string;
}

const userSchema = new Schema( {
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    transform ( doc, ret ) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.password;
    },
    versionKey: false
  }
} );

userSchema.pre( 'save', async function ( done ) {
  if ( this.isModified( 'password' ) ) {
    const hashed = await Password.toHash( this.get( 'password' ) );
    this.set( 'password', hashed );
  }
  done();
} );

userSchema.statics.build = ( attrs: UserAttrs ) => {
  return new User( attrs );
};

const User = model<UserDoc, UserModel>( 'User', userSchema );

export { User };
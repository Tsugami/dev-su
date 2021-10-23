import { Schema, model, Document } from 'mongoose';

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  emailVerified: Date,
  image: String,
});

export interface IUser extends Document {
  name: string;
  email?: string;
  emailVerified?: Date;
  image?: string;
}

export default model<IUser>('User', UserSchema);

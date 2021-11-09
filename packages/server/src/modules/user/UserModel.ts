import { Schema, model, Document } from 'mongoose';

const UserSchema = new Schema({
  name: { type: String, required: true },
  github: { type: String, required: true, unique: true },
  avatar_url: String,
});

export interface IUser extends Document {
  name: string;
  github: string;
  avatar_url: string;
}

export default model<IUser>('User', UserSchema);

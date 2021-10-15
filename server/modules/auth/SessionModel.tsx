import { Schema, model, Document, Types } from 'mongoose';
import UserModel from '../user/UserModel';

const SessionSchema = new Schema({
  expires: { type: Number, required: true },
  sessionToken: { type: String, required: true, unique: true },
  userId: { type: Types.ObjectId, required: true, ref: UserModel },
});

export interface ISession extends Document {
  expires: number;
  sessionToken: string;
  userId: string;
}

export default model<ISession>('Session', SessionSchema);

import { Schema, model, Document } from 'mongoose';
import UserModel from '../user/UserModel';

const AccountSchema = new Schema({
  userId: { type: String, ref: UserModel, required: true },
  type: { type: String, required: true },
  provider: { type: String, required: true },
  providerAccountId: { type: String, required: true },
  refresh_token: { type: String },
  access_token: { type: String },
  expires_at: { type: Number },
  token_type: { type: String },
  scope: { type: String },
  id_token: { type: String },
  oauth_token_secret: { type: String },
  oauth_token: { type: String },
  session_state: { type: String },
});

export interface IAccount extends Document {
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  oauth_token_secret?: string;
  oauth_token?: string;
  session_state?: string;
}

export default model<IAccount>('Account', AccountSchema);

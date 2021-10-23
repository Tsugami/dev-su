import { Schema, model } from 'mongoose';

const VerificationTokenSchema = new Schema({
  token: { type: String, required: true, unique: true },
  expires: { type: Number, required: true },
  identifier: { type: String, required: true },
});

VerificationTokenSchema.index({ identifier: 1, token: 1 }, { unique: true });

interface IVerificationToken extends Document {
  token: string;
  expires: number;
  identifier: string;
}

export default model<IVerificationToken>('VerificationToken', VerificationTokenSchema);

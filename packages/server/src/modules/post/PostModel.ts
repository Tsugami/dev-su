import { Schema, model, Document } from 'mongoose';

const PostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  // userId: { type: Types.ObjectId, ref: UserModel },
});

export interface IPost extends Document {
  title: string;
  content: string;
  userId: string;
}

export default model<IPost>('Post', PostSchema);

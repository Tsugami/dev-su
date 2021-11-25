import {
  fromGlobalId as fromGlobalIdRelay,
  toGlobalId as toGlobalRelay,
  globalIdField,
} from 'graphql-relay';
import { Document } from 'mongoose';

export type GlobalIdType = 'User' | 'Post';

export const graphqlIdField = <D extends Document>(
  type: GlobalIdType,
  fetcherID = (doc: D) => doc._id,
) => {
  return globalIdField(type, fetcherID);
};

type FromGlobalIdResult = { type: GlobalIdType; id: string };
export const fromGlobalId = (globalId: string): FromGlobalIdResult => {
  return fromGlobalIdRelay(globalId) as FromGlobalIdResult;
};

export const toGlobalId = (type: GlobalIdType, id: string): string => {
  return toGlobalRelay(type, id);
};

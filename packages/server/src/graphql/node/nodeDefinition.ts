import { nodeDefinitions } from 'graphql-relay';
import PostModel from '../../modules/post/PostModel';
import { fromGlobalId, GlobalIdType } from '../../GlobalId';
import UserModel from '../../modules/user/UserModel';

export const { nodeInterface, nodeField, nodesField } = nodeDefinitions(
  async (globalId) => {
    const { type, id } = fromGlobalId(globalId);

    const fields = { id: 1 };

    if (type === 'User') {
      return await UserModel.findOne({ _id: id }, fields);
    }

    if (type === 'Post') {
      return await PostModel.findOne({ _id: id }, fields);
    }

    return null;
  },
  (obj): GlobalIdType | null => {
    if (obj instanceof UserModel) {
      return 'User';
    }

    if (obj instanceof PostModel) {
      return 'Post';
    }

    return null;
  },
);

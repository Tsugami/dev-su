import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';
import { GraphQLNonNull, GraphQLString } from 'graphql';
import { successField } from '@entria/graphql-mongo-helpers';

import PostModel from '../PostModel';
import { PostConnection } from '../PostType';

export default mutationWithClientMutationId({
  name: 'CreatePost',
  inputFields: {
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ title, content }) => {
    const post = await PostModel.create({ title, content });
    return { success: true, post };
  },
  outputFields: {
    postEdge: {
      type: PostConnection.edgeType,
      resolve: ({ post }) => {
        return {
          cursor: toGlobalId('Post', post._id),
          node: post,
        };
      },
    },
    ...successField,
  },
});

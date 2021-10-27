import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { connectionDefinitions } from '@entria/graphql-mongo-helpers';

import UserType from '../user/UserType';
import { IPost } from './PostModel';

const PostType = new GraphQLObjectType<IPost>({
  name: 'Post',
  fields: () => ({
    id: globalIdField('Post'),
    _id: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (post) => post._id,
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (post) => post.title,
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (post) => post.content,
    },
    userId: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (post) => post.userId,
    },
    user: {
      type: new GraphQLNonNull(UserType),
      resolve: () => ({
        _id: '3249082038235',
        id: 'aa',
        name: 'Dan Abrahmov',
        image: 'https://bit.ly/dan-abramov',
      }),
    },
  }),
});

export const PostConnection = connectionDefinitions({
  name: 'Post',
  nodeType: PostType,
});

export default PostType;

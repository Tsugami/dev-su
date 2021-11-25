import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { graphqlIdField } from '../../GlobalId';
import { connectionDefinitions } from '@entria/graphql-mongo-helpers';

import UserType from '../user/UserType';
import { IPost } from './PostModel';

const PostType = new GraphQLObjectType<IPost>({
  name: 'Post',
  fields: () => ({
    id: graphqlIdField('Post'),
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
      resolve: () => `post.userId`,
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

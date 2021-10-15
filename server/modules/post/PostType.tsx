import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { connectionDefinitions, globalIdField } from 'graphql-relay';
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
  }),
});

export const PostConnection = connectionDefinitions({
  name: 'Post',
  nodeType: PostType,
});

export default PostType;

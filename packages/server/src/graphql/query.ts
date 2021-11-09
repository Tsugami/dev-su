import { GraphQLObjectType, GraphQLString } from 'graphql';
import { connectionArgs } from 'graphql-relay';
import PostLoader from '../modules/post/PostLoader';
import { PostConnection } from '../modules/post/PostType';

export default new GraphQLObjectType({
  name: 'Query',
  fields: {
    hello: {
      type: GraphQLString,
      resolve() {
        return 'world';
      },
    },
    posts: {
      args: connectionArgs,
      type: PostConnection.connectionType,
      resolve(_source, args, ctx) {
        return PostLoader.loadAll(ctx, args);
      },
    },
  },
});

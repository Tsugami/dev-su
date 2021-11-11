import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { connectionArgs } from 'graphql-relay';
import UserType from '../modules/user/UserType';
import PostLoader from '../modules/post/PostLoader';
import { PostConnection } from '../modules/post/PostType';
import { GraphQLContext } from './buildContext';
import UserLoader from '../modules/user/UserLoader';
import withAuth from '../modules/auth/helpers/withAuth';

export default new GraphQLObjectType<unknown, GraphQLContext>({
  name: 'Query',
  fields: {
    hello: {
      type: GraphQLString,
      resolve() {
        return 'world';
      },
    },
    me: {
      type: GraphQLNonNull(UserType),
      resolve: withAuth((_, _args, ctx) => UserLoader.load(ctx, ctx.userID as string)),
    },
    posts: {
      args: connectionArgs,
      type: PostConnection.connectionType,
      resolve: async (_source, args, ctx) => PostLoader.loadAll(ctx, args),
    },
  },
});

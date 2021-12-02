import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { connectionArgs } from 'graphql-relay';
import UserType from '../modules/user/UserType';
import PostLoader from '../modules/post/PostLoader';
import { PostConnection } from '../modules/post/PostType';
import { GraphQLContext } from './buildContext';
import withAuth from '../modules/auth/helpers/withAuth';
import { nodeField, nodesField } from './node/nodeDefinition';

export default new GraphQLObjectType<unknown, GraphQLContext>({
  name: 'Query',
  fields: {
    node: nodeField,
    nodes: nodesField,
    hello: {
      type: GraphQLString,
      resolve() {
        return 'world';
      },
    },
    me: {
      type: GraphQLNonNull(UserType),
      resolve: withAuth((_, _args, ctx) => ctx.dataloaders.UserLoader.load(ctx.userID!)),
    },
    posts: {
      args: connectionArgs,
      type: PostConnection.connectionType,
      resolve: async (_source, args, ctx) => PostLoader.loadAll(ctx, args),
    },
  },
});

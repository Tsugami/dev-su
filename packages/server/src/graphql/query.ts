import { GraphQLObjectType, GraphQLString } from "graphql";
import { connectionArgs, connectionFromArray } from "graphql-relay";
import { PostConnection } from "../modules/post/PostType";

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
      resolve(_source, args) {
        return connectionFromArray(
          Array.from({ length: 10 }, () => ({
            id: 'wd',
            _id: 'wd',
            title: 'title',
            content:
              'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque aut debitis odit ab nisi, voluptates quod optio iusto illum alias illo dolor dolorum voluptatum animi nobis earum corrupti excepturi fugit?              ',
            userId: 1,
          })),
          args,
        );
      },
    },
  },
})
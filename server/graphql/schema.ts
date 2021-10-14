import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
  } from 'graphql';
  
  export default new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields: {
        hello: {
          type: GraphQLString,
          resolve() {
            return 'world';
          },
        },
      },
    }),
  });
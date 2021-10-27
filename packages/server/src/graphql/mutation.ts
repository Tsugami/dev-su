import { GraphQLObjectType } from 'graphql';

import PostMutations from '../modules/post/mutations';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...PostMutations,
  }),
});

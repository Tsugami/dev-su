import { GraphQLObjectType } from 'graphql';

import PostMutations from '../modules/post/mutations';
import AuthMutations from '../modules/auth/mutations';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...PostMutations,
    ...AuthMutations,
  }),
});

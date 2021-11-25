import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { connectionDefinitions } from '@entria/graphql-mongo-helpers';
import { graphqlIdField } from '../../GlobalId';
import { IUser } from './UserModel';

const UserType = new GraphQLObjectType<IUser>({
  name: 'User',
  fields: () => ({
    id: graphqlIdField('User'),
    image: {
      type: GraphQLString,
      resolve: (user) => user.avatar_url,
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (user) => user.name,
    },
  }),
});

export const UserConnection = connectionDefinitions({
  name: 'User',
  nodeType: UserType,
});

export default UserType;

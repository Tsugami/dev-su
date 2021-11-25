import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { connectionDefinitions } from '@entria/graphql-mongo-helpers';
import { graphqlIdField } from '../../GlobalId';
import { IUser } from './UserModel';
import { nodeInterface } from '../../graphql/node/nodeDefinition';

const UserType: GraphQLObjectType<IUser> = new GraphQLObjectType<IUser>({
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
  interfaces: [nodeInterface],
});

export const UserConnection = connectionDefinitions({
  name: 'User',
  nodeType: UserType,
});

export default UserType;

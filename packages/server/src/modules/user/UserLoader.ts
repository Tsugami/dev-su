import { createLoader } from '@entria/graphql-mongo-helpers';
import UserModel from './UserModel';

const UserLoader = createLoader({
  model: UserModel,
  name: 'UserLoader',
});

export default UserLoader;

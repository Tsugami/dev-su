import type { IUser } from '../../user/UserModel';

import { mutationWithClientMutationId } from 'graphql-relay';
import { GraphQLNonNull, GraphQLString } from 'graphql';
import UserType from '../../user/UserType';
import GithubOAuth from '../oauth/GithubOAuth';
import UserModel from '../../user/UserModel';

import { generateToken } from '../AuthControl';

type Payload = {
  accessToken: string;
  user: IUser;
};

export default mutationWithClientMutationId({
  name: 'SignUpWithGithub',
  inputFields: {
    code: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ code }): Promise<Payload> => {
    console.log('SignUpWithGithub');
    const accessToken = await GithubOAuth.getToken(code);
    const githubProfile = await GithubOAuth.getProfile(accessToken);

    const user = await UserModel.findOne({ github: githubProfile.github });

    if (user) {
      const token = generateToken(user._id);

      return {
        accessToken: token,
        user,
      };
    } else {
      const newUser = await UserModel.create({
        name: githubProfile.name,
        github: githubProfile.github,
        avatar_url: githubProfile.avatar_url,
      });

      const token = generateToken(newUser._id);

      return {
        accessToken: token,
        user: newUser,
      };
    }
  },
  outputFields: {
    accessToken: {
      type: GraphQLNonNull(GraphQLString),
      resolve: ({ accessToken }: Payload) => accessToken,
    },
    Viewer: {
      type: GraphQLNonNull(UserType),
      resolve: ({ user }: Payload) => user,
    },
  },
});

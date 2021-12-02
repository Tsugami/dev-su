import type { AuthContextSignUpMutation } from './__generated__/AuthContextSignUpMutation.graphql';

import { createContext, ReactNode, useEffect, useState } from 'react';
import { graphql } from 'babel-plugin-relay/macro';
import axios from 'axios';
import { Spinner, Container } from '@chakra-ui/react';
import { useMutation } from 'react-relay';

import useQuery from '../../shared-hooks/useQuery';
import { getToken, setToken } from './AuthToken';

type AuthContextProps = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const authorizeURL = () => {
  const GITHUB_AUTHORIZATION_URL = 'https://github.com/login/oauth/authorize';

  const GITHUB_AUTHORIZATION_PARAMS = {
    scope: 'user',
    client_id: process.env.REACT_APP_GITHUB_CLIENT_ID,
    client_secret: process.env.REACT_APP_GITHUB_CLIENT_SECRET,
  };

  return axios.getUri({
    url: GITHUB_AUTHORIZATION_URL,
    params: {
      ...GITHUB_AUTHORIZATION_PARAMS,
    },
  });
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [commit, isLoading] = useMutation<AuthContextSignUpMutation>(SIGN_IN_WITH_GITHUB_MUTATION);
  // const [{}] = useQueryLoader(GET_VIEWER_QUERY);
  const query = useQuery();

  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsLoggedIn(true);
      // TODO: GET VIEWER
    } else {
      const githubCode = query.get('code');

      if (githubCode) {
        commit({
          variables: {
            input: {
              code: githubCode,
            },
          },
          onCompleted: (data) => {
            const accessToken = data.SignUpWithGithub?.accessToken;
            if (accessToken) setToken(accessToken);
          },
        });
        setIsLoggedIn(true);
      }
    }
  }, [query, commit]);

  const login = () => {
    window.location.href = authorizeURL();
  };

  const logout = () => {
    console.log('logout');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {isLoading ? (
        <Container>
          <Spinner />
        </Container>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

const SIGN_IN_WITH_GITHUB_MUTATION = graphql`
  mutation AuthContextSignUpMutation($input: SignUpWithGithubInput!) {
    SignUpWithGithub(input: $input) {
      accessToken
      Viewer {
        id
        name
        image
      }
    }
  }
`;

// const GET_VIEWER_QUERY = graphql`
//   query AuthContextGetViewerQuery {
//     Viewer {
//       id
//       name
//       image
//     }
//   }
// `;

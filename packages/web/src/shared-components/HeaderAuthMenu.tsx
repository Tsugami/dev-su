import {
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  MenuDivider,
} from '@chakra-ui/react';
import useAuth from '../modules/auth/useAuth';
import RelayEnvironment from '../relay/RelayEnvironment';
import NewPostModal from './NewPostModal';

import { graphql } from 'babel-plugin-relay/macro';
import { loadQuery, usePreloadedQuery } from 'react-relay';
import type { HeaderAuthMenuMeQuery } from './__generated__/HeaderAuthMenuMeQuery.graphql';

type Props = {
  connections?: string[];
};

const HeaderAuthMenuQuery = graphql`
  query HeaderAuthMenuMeQuery {
    me {
      id
      name
      image
    }
  }
`;

const preloadedQuery = loadQuery<HeaderAuthMenuMeQuery>(RelayEnvironment, HeaderAuthMenuQuery, {});

const HeaderAuthMenu = ({ connections = [] }: Props) => {
  const data = usePreloadedQuery<HeaderAuthMenuMeQuery>(HeaderAuthMenuQuery, preloadedQuery);

  const { isOpen, onClose, onOpen } = useDisclosure();
  const { logout } = useAuth();

  return (
    <>
      <Menu>
        <MenuButton>
          <Avatar src={data.me.image as string} name={data.me.name} />
        </MenuButton>
        <MenuList bg='teal.500'>
          <MenuItem _hover={{ bg: 'teal.300' }}>My Profile</MenuItem>
          <MenuItem _hover={{ bg: 'teal.300' }} onClick={onOpen}>
            New Post
          </MenuItem>
          <MenuDivider />
          <MenuItem _hover={{ bg: 'teal.300' }} onClick={logout}>
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
      <NewPostModal isOpen={isOpen} onClose={onClose} connections={connections} />
    </>
  );
};
export default HeaderAuthMenu;

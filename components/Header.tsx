import { Avatar, Button, Flex, Heading, MenuDivider, Box, useDisclosure } from '@chakra-ui/react';

import { useSession, signIn, signOut } from 'next-auth/react';
import NewPostModal from './NewPostModal';

import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';

const Header = (): JSX.Element => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { data: session, status } = useSession();

  return (
    <>
      <Flex
        as='header'
        align='center'
        justify='space-around'
        wrap='wrap'
        p={6}
        bg='teal.500'
        w='full'
        color='white'
        h='96px'
      >
        <Heading as='h1' size='lg'>
          Dev-Su
        </Heading>
        <Box>
          {status === 'loading' ? null : session ? (
            <Menu>
              <MenuButton>
                <Avatar name={session.user?.name as string} src={session.user?.image as string} />
              </MenuButton>
              <MenuList bg='teal.500'>
                <MenuItem _hover={{ bg: 'teal.300' }}>My Profile</MenuItem>
                <MenuItem onClick={() => onOpen()} _hover={{ bg: 'teal.300' }}>
                  New Post
                </MenuItem>
                <MenuDivider />
                <MenuItem _hover={{ bg: 'teal.300' }} onClick={() => signOut()}>
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Button onClick={() => signIn('github')} colorScheme='blue'>
              Login
            </Button>
          )}
        </Box>
      </Flex>
      <NewPostModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Header;

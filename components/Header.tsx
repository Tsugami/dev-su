import { Button } from '@chakra-ui/button';
import { Flex, Heading } from '@chakra-ui/layout';
import { Avatar } from '@chakra-ui/react';

import { useSession, signIn, signOut } from 'next-auth/react';

import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';

const Header = (): JSX.Element => {
  const { data: session, status } = useSession();

  return (
    <Flex
      as='nav'
      align='center'
      justify='space-around'
      wrap='wrap'
      p={6}
      bg='teal.500'
      w='100%'
      color='white'
    >
      <Heading as='h1' size='lg'>
        Dev-Su
      </Heading>
      {status === 'loading' ? null : session ? (
        <Menu>
          <MenuButton>
            <Avatar name={session.user?.name as string} src={session.user?.image as string} />
          </MenuButton>
          <MenuList bg='teal.500'>
            <MenuItem _hover={{ bg: 'teal.300' }}>My Profile</MenuItem>
            {/* <MenuDivider /> */}
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
    </Flex>
  );
};

export default Header;

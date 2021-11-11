import {
  Flex,
  Heading,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Center,
  MenuDivider,
  Button,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import useAuth from '../modules/auth/useAuth';
import NewPostModal from './NewPostModal';

type Props = {
  connections?: string[];
};

const Header = ({ connections = [] }: Props): JSX.Element => {
  const { isLoggedIn, logout, login } = useAuth();
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Flex
        as='header'
        align='center'
        justify='center'
        wrap='wrap'
        p={6}
        bg='teal.500'
        w='full'
        color='white'
        h='96px'
      >
        <Flex justify='space-between' align='center' maxW='2xl' w='full'>
          <Link to='/'>
            <Heading as='h1' size='lg' _hover={{ cursor: 'pointer' }}>
              Dev-Su
            </Heading>
          </Link>
          <Center>
            {isLoggedIn ? (
              <Menu>
                <MenuButton>
                  <Avatar />
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
            ) : (
              <Button colorScheme='blue' onClick={login}>
                Login
              </Button>
            )}
          </Center>
        </Flex>
      </Flex>
      <NewPostModal isOpen={isOpen} onClose={onClose} connections={connections} />
    </>
  );
};

export default Header;

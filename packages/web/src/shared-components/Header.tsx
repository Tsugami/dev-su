import { Flex, Heading, Center, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import useAuth from '../modules/auth/useAuth';
import ErrorBoundary from './ErrorBoundary';
import HeaderAuthMenu from './HeaderAuthMenu';

type Props = {
  connections?: string[];
};

const LoginButton = () => {
  const { login } = useAuth();

  return (
    <Button colorScheme='blue' onClick={login}>
      Login
    </Button>
  );
};

const Header = ({ connections = [] }: Props): JSX.Element => {
  const { isLoggedIn } = useAuth();

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
              <ErrorBoundary callback={<LoginButton />}>
                <HeaderAuthMenu connections={connections} />
              </ErrorBoundary>
            ) : (
              <LoginButton />
            )}
          </Center>
        </Flex>
      </Flex>
    </>
  );
};

export default Header;

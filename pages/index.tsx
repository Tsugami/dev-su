import { Flex } from '@chakra-ui/layout';
import Header from 'components/Header';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <Flex direction='column' alignItems='center' justifyContent='flex-start' height='100vh'>
      <Header />
    </Flex>
  );
};

export default Home;

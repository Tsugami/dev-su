import { Flex, VStack } from '@chakra-ui/layout';
import Header from '../components/Header';
import type { NextPage } from 'next';
import PostCard from '../components/PostCard';

const Home: NextPage = () => {
  return (
    <Flex direction='column' alignItems='center' justifyContent='flex-start'>
      <Header />
      <VStack p='6' spacing='6'>
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </VStack>
    </Flex>
  );
};

export default Home;

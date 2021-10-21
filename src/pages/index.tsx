import { Flex, VStack } from '@chakra-ui/layout';
import Header from '../components/Header';
import type { NextPage } from 'next';
import { PostCardSkeleton } from '../components/PostCard';
import { Suspense, lazy } from 'react';

const Home: NextPage = () => {
  return (
    <Flex direction='column' alignItems='center' justifyContent='flex-start'>
      <Header />
      <VStack p='6' spacing='6'>
        <Suspense fallback={<PostCardSkeleton />}>
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
        </Suspense>
      </VStack>
    </Flex>
  );
};

export default Home;

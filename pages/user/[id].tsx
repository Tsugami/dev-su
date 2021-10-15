import type { NextPage } from 'next';

import { Flex, VStack, HStack, Avatar, Heading } from '@chakra-ui/react';
import Header from 'components/Header';
import PostCard from 'components/PostCard';

const Home: NextPage = () => {
  return (
    <Flex direction='column' alignItems='center' justifyContent='flex-start'>
      <Header />
      <HStack pt='6'>
        <Avatar size='lg' name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
        <Heading fontSize='lg'>Dan Abrahmov</Heading>
      </HStack>
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

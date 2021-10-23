import { Flex, VStack, HStack, Avatar, Heading } from '@chakra-ui/react';

import Header from '../../shared-components/Header';
import PostCard from '../../shared-components/PostCard';

const UserPage = () => {
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

export default UserPage;

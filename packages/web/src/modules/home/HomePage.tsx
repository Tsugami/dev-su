import { Flex, VStack } from '@chakra-ui/layout';

import Header from '../../shared-components/Header';
import PostCard from '../../shared-components/PostCard';

const HomePage = () => {
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

export default HomePage;

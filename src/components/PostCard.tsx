import type { PostCard_post$key } from './__generated__/PostCard_post.graphql';

import {
  Box,
  Avatar,
  HStack,
  VStack,
  Heading,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { graphql, useFragment } from 'react-relay';

type Props = {
  post: PostCard_post$key;
};

const PostCard = ({ post }: Props): JSX.Element => {
  const data = useFragment(
    graphql`
      fragment PostCard_post on Post {
        title
        content
        user {
          name
          image
        }
      }
    `,
    post,
  );

  return (
    <Box maxW='md' borderWidth='1px' borderRadius='lg' p='6'>
      <HStack justifyContent='space-between'>
        <Heading as='h4' size='md' isTruncated>
          {data.title}
        </Heading>
        <Menu>
          <MenuButton>
            <EditIcon cursor='pointer' _hover={{ color: 'teal.500' }} />
          </MenuButton>
          <MenuList>
            <MenuItem>Edit</MenuItem>
            <MenuItem>Delete</MenuItem>
          </MenuList>
        </Menu>
      </HStack>

      <Text my='3'>{data.content}</Text>
      <HStack>
        <Avatar size='sm' name={data.user.name} src={data.user.image as string} />
        <Heading fontSize='sm'>{data.user.name}</Heading>
      </HStack>
    </Box>
  );
};

export const PostCardSkeleton = () => (
  <Box maxW='md' borderWidth='sm' borderRadius='lg' p='6' w='full' boxShadow='sm'>
    <VStack justifyContent='start' align='start'>
      <Skeleton maxW='xs'>username</Skeleton>
      <SkeletonText mt='4' noOfLines={4} spacing='4'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error rem esse quasi cumque labore
        magni veritatis odio soluta dicta harum ipsa ad, sapiente, reprehenderit accusamus eaque
        modi cupiditate dolore vel?
      </SkeletonText>
    </VStack>

    <HStack mt='6'>
      <SkeletonCircle size='5' />
      <Skeleton h='3'>username</Skeleton>
    </HStack>
  </Box>
);

export default PostCard;

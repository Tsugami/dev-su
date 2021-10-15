import { Box, Avatar, HStack, Heading, Text } from '@chakra-ui/react';

const PostCard = (): JSX.Element => (
  <Box maxW='md' borderWidth='1px' borderRadius='lg' p='6'>
    <Heading as='h4' size='md'>
      Title
    </Heading>
    <Text my='3'>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque aut debitis odit ab nisi,
      voluptates quod optio iusto illum alias illo dolor dolorum voluptatum animi nobis earum
      corrupti excepturi fugit?
    </Text>
    <HStack>
      <Avatar size='sm' name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
      <Heading fontSize='sm'>Dan Abrahmov</Heading>
    </HStack>
  </Box>
);

export default PostCard;

import {
  Box,
  Avatar,
  HStack,
  Heading,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';

const PostCard = (): JSX.Element => (
  <Box maxW='md' borderWidth='1px' borderRadius='lg' p='6'>
    <HStack justifyContent='space-between'>
      <Heading as='h4' size='md' isTruncated>
        Title
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

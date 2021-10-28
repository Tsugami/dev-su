/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { NewPostModalCreatePostMutation } from './__generated__/NewPostModalCreatePostMutation.graphql';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Textarea,
  Input,
  Button,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import { graphql } from 'babel-plugin-relay/macro';
import { useFormik } from 'formik';
import { useMutation } from 'react-relay';

type Props = {
  isOpen: boolean;
  onClose(): unknown;
  connections: string[];
};

const NewPostModal = ({ isOpen, onClose, connections }: Props) => {
  const toast = useToast();

  const [mutate, loading] = useMutation<NewPostModalCreatePostMutation>(
    graphql`
      mutation NewPostModalCreatePostMutation($input: CreatePostInput!, $connections: [ID!]!) {
        CreatePost(input: $input) {
          success
          postEdge @prependEdge(connections: $connections) {
            cursor
            node {
              title
              content
              user {
                name
                image
              }
            }
          }
        }
      }
    `,
  );

  const formik = useFormik({
    initialValues: { title: '', content: '' },
    onSubmit: (data) => {
      mutate({
        variables: { input: data, connections },
        onCompleted: () => {
          onClose();
          formik.resetForm();
        },
        onError: () => {
          toast({
            title: 'ERROR',
            description: 'sorry, but it was not possible to create a post',
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
        },
      });
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <form onSubmit={formik.handleSubmit}>
        <ModalContent>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input {...formik.getFieldProps('title')} placeholder='My best langs' isRequired />
              <FormErrorMessage>{formik.errors.title}</FormErrorMessage>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Content</FormLabel>
              <Textarea
                {...formik.getFieldProps('content')}
                placeholder='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit dolore'
                rows={10}
                isRequired
                size='sm'
              />
              <FormErrorMessage>{formik.errors.content}</FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} type='submit' isLoading={loading}>
              Save
            </Button>
            <Button onClick={onClose} isDisabled={loading}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default NewPostModal;

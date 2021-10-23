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
} from '@chakra-ui/react';

type Props = {
  isOpen: boolean;
  onClose(): unknown;
};

const NewPostModal = ({ isOpen, onClose }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Post</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input placeholder='My best langs' isRequired />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Content</FormLabel>
            <Textarea
              placeholder='
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit dolore, similique perspiciatis dolor doloremque a, magni porro nam possimus necessitatibus eius, repellat placeat sint dignissimos delectus aliquam voluptate saepe accusamus.
              '
              rows={10}
              isRequired
              size='sm'
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClose={onClose}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewPostModal;

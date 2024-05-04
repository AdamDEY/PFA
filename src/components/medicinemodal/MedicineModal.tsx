import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Flex,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";

interface MedicineModalProps {
  name: string;
  image: string;
  description: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

function MedicineModal(props: MedicineModalProps) {
  const { name, image, description, isOpen, onOpen, onClose } = props;

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{name}</ModalHeader>
          <ModalCloseButton />
          <Flex bg="white" justifyContent="center" alignItems="center">
            <img src={image} alt="doliprane" width="150" />
          </Flex>
          <ModalBody>
            <Text> {description}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Add to order</Button>
            <NumberInput size="md" maxW={24} defaultValue={0} min={0}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default MedicineModal;

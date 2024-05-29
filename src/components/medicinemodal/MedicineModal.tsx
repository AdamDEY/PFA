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
  price: number;
  reference: string;
  isOpen: boolean;
  onClose: () => void;
}

function MedicineModal(props: MedicineModalProps) {
  const { name, image, description, price, reference, isOpen, onClose } = props;

  return (
    <>
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

import {
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Flex,
  ModalBody,
  ModalFooter,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { useState } from "react";
import { useCart } from "../../context/CartContext";

interface MedicineModalProps {
  _id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  reference: string;
  __v: number;
  isOpen: boolean;
  onClose: () => void;
}

function MedicineModal(props: MedicineModalProps) {
  const {
    _id,
    name,
    image,
    description,
    price,
    reference,
    __v,
    isOpen,
    onClose,
  } = props;
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(0);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{name}</ModalHeader>
          <ModalCloseButton />
          <Flex bg="white" justifyContent="center" alignItems="center">
            <img src={image} alt={name} width="150" />
          </Flex>
          <ModalBody>
            <Text>{description}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              variant="ghost"
              onClick={() =>
                addToCart(
                  { _id, name, image, description, price, reference, __v },
                  quantity
                )
              }
            >
              Add to order
            </Button>
            <NumberInput
              size="md"
              maxW={24}
              defaultValue={1}
              min={1}
              value={quantity}
              onChange={(valueString) => setQuantity(parseInt(valueString))}
            >
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

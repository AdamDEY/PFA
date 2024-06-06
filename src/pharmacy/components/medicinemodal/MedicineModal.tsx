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
  Box,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useCart } from "../../context/CartContext";

interface MedicineModalProps {
  _id: string;
  name: string;
  imageUrl: any;
  description: string;
  price: number;
  reference: string;
  __v: number;
  isOpen: boolean;
  footer:boolean;
  onClose: () => void;
}

function MedicineModal(props: MedicineModalProps) {
  const {
    _id,
    name,
    imageUrl,
    description,
    price,
    reference,
    __v,
    isOpen,
    footer,
    onClose,
  } = props;
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(0);
  const toast = useToast(); // Initialize the toast hook

  const handleAddToCart = () => {
    addToCart(
      { _id, name, imageUrl, description, price, reference, __v },
      quantity
    );
    console.log("Added to cart:", {
      _id,
      name,
      imageUrl,
      description,
      price,
      reference,
      __v,
      quantity,
    });

    // Show toast notification
    toast({
      title: "Added to cart",
      description: `${name} has been added to your cart with quantity ${quantity}.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };
  

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{name}</ModalHeader>
          <ModalCloseButton />
          <Flex bg="white" justifyContent="center" alignItems="center">
            <img src={imageUrl} alt={name} width="100" />
          </Flex>
          <ModalBody>
            <Text>{description}</Text>
          </ModalBody>

          {footer ? (
         <ModalFooter>
         <Button colorScheme="green" mr={3} onClick={onClose}>
           Close
         </Button>
         <Button
           variant="ghost"
           onClick={handleAddToCart
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
      ) : (
        <Box mt={5}></Box>
      )}
         
        </ModalContent>
      </Modal>
    </>
  );
}

export default MedicineModal;

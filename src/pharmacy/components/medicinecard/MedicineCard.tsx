import {
  useDisclosure,
  Card,
  CardBody,
  Stack,
  Button,
  Divider,
  CardFooter,
  ButtonGroup,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Box,
  Text,
  useToast, // Import useToast from Chakra UI
} from "@chakra-ui/react";
import MedicineModal from "../medicinemodal/MedicineModal";
import { useCart } from "../../context/CartContext";
import { useState } from "react";

interface MedicineProps {
  _id: string;
  name: string;
  description: string;
  reference: string;
  price: number;
  __v: number;
  imageUrl: any;
  footer: boolean;
}

function MedicineCard(props: MedicineProps) {
  const { _id, name, description, reference, price, __v, imageUrl, footer } =
    props;
  const { isOpen, onOpen, onClose } = useDisclosure();
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
    <Card
      maxW="fit-content"
      bgColor="grey.800"
      maxH="fit-content"
      ml="6"
      mb="4"
    >
      <CardBody>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="150px"
          mb={4}
        >
          <img src={imageUrl} alt={name} width="150" />
        </Box>

        <Stack spacing="1">
          <Button onClick={onOpen} bg={"white"}>
            {name}
          </Button>
          {isOpen && (
            <>
              <MedicineModal {...props} isOpen={isOpen} onClose={onClose} />
            </>
          )}

          <Text>{description}</Text>
          <Text color="green.600" fontSize="2xl">
            {price} Dinars Tunisien
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      {footer ? (
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button
              variant="solid"
              colorScheme="green"
              onClick={handleAddToCart}
            >
              Add to cart
            </Button>
            <NumberInput
              size="md"
              maxW={24}
              min={0}
              value={quantity}
              onChange={(valueString) =>
                setQuantity(parseInt(valueString) || 0)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </ButtonGroup>
        </CardFooter>
      ) : (
        <></>
      )}
    </Card>
  );
}

export default MedicineCard;

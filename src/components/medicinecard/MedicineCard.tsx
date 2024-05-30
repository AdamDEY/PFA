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
} from "@chakra-ui/react";
import Doliprane from "../../assets/doliprane.png";
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
  image: string;
}

function MedicineCard(props: MedicineProps) {
  const { _id, name, description, reference, price, __v, image } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(0);

  return (
    <Card
      maxW="fit-content"
      bgColor="grey.800"
      maxH="fit-content"
      ml="6"
      mb="4"
    >
      <CardBody>
        <Box display="flex" alignItems="center" justifyContent="center">
          <img src={Doliprane} alt={name} width="150" />
        </Box>

        <Stack spacing="1">
          <Button onClick={onOpen}>{name}</Button>
          {isOpen && (
            <>
              <MedicineModal {...props} isOpen={isOpen} onClose={onClose} />
            </>
          )}

          <Text>{description}</Text>
          <Text color="green.600" fontSize="2xl">
            {price}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button
            variant="solid"
            colorScheme="green"
            onClick={() => {
              addToCart(
                { _id, name, image, description, price, reference, __v },
                quantity
              );
              console.log("Added to cart:", {
                _id,
                name,
                image,
                description,
                price,
                reference,
                __v,
                quantity,
              });
            }}
          >
            Add to cart
          </Button>
          <NumberInput
            size="md"
            maxW={24}
            min={0}
            value={quantity}
            onChange={(valueString) => setQuantity(parseInt(valueString) || 0)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}

export default MedicineCard;

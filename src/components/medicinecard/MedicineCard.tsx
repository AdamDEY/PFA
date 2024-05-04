import {
  Card,
  CardBody,
  Stack,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  Text,
  Box,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  useDisclosure,
} from "@chakra-ui/react";
import Doliprane from "../../assets/doliprane.png";
import MedicineModal from "../medicinemodal/MedicineModal";

function MedicineCard() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Card
      maxW="-moz-fit-content"
      bgColor="grey.800"
      maxH="-moz-fit-content"
      ml="0"
      mb="4"
    >
      <CardBody>
        <Box
          display="flex" // Use flexbox
          alignItems="center" // Center vertically
          justifyContent="center"
        >
          <img src={Doliprane} alt="doliprane" width="150 " />
        </Box>

        <Stack spacing="1">
          <Button onClick={onOpen}>Doliprane</Button>
          {isOpen && (
            <>
              <MedicineModal
                name={"doliptane"}
                image={Doliprane}
                description={"ssssz"}
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
              />
            </>
          )}

          <Text>Lorem ipsum dolor sit amet</Text>
          <Text color="green.600" fontSize="2xl">
            $450
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button variant="solid" colorScheme="green">
            Add to cart
          </Button>
          <NumberInput size="md" maxW={24} defaultValue={0} min={0}>
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

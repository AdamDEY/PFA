import {
  Box,
  Flex,
  Text,
  Grid,
  Divider,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export interface DistanceProps {
  distance: string;
  duration: string;}

export interface WarehouseCardProps{
  _id: string;
  name: string;
  city: string;
  adress: string;

}

function WarehouseCard(props: WarehouseCardProps) {
  const { _id, name, city, adress} =
    props;

  return (
    <Box
      w="30%"
      borderWidth="3px"
      borderRadius="lg"
      overflow="hidden"
      bg="gray.100"
      ml="6"
      mt="4"
    >
      <LinkBox>
        <LinkOverlay as={Link} to={`/warehouses/${_id}`}>
          <Flex justifyContent="center" pt="2" pb="2">
            <Text fontSize="32" fontWeight="bold">
              {name}
            </Text>
          </Flex>
        </LinkOverlay>
        <Flex justifyContent="space-between" pl="8" pr="8">
          <Grid justifyItems="flex-start">
            <Text fontWeight="bold"> Location </Text>
            <Text>{city} </Text>
          </Grid>
          <Grid justifyItems="flex-start">
            <Text fontWeight="bold"> Phone </Text>
            <Text> {adress}</Text>
          </Grid>
        </Flex>
        <Grid justifyItems="flex-start" pl="8">
          <Text fontWeight="bold"> Email </Text>
          <Text>{'Email'}</Text>
        </Grid>
        <Box pt="2" pb="2">
          <Divider />
        </Box>

        <Flex justifyContent="space-between" pb="2">
          <Box pl="8">
            <Text>{'Distance'} </Text>
          </Box>

          <Flex pr="8">
            <Box w="20px" h="20px" borderRadius="full" bg="green" mr="1" />
            <Text>{'Status'}</Text>
          </Flex>
        </Flex>
      </LinkBox>
    </Box>
  );
}

export default WarehouseCard;

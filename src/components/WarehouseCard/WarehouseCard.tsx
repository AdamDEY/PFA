import { Box, Flex, Text, Grid, Divider } from "@chakra-ui/react";

export interface WarehouseCardProps {
  Warehouse: string;
  Location: string;
  Phone: string;
  Email: string;
  Distance: string;
  Status: string;
}

function WarehouseCard(props: WarehouseCardProps) {
  const { Warehouse, Location, Phone, Email, Distance, Status } = props;

  return (
    <Box
      w="30%"
      borderWidth="3px"
      borderRadius="lg"
      overflow="hidden"
      bg="gray.100"
      ml="8"
      mt="4"
    >
      <Flex justifyContent="center" pt="2" pb="2">
        <Text fontSize="32" fontWeight="bold">
          {Warehouse}
        </Text>
      </Flex>
      <Flex justifyContent="space-between" pl="8" pr="8">
        <Grid justifyItems="flex-start">
          <Text fontWeight="bold"> Location </Text>
          <Text>{Location} </Text>
        </Grid>
        <Grid justifyItems="flex-start">
          <Text fontWeight="bold"> Phone </Text>
          <Text> {Phone}</Text>
        </Grid>
      </Flex>
      <Grid justifyItems="flex-start" pl="8">
        <Text fontWeight="bold"> Email </Text>
        <Text>{Email}</Text>
      </Grid>
      <Box pt="2" pb="2">
        <Divider />
      </Box>

      <Flex justifyContent="space-between" pb="2">
        <Box pl="8">
          <Text>{Distance} </Text>
        </Box>

        <Flex pr="8">
          <Box w="20px" h="20px" borderRadius="full" bg="green" mr="1" />
          <Text>{Status}</Text>
        </Flex>
      </Flex>
    </Box>
  );
}

export default WarehouseCard;

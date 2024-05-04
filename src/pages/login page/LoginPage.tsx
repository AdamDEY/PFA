import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";

export default function LoginPage() {
  return (
    <Flex
      minH={"100vh"}
      minW={"100vw"} // Change minH to 100vh to make sure it takes up the entire viewport height
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("green.50", "green.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={10} px={20}>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={10}
        >
          <Stack align={"center"} pb={10}>
            <Heading fontSize={"4xl"}>SIGN IN</Heading>
          </Stack>

          <Stack spacing={6}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" pl={12} pr={12} />
            </FormControl>
            <FormControl id="pharmacynumber">
              <FormLabel>Pharmacy Number</FormLabel>
              <Input type="number" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Confidential Code</FormLabel>
              <Input type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Button
                bg="green.400"
                color={"white"}
                _hover={{
                  bg: "green.500",
                  borderColor: "green.500",
                }}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

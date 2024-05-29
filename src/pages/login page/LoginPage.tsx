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
import { SyntheticEvent, useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        "http://localhost:3000/pharmacy/api/v1/auth/login",
        {
          mode: "cors",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );
      // const response = await axios.post("/api/auth/login", {
      //   email,
      //   password,
      // });
      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
      } else {
        console.error("Login failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
    setIsLoading(false);
  };

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
              <Input
                type="email"
                pl={3}
                pr={12}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl id="password">
              <FormLabel>Confidential Code</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Stack spacing={10}>
              <Button
                bg="green.400"
                color={"white"}
                _hover={{
                  bg: "green.500",
                  borderColor: "green.500",
                }}
                onClick={submit}
                isLoading={isLoading}
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

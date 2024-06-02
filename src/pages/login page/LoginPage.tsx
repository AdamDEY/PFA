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
  useToast,
  Text
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserStore } from "../../stores/user";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Define form schema
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { login } = useUserStore();
  const navigate = useNavigate();

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setLoading(true);

    try {
      await login(values);
      toast({
        title: "Success",
        description: "Logged in successfully!",
        status: "success",
        duration: 3000,
      });
      navigate('/home'); // Redirect to home page
    } catch (error: any) {
      console.error("Error logging in: ", error);

      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to log in. Please try again.",
        status: "error",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex
      minH={"100vh"}
      minW={"100vw"} // Ensure it takes up the entire viewport width
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
          <Stack spacing={6} as="form" onSubmit={handleSubmit(onSubmit)}>
            <FormControl id="email" isInvalid={!!errors.email}>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                pl={3}
                pr={12}
                {...register("email")}
              />
              {errors.email && <Text color="red.500">{errors.email.message}</Text>}
            </FormControl>
            <FormControl id="password" isInvalid={!!errors.password}>
              <FormLabel>Confidential Code</FormLabel>
              <Input
                type="password"
                {...register("password")}
              />
              {errors.password && <Text color="red.500">{errors.password.message}</Text>}
            </FormControl>
            <Stack spacing={10}>
              <Button
                bg="green.400"
                color={"white"}
                _hover={{
                  bg: "green.500",
                  borderColor: "green.500",
                }}
                type="submit"
                isLoading={loading}
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

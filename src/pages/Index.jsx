import React, { useState } from "react";
import { ChakraProvider, Box, Button, FormControl, FormLabel, Input, useToast, VStack, Heading, Text } from "@chakra-ui/react";
import { FaSignInAlt } from "react-icons/fa";
import { Image } from "@chakra-ui/react";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const handleLogin = async () => {
    // Implement login logic here using the /login endpoint
    const response = await fetch("https://backengine-apcm.fly.dev/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("accessToken", data.accessToken);
      toast({
        title: "Login Successful.",
        description: "You've logged in successfully!",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      // Redirect to dashboard page or change the state to show logged in status
    } else {
      const error = await response.json();
      toast({
        title: "An error occurred.",
        description: error.error,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  // TODO: Implement sign-up and dashboard functionality

  return (
    <ChakraProvider>
      <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg" margin="0 auto" mt={12}>
        <VStack spacing={4} align="flex-start">
          <Heading>Welcome to Interactive App</Heading>
          <Text>If you have an account, login to continue</Text>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <Button leftIcon={<FaSignInAlt />} colorScheme="teal" onClick={handleLogin}>
            Login
          </Button>
          <Image src="https://images.unsplash.com/photo-1489769002049-ccd828976a6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxsb2dpbiUyMGlsbHVzdHJhdGlvbnxlbnwwfHx8fDE3MDkyMDExNTd8MA&ixlib=rb-4.0.3&q=80&w=1080" alt="Login Illustration" />
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default Index;

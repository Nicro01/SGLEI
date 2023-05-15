import {
  Button,
  Box,
  Center,
  FormControl,
  Input,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import React, { useState } from "react";
import CadastroEquipamentos from "../AppEquipamentos";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoggedIn(true);
  };

  if (isLoggedIn) {
    return <CadastroEquipamentos />;
  }

  return (
    <Center>
      <Box bg="#F2F4F8" boxShadow="lg" p={10} borderRadius="md" marginTop={40}>
        <form onSubmit={handleSubmit}>
          <Center>
            <FormControl>
              <FormLabel userSelect={"none"}>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                bg="#F2F4F8"
                color="#3C415C"
                border="none"
                boxShadow="md"
                _hover={{
                  border: "none",
                  boxShadow: "lg",
                }}
              />
              <FormLabel marginTop={6} userSelect={"none"}>
                Senha
              </FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                bg="#F2F4F8"
                color="#3C415C"
                border="none"
                boxShadow="md"
                _hover={{
                  border: "none",
                  boxShadow: "lg",
                }}
              />
              <FormHelperText userSelect={"none"}>
                Nunca vamos compartilhar seu e-mail.
              </FormHelperText>
              <Button
                marginTop={5}
                type="submit"
                bg="#3C415C"
                color="#F2F4F8"
                borderRadius="md"
                _hover={{
                  bg: "#4E5576",
                }}
              >
                ENTRAR
              </Button>
            </FormControl>
          </Center>
        </form>
      </Box>
    </Center>
  );
}

export default LoginPage;

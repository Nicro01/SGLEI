import React from "react";
import ReactDOM from "react-dom/client";
import Cadastro from "./App.jsx";
import CadastroEquipamentos from "./AppEquipamentos.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import LoginPage from "./components/LoginPage.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <LoginPage />
    </ChakraProvider>
  </React.StrictMode>
);

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import CadastroEquipamentos from "../AppEquipamentos";

const ModalDelete = ({
  equipmentName,
  data,
  setData,
  isOpen,
  onClose,
  handleRemove,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>
          <h2>Deseja mesmo excluir?</h2>
        </ModalHeader>
        <ModalFooter justifyContent="start">
          <Button
            colorScheme="green"
            mr={3}
            onClick={() => {
              CadastroEquipamentos.handleRemove(dataEdit.equipmentName);
            }}
          >
            EXCLUIR
          </Button>
          <Button colorScheme="red" onClick={onClose}>
            CANCELAR
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalDelete;

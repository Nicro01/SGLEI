import { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Box,
} from "@chakra-ui/react";

const ModalEquipamentos = ({ data, setData, dataEdit, isOpen, onClose }) => {
  const [equipmentName, setEquipmentName] = useState(
    dataEdit.equipmentName || ""
  );
  const [supplierName, setSupplierName] = useState(dataEdit.supplierName || "");
  const [hiddenSuppliers, setHiddenSuppliers] = useState([]);
  const [expenseType, setExpenseType] = useState(dataEdit.expenseType || "");
  const [newSupplierName, setNewSupplierName] = useState("");
  const [newExpenseType, setNewExpenseType] = useState("");
  const [showNewSupplierInput, setShowNewSupplierInput] = useState(false);
  const [showNewExpenseTypeInput, setShowNewExpenseTypeInput] = useState(false);

  useEffect(() => {
    const uniqueSuppliers = [...new Set(data.map((item) => item.supplierName))];
    const uniqueExpenseTypes = [
      ...new Set(data.map((item) => item.expenseType)),
    ];

    setSupplierName(supplierName || uniqueSuppliers[0] || "");
    setExpenseType(expenseType || uniqueExpenseTypes[0] || "");
  }, [data, supplierName, expenseType]);

  const handleSave = () => {
    if (!equipmentName || !supplierName || !expenseType) return;

    const existingEquipmentIndex = data.findIndex(
      (item) =>
        item.equipmentName === equipmentName &&
        item.supplierName === supplierName
    );

    if (existingEquipmentIndex !== -1) {
      if (
        window.confirm("Deseja adicionar a quantidade ao estoque existente?")
      ) {
        data[existingEquipmentIndex].quantity += 1;
      }
    } else {
      if (Object.keys(dataEdit).length) {
        data[dataEdit.index] = {
          equipmentName,
          supplierName,
          expenseType,
        };
      }

      const newDataArray = !Object.keys(dataEdit).length
        ? [
            ...(data ? data : []),
            { equipmentName, supplierName, expenseType },
            ...hiddenSuppliers,
          ]
        : [...(data ? data : [])];

      localStorage.setItem("cad_equipamento", JSON.stringify(newDataArray));

      setData(newDataArray);
      setHiddenSuppliers([]);
    }

    onClose();
  };

  const handleAddNewSupplier = () => {
    setSupplierName(newSupplierName);
    setShowNewSupplierInput(false);
    setNewSupplierName("");
  };

  const handleAddNewExpenseType = () => {
    if (!newExpenseType) return;

    setExpenseType(newExpenseType);
    setNewExpenseType("");
    setShowNewExpenseTypeInput(false);
    setExpenseType(newExpenseType);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {Object.keys(dataEdit).length ? "Editar" : "Cadastrar"} Equipamento
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={3}>
            <FormLabel>Nome do Equipamento</FormLabel>
            <Input
              placeholder="Digite o nome do equipamento"
              value={equipmentName}
              onChange={(e) => setEquipmentName(e.target.value)}
            />
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>Fornecedor</FormLabel>
            <Box>
              <Select
                value={supplierName}
                onChange={(e) => setSupplierName(e.target.value)}
                mr={3}
              >
                {data && data.length > 0 ? (
                  data.map((item) => (
                    <option
                      key={item.equipmentName + item.supplierName}
                      value={item.supplierName}
                    >
                      {item.supplierName}
                    </option>
                  ))
                ) : (
                  <option value="">Nenhum fornecedor encontrado</option>
                )}
              </Select>
              {!showNewSupplierInput ? (
                <Button size="sm" onClick={() => setShowNewSupplierInput(true)}>
                  Adicionar Novo
                </Button>
              ) : (
                <Box display="flex" alignItems="center">
                  <Input
                    placeholder="Digite o nome do novo fornecedor"
                    value={newSupplierName}
                    onChange={(e) => setNewSupplierName(e.target.value)}
                    mr={3}
                  />
                  <Button size="sm" onClick={handleAddNewSupplier}>
                    Salvar
                  </Button>
                  <Button
                    size="sm"
                    ml={3}
                    onClick={() => setShowNewSupplierInput(false)}
                  >
                    Cancelar
                  </Button>
                </Box>
              )}
            </Box>
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>Tipo de Despesa</FormLabel>
            <Box>
              <Select
                value={expenseType}
                onChange={(e) => setExpenseType(e.target.value)}
                mr={3}
              >
                {data && data.length > 0 ? (
                  data.map((item) => (
                    <option key={item.expenseType} value={item.expenseType}>
                      {item.expenseType}
                    </option>
                  ))
                ) : (
                  <option value="">Nenhum tipo de despesa encontrado</option>
                )}
              </Select>
              {!showNewExpenseTypeInput ? (
                <Button
                  size="sm"
                  onClick={() => setShowNewExpenseTypeInput(true)}
                >
                  Adicionar Novo
                </Button>
              ) : (
                <Box display="flex" alignItems="center">
                  <Input
                    placeholder="Digite o nome do novo tipo de despesa"
                    value={newExpenseType}
                    onChange={(e) => setNewExpenseType(e.target.value)}
                    mr={3}
                  />
                  <Button size="sm" onClick={handleAddNewExpenseType}>
                    Salvar
                  </Button>
                  <Button
                    size="sm"
                    ml={3}
                    onClick={() => setShowNewExpenseTypeInput(false)}
                  >
                    Cancelar
                  </Button>
                </Box>
              )}
            </Box>
          </FormControl>
          <Button
            colorScheme="blue"
            onClick={handleSave}
            disabled={!equipmentName || !supplierName || !expenseType}
            mr={3}
          >
            Salvar
          </Button>
          <Button onClick={onClose}>Cancelar</Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalEquipamentos;

import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

import {
  Box,
  Flex,
  Button,
  useDisclosure,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useBreakpointValue,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { Modal, Tab } from "bootstrap";
import ModalEquipamentos from "./components/ModalEquipamentos";
import ModalDelete from "./components/ModalDelete";

const CadastroEquipamentos = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [dataEdit, setDataEdit] = useState({});
  const [equipmentToDelete, setEquipmentToDelete] = useState([]);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });

  useEffect(() => {
    const db_equipment = localStorage.getItem("cad_equipamento")
      ? JSON.parse(localStorage.getItem("cad_equipamento"))
      : [];

    setData(db_equipment);
  }, [setData]);

  const handleRemove = (equipmentName) => {
    const newArray = data.filter(
      (item) => item.equipmentName !== equipmentName
    );
    setData(newArray);
    localStorage.setItem("cad_equipamento", JSON.stringify(newArray));
    onClose();
  };

  const NeomorphismButton = ({ onClick, children, ...rest }) => {
    return (
      <Button
        color={"gray.600"}
        bg="gray.50"
        boxShadow="5px 5px 10px #a3b1c6, -5px -5px 10px #fff"
        borderRadius="xl"
        _hover={{
          bg: "gray.100",
          boxShadow: "inset 3px 3px 6px #c0d3eb, inset -3px -3px 6px #fff",
        }}
        onClick={onClick}
        {...rest}
      >
        {children}
      </Button>
    );
  };

  return (
    <Flex
      h="90vh"
      margin={10}
      marginLeft={"auto"}
      marginRight={"auto"}
      width={1500}
      align="center"
      justify="center"
      fontSize="20px"
      fontFamily="poppins"
      bg="#F2F4F8"
      boxShadow="lg"
      p={10}
      borderRadius="md"
    >
      <Box maxW={800} width={500} h="90vh" py={20} px={2}>
        <NeomorphismButton
          colorScheme="blue"
          onClick={() => [setDataEdit({}), onOpen()]}
        >
          NOVO CADASTRO
        </NeomorphismButton>
      </Box>
      <Box overflowY="auto" height="100%">
        <Table mt="6" w={900}>
          <Thead>
            <Tr userSelect={"none"}>
              <Th maxW={isMobile ? 5 : 400} fontSize="20px">
                Nome do Equipamento
              </Th>
              <Th maxW={isMobile ? 5 : 400} fontSize="20px">
                Nome do Fornecedor
              </Th>
              <Th maxW={isMobile ? 5 : 400} fontSize="20px">
                Tipo de Despesa
              </Th>
              <Th maxW={isMobile ? 5 : 400} fontSize="20px">
                Estoque
              </Th>

              <Th p={0}></Th>
              <Th p={0}></Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map(({ equipmentName, supplierName, expenseType }, index) => (
              <Tr key={index} cursor="pointer" _hover={{ bg: "gray.100" }}>
                <Td maxW={isMobile ? 5 : 100}>{equipmentName}</Td>
                <Td maxW={isMobile ? 5 : 100}>{supplierName}</Td>
                <Td maxW={isMobile ? 5 : 100}>{expenseType}</Td>
                <Td maxW={isMobile ? 5 : 100}>{}</Td>
                <Td p={0}>
                  <EditIcon
                    fontSize={20}
                    onClick={() => [
                      setDataEdit({
                        equipmentName,
                        supplierName,
                        expenseType,
                        index,
                      }),
                      onOpen(),
                    ]}
                  />
                </Td>
                <Td p={0}>
                  <DeleteIcon
                    fontSize={20}
                    onClick={() => {
                      setEquipmentToDelete({
                        equipmentName,
                        supplierName,
                        expenseType,
                        index,
                      });
                      setDeleteModalOpen(true);
                    }}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {isOpen && (
        <ModalEquipamentos
          isOpen={isOpen}
          onClose={onClose}
          data={data}
          setData={setData}
          dataEdit={dataEdit}
          setDataEdit={setDataEdit}
        />
      )}

      {isDeleteModalOpen && (
        <ModalDelete
          equipmentName={dataEdit.equipmentName}
          data={data}
          setData={setData}
          isOpen={isDeleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          handleRemove={handleRemove}
        />
      )}
    </Flex>
  );
};

export default CadastroEquipamentos;

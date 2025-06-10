import React, { useState } from 'react';
import { Container, Flex, VStack, Button } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from "./Header";
import ClientSelect from "../ClientSelect";
import Sidebar from "../Sidebar";

interface LayoutProps {
  children: React.ReactNode;
  onOpenSettings?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onOpenSettings }) => {
  const { clienteId } = useParams<{ clienteId: string }>();
  const navigate = useNavigate();
  const [isClientSelected, setIsClientSelected] = useState(!!clienteId);

  const handleNewClient = () => {
    console.log('Cadastrar novo cliente');
  };

  const handleContinue = () => {
    if (clienteId) {
      setIsClientSelected(true);
    }
  };

  return (
    <Flex minH="100vh" bg="gray.50" direction="column">
      <Header onOpenSettings={onOpenSettings} />
      <Container maxW="7xl" py={8}>
        {isClientSelected ? (
          <Flex direction="row">
            <Sidebar />
            <main style={{ flex: 1, padding: '20px' }}>
              {children}
            </main>
          </Flex>
        ) : (
          <VStack spacing={4} justify="center" align="center" height="100vh">
            <ClientSelect />
            <Button onClick={handleNewClient} colorScheme="blue">
              Cadastrar Novo Cliente
            </Button>
            <Button onClick={handleContinue} colorScheme="green">
              Continuar
            </Button>
          </VStack>
        )}
      </Container>
    </Flex>
  );
};

export default Layout;
